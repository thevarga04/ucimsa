import {
  aDiv,
  aForm,
  appendContainerUI,
  appendix,
  csrfHeader,
  csrfToken,
  generateHeaderBeforeContainerUI,
  getCsrfToken,
  getParamNumberValueFromUrl,
  logResponseAndStatus,
  params,
  paths,
  prettyDate,
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
    sentences: [
      {
        id: 0,
        line: ""
      }
    ]
  },
  options: {
    coverage: 0,
    splits: 0,
    matching: 0,
    sections: 0
  },
  hitSplitSentences: [
    {
      textId: 0,
      lessonId: 0,
      sentenceId: 0,
      goodPick: false,
      timestamp: 0
    }
  ]
}

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  generateHeaderBeforeContainerUI();
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
        dtoLesson = JSON.parse(this.responseText);
        generateLessonStatsUI();
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
  colCoverage.append("Coverage: " + dtoLesson.options.coverage + " %");

  let colDate = aDiv("col-auto");
  colDate.append("Date: " + prettyDate(dtoLesson.hitSplitSentences[0].timestamp));

  let colSplits = aDiv("col-auto");
  colSplits.append("Splits (rows): " + dtoLesson.options.splits);

  let colSections = aDiv("col-auto");
  colSections.append("Sections (columns): " + dtoLesson.options.sections);

  let colHits = aDiv("col-auto fw-bold");
  colHits.append("Hits: " + dtoLesson.hitSplitSentences.length);

  let wrongOnes = wrongHits();
  let wrongHitsClass = `col-auto fw-bold ${wrongOnes > 0 ? "text-danger" : "text-success"}`;
  let colWrongHits = aDiv(wrongHitsClass);
  colWrongHits.append("Failures: " + wrongOnes);

  aCardBody.append(colCoverage, colDate, colSplits, colSections, colHits, colWrongHits);
  aCard.append(aCardBody);
  cardBody.append(aCard);
}

function wrongHits() {
  let wrongHits = 0;
  for (let hit of dtoLesson.hitSplitSentences) {
    if (!hit.goodPick) {
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

    let colPick = aDiv("col-1 fw-bold text-" + (hit.goodPick ? "success" : "danger"));
    colPick.append(hit.goodPick ? "Good" : "Wrong");

    let colTime = aDiv("col-1");
    colTime.append(prettyTime(hit.timestamp));

    let colSentence = aDiv("col-auto");
    colSentence.append(getSentenceLineById(hit.sentenceId));

    aRow.append(colPick, colTime, colSentence);
    aCardBody.append(aRow);
  }
  aCard.append(aCardBody);
  cardBody.append(aCard);
}

function getSentenceLineById(id) {
  for (let sentence of dtoLesson.heapText.sentences) {
    if (sentence.id === id) {
      return sentence.line;
    }
  }
}




function displayStatsForText() {

}


function displayTextsAndLessonsReport() {

}
