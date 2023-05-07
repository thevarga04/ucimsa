import {
  aDiv,
  aForm,
  anUrl,
  appendContainerUI,
  appendix,
  csrfHeader,
  csrfToken,
  debug,
  generateHeader,
  getCsrfToken,
  getParamNumberValueFromUrl,
  methods,
  params,
  paths,
  theTitle
} from "../common.js";

let containerUI = aDiv("container");
let card = aDiv("card mt-3");
let form = aForm("form");
let cardBody = aDiv("card-body");

let textId = 0;

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  generateHeader();
  generateUI();
});

function generateUI() {
  appendContainerUI(containerUI);
  getTextId();
  theTitle(cardBody, "Choose Split Sentences Options");
  optionsSplitSentences();
  pageButtons();
  appendix(cardBody, form, card, containerUI);
  updateProgressBarValues();
}

function getTextId() {
  textId = getParamNumberValueFromUrl(params.TEXT_ID);
  if (!textId) {
    console.log("Failed to determinate the ID, Don't Rattle My Cage. ;-)");
  }
}

function updateProgressBarValues() {
  for (let anOption in options) {
    updateProgressBarValue(options[anOption]);
  }
}

function updateProgressBarValue(anOption) {
  let $aBar = $('#' + `${anOption}Bar`);
  let $aValue = $('#' + `${anOption}Value`);
  $aValue.html($aBar.val());
  $aBar.on('input change', () => {
    $aValue.html($aBar.val());
  });
}

let options = {
  COVERAGE: "coverage",
  SPLITS: "splits",
  MATCHING: "matching",
  SECTIONS: "sections"
}

function optionsSplitSentences() {
  let rowCoverage = aDiv(classes.OPTION);
  let titleCoverage = "How many sentences to go through";
  let colTextingCoverage = aColumn("Coverage");
  let colProgressCoverage = aProgress(10, 100, 50, 5, options.COVERAGE, titleCoverage, " %");
  rowCoverage.append(colTextingCoverage, colProgressCoverage);

  let rowSplits = aDiv(classes.OPTION);
  let titleSplits = "Number of sentences to split at once";
  let colTextingSplits = aColumn("Splits");
  let colProgressSplits = aProgress(3, 10, 5, 1, options.SPLITS, titleSplits, null);
  rowSplits.append(colTextingSplits, colProgressSplits);

  let rowMatching = aDiv(classes.OPTION);
  let titleMatching = "Initial percentage of sentences which will match";
  let colTextingMatching = aColumn("Matching sentences");
  let colProgressMatching = aProgress(10, 100, 30, 10, options.MATCHING, titleMatching, " %");
  rowMatching.append(colTextingMatching, colProgressMatching);

  let rowSections = aDiv(classes.OPTION);
  let titleSections = "Number of sections to split sentences into";
  let colTextingSections = aColumn("Sections");
  let colProgressSections = aProgress(2, 4, 2, 1, options.SECTIONS, titleSections, null);
  rowSections.append(colTextingSections, colProgressSections);

  cardBody.append(rowCoverage, rowSplits, rowMatching, rowSections);
}

let classes = {
  OPTION: "row mx-2 my-3",
  BUTTON: "d-flex justify-content-center mt-5"
}

function aColumn(texting) {
  let aCol = aDiv("fw-bold col-4");
  aCol.append(texting);
  return aCol;
}

function aProgress(min, max, myVal, step, myName, myTitle, mySign) {
  let aCol = aDiv("fw-bold col-4");

  let aBar = document.createElement("input");
  aBar.setAttribute("type", "range");
  aBar.min = min;
  aBar.max = max;
  aBar.step = step;
  aBar.name = myName;
  aBar.id = `${myName}Bar`;
  aBar.title = myTitle;
  aBar.value = myVal;

  let aValue = document.createElement("span");
  aValue.setAttribute("class", "fw-bold ms-2")
  aValue.id = `${myName}Value`;
  aCol.append(aBar, aValue);

  if (mySign) {
    let aSign = document.createElement("span");
    aSign.setAttribute("class", "fw-bold")
    aSign.append(mySign);
    aCol.append(aSign);
  }

  return aCol;
}

function pageButtons() {
  let row = aDiv(classes.BUTTON);

  row.append(startLessonButton());
  cardBody.append(row);
}

function startLessonButton() {
  let startLesson = document.createElement("button");
  startLesson.id = "startLesson";
  startLesson.name = "startLesson";
  startLesson.title = "Start Lesson";
  startLesson.type = "button";
  startLesson.setAttribute( "class", "btn btn-primary" );
  startLesson.setAttribute("style", "width: 160px; ");
  startLesson.onclick = function(){ execStartLesson(this) };
  let startLessonIcon = document.createElement("i");
  startLessonIcon.setAttribute("class", "fas fa-user-clock me-2" );
  let startLessonText = document.createTextNode( "Start Lesson" );
  startLesson.append( startLessonIcon, startLessonText );
  return startLesson;
}

function execStartLesson(button) {
  addSpinner(button);
  startLesson();
}

function addSpinner(button) {
  button.disabled = true;

  let aSpinner = document.createElement("span");
  aSpinner.setAttribute("class", "spinner-border spinner-border-sm me-2");
  aSpinner.setAttribute("role", "status");
  let texting = document.createTextNode("Starting ...");
  while (button.firstChild) {
    button.removeChild(button.lastChild);
  }
  button.append(aSpinner, texting);
}

function startLesson() {
  let formData = new FormData(form);
  formData.set("textId", textId);

  if (debug) {
    console.log(JSON.stringify(Object.fromEntries(formData)));
  }

  let searchOptions = new Map();
  searchOptions.set(params.TEXT_ID, textId);
  let url = anUrl(paths.apiLearnOptionsSplitSentences, searchOptions);

  let xhttp = new XMLHttpRequest();
  xhttp.open(methods.POST, url);
  xhttp.setRequestHeader(csrfHeader, csrfToken);
  xhttp.send(formData);

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        window.location.assign(paths.learnLessonSplitSentencesUrl);
      } else {
        console.log("Response status: " + this.status);
        console.log(this.responseText);
      }
    }
  }
}
