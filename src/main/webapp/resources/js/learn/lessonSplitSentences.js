// REST
// Get sessionId and other details from HttpSession

// JS:
// generate the LS UI and as the 1st inquiry
// as well as all the subsequent queries:
// POST /api/learn/inquiry?sessionId=xyz (returning next Inquiry or NO_CONTENT if done)

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
  logResponseAndStatus,
  methods,
  params,
  paths
} from "../common.js";

let containerUI = aDiv("container");
let card = aDiv("card mt-3");
let form = aForm("form");
let cardBody = aDiv("card-body");

let sessionId = 0;
let dto; // .. TODO: with the details ...

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  getSessionId();
  appendContainerUI(containerUI);
  getInquiryAndGenerateUI();
});

function getSessionId() {
  sessionId = getParamNumberValueFromUrl(params.SESSION_ID);
  if (!sessionId) {
    console.log("Failed to determinate SessionID, Don't Rattle My Cage. ;-)");
  }
}

function getInquiryAndGenerateUI() {
  let searchOptions = new Map();
  searchOptions.set(params.SESSION_ID, sessionId);
  let url = anUrl(paths.apiLearnInquirySplitSentences, searchOptions);

  let xhttp = new XMLHttpRequest();
  xhttp.open(methods.GET, url);
  xhttp.setRequestHeader(csrfHeader, csrfToken);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        dto = JSON.parse(this.responseText);
        if (dto.length === 0) {
          concludeLesson();
        } else {
          generateSplitSentencesUI();
        }
      } else {
        logResponseAndStatus(this.responseText, this.status);
        concludeLesson();
      }
    }
  }
}

function generateSplitSentencesUI() {
  splitSentencesUI();
  pageButtons();
  appendix(cardBody, form, card, containerUI);
}

function splitSentencesUI() {

}

function pageButtons() {
  let row = aDiv("row mt-5");
  let col1 = aDiv("col");
  let col2 = aDiv("col-auto");
  let col3 = aDiv("col");
  col1.append(cancelLessonButton());
  col2.append(nextInquiryButton());
  col3.append("");

  row.append(col1, col2, col3);
  cardBody.append(row);
}

function cancelLessonButton() {
  let linkCancel = document.createElement("a");
  linkCancel.setAttribute("class", "btn btn-outline-warning");
  linkCancel.setAttribute("style", "width: 100px;");
  linkCancel.title = "Cancel Lesson";
  linkCancel.href = paths.statsUrl; // TODO: + sessionId
  let linkCancelIcon = document.createElement("i");
  linkCancelIcon.setAttribute("class", "far fa-window-close me-2");
  let linkCancelText = document.createTextNode("Cancel");
  linkCancel.append(linkCancelIcon, linkCancelText);
  return linkCancel;
}

function nextInquiryButton() {
  let nextInquiry = document.createElement("button");
  nextInquiry.id = "nextInquiry";
  nextInquiry.name = "Next";
  nextInquiry.title = "Next";
  nextInquiry.type = "button";
  nextInquiry.setAttribute("class", "btn btn-outline-success mx-3");
  nextInquiry.setAttribute("style", "width: 140px");
  nextInquiry.onclick = function () { getNextInquiry() };
  let nextInquiryIcon = document.createElement("i");
  nextInquiryIcon.setAttribute("class", "far fa-check-circle me-2"); // TODO: disabled while not solved
  let nextInquiryText = document.createTextNode("Next");
  nextInquiry.append(nextInquiryIcon, nextInquiryText);
  return nextInquiry;
}

function getNextInquiry() {

}


function concludeLesson() {
  console.log("Concluding this lesson ...");

}
