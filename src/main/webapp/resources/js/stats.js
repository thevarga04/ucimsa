import {
  aDiv,
  aForm,
  anUrl,
  appendContainerUI,
  appendix,
  csrfHeader,
  csrfToken,
  getCsrfToken,
  getParamNumberValueFromUrl,
  headerAboveContainerUI,
  logResponseAndStatus,
  params,
  paths,
  prettyDate,
  prettyDateTime,
  prettyTime,
  theTitle
} from "./common.js";

let containerUI = aDiv("container");
let card = aDiv("card mt-3");
let form = aForm("form");
let cardBody = aDiv("card-body");

let lessonId;
let textId;

let dtoLesson = {
  heapText: {
    id: 0,
    textname: "",
    numberOfSentences: 0,
  },
  options: {
    lessonId: 0,
    coverage: 0,
    splits: 0,
    matching: 0,
    sections: 0,
  },
  hitSplitSentences: [
    {
      textId: 0,
      lessonId: 0,
      sentence: "",
      good: false,
      timestamp: 0,
    }
  ]
}
let dtoText = [dtoLesson];

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  headerAboveContainerUI();
  appendContainerUI(containerUI);
  getStatsAndGenerateUI();
  appendix(cardBody, form, card, containerUI);
});

function getStatsAndGenerateUI() {
  lessonId = getParamNumberValueFromUrl(params.LESSON_ID);
  if (lessonId) {
    displayStatsForLesson();
    return;
  }

  textId = getParamNumberValueFromUrl(params.TEXT_ID);
  if (textId) {
    displayStatsForText();
    return;
  }

  displayTextsAndLessonsReport();
}

function displayStatsForLesson() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", paths.apiStatsLessons + lessonId);
  xhttp.setRequestHeader(csrfHeader, csrfToken);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        if (this.responseText) {
          dtoLesson = JSON.parse(this.responseText);
          generateLessonStatsUI();
        } else {
          cardBody.append("This lesson has any record.");
        }
      } else {
        logResponseAndStatus(this.responseText, this.status);
      }
    }
  }
}

function generateLessonStatsUI() {
  theTitle(cardBody, dtoLesson.heapText.textname);
  optionsRow();
  lessonDetails();
}

function optionsRow() {
  let aCard = aDiv("d-flex card shadow border-left-heap");
  let aCardBody = aDiv("row card-body-list justify-content-between");

  let colCoverage = aDiv("col-auto");
  colCoverage.append("Coverage: " + dtoLesson.options.coverage / 10 + " %");

  let colDate = aDiv("col-auto");
  colDate.append("Date: " + prettyDate(dtoLesson.hitSplitSentences[0].timestamp));

  let colSplits = aDiv("col-auto");
  colSplits.append("Splits (rows): " + dtoLesson.options.splits);

  let colSections = aDiv("col-auto");
  colSections.append("Sections (columns): " + dtoLesson.options.sections);

  let colHits = aDiv("col-auto fw-bold");
  colHits.append("Hits: " + dtoLesson.hitSplitSentences.length);

  let wrongOnes = wrongHits(dtoLesson);
  let wrongHitsClass = `col-auto fw-bold ${wrongOnes > 0 ? "text-danger" : "text-success"}`;
  let colWrongHits = aDiv(wrongHitsClass);
  colWrongHits.append("Mistakes: " + wrongOnes);

  aCardBody.append(colCoverage, colDate, colSplits, colSections, colHits, colWrongHits);
  aCard.append(aCardBody);
  cardBody.append(aCard);
}

function wrongHits(lesson) {
  let wrongHits = 0;
  for (let hit of lesson.hitSplitSentences) {
    if (!hit.good) {
      wrongHits++;
    }
  }
  return wrongHits;
}

function lessonDetails() {
  let aCard = aDiv("d-flex card shadow");
  let aCardBody = aDiv("card-body");

  for (let hit of dtoLesson.hitSplitSentences) {
    let aRow = aDiv("row justify-content-start");

    let colPick = aDiv("col-1 fw-bold text-" + (hit.good ? "success" : "danger"));
    colPick.append(hit.good ? "Good" : "Wrong");

    let colTime = aDiv("col-1");
    colTime.append(prettyTime(hit.timestamp));

    let colSentence = aDiv("col-auto");
    colSentence.append(hit.sentence);

    aRow.append(colPick, colTime, colSentence);
    aCardBody.append(aRow);
  }
  aCard.append(aCardBody);
  cardBody.append(aCard);
}


function displayStatsForText() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", paths.apiStatsTexts + textId);
  xhttp.setRequestHeader(csrfHeader, csrfToken);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        if (this.responseText) {
          dtoText = JSON.parse(this.responseText);
          generateTextStatsUI();
        } else {
          cardBody.append("This text has any record.");
        }
      } else {
        logResponseAndStatus(this.responseText, this.status);
      }
    }
  }

}

function generateTextStatsUI() {
  theTitle(cardBody, dtoText[0].heapText.textname);
  for (let lesson of dtoText) {
    lessonRow(lesson);
  }
}

function lessonRow(lesson) {
  let aCard = aDiv("card shadow border-left-heap my-2");
  let aCardBody = aDiv("card-body-list row justify-content-start");

  let colDateTime = aDiv("col-2");
  colDateTime.append("Date: " + prettyDateTime(lesson.hitSplitSentences[0].timestamp));

  let colCoverage = aDiv("col-2");
  colCoverage.append("Coverage (lines): " + Math.round(lesson.heapText.numberOfSentences * lesson.options.coverage / 1000));

  let colSplits = aDiv("col-2");
  colSplits.append("Splits: " + lesson.options.splits);

  let colSections = aDiv("col-2");
  colSections.append("Sections: " + lesson.options.sections);

  let colHits = aDiv("col-2 fw-bold");
  colHits.append("Hits: " + lesson.hitSplitSentences.length);

  let wrongOnes = wrongHits(lesson);
  let wrongHitsClass = `col-auto fw-bold ${wrongOnes > 0 ? "text-danger" : "text-success"}`;
  let colWrongHits = aDiv(wrongHitsClass);
  colWrongHits.append("Mistakes: " + wrongOnes);

  let searchOptions = new Map();
  searchOptions.set(params.LESSON_ID, lesson.options.lessonId);
  let url = anUrl(paths.statsUrl, searchOptions);

  let lessonStats = document.createElement("a");
  lessonStats.setAttribute("class", "stretched-link");
  lessonStats.href = url;

  aCardBody.append(colDateTime, colCoverage, colSplits, colSections, colHits, colWrongHits, lessonStats);
  aCard.append(aCardBody);
  cardBody.append(aCard);
}


function displayTextsAndLessonsReport() {

}
