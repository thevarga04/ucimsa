import {
  aDiv,
  aForm,
  anUrl,
  appendContainerUI,
  appendix,
  csrfHeader,
  csrfToken,
  getCsrfToken,
  logResponseAndStatus,
  methods,
  params,
  paths
} from "../common.js";

let containerUI = aDiv("container");
let card = aDiv("card mt-3");
let form = aForm("form");
let cardBody = aDiv("card-body");

let dto = {
  options: {
    lessonId: 0,
    textId: 0,
    coverage: 100,
    splits: 3,
    matching: 100,
    sections: 2
  },
  heapText: {
    id: 0,
    textname: "",
    sentences: [
      {
        id: 0,
        line: ""
      }
    ]
  }
}

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  appendContainerUI(containerUI);
  getInquiryAndGenerateUI();
});


function getInquiryAndGenerateUI() {
  let xhttp = new XMLHttpRequest();
  xhttp.open(methods.GET, paths.apiLearnInquirySplitSentences);
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
  let row = aDiv("row justify-content-start mt-5");
  row.append(cancelLessonButton());
  cardBody.append(row);
}

function cancelLessonButton() {
  let searchOptions = new Map();
  searchOptions.set(params.LESSON_ID, dto.options.lessonId);
  let url = anUrl(paths.statsUrl, searchOptions);

  let linkCancel = document.createElement("a");
  linkCancel.setAttribute("class", "btn btn-sm btn-outline-secondary mx-3");
  linkCancel.setAttribute("style", "width: 180px;");
  linkCancel.title = "Cancel Lesson";
  linkCancel.href = url;
  let linkCancelIcon = document.createElement("i");
  linkCancelIcon.setAttribute("class", "far fa-window-close me-2");
  let linkCancelText = document.createTextNode("Cancel Lesson");
  linkCancel.append(linkCancelIcon, linkCancelText);
  return linkCancel;
}


function getNextSentence() {

}


function concludeLesson() {
  console.log("Concluding this lesson ...");

}
