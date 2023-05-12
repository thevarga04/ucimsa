import {
  aDiv,
  aForm,
  appendContainerUI,
  csrfHeader,
  csrfToken,
  generateHeader,
  getCsrfToken,
  getParamNumberValueFromUrl,
  logResponseAndStatus,
  params,
  paths
} from "./common.js";

let containerUI = aDiv("container");
let card = aDiv("card mt-3");
let form = aForm("form");
let cardBody = aDiv("card-body");
let lessonId;
let textId;

let dtoLesson = {

}

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  appendContainerUI(containerUI);
  generateHeader();
  getStatsAndGenerateUI();
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

}


function displayStatsForText() {

}


function displayTextsAndLessonsReport() {

}
