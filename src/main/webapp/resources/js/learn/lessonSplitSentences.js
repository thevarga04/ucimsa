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
  paths,
  theTitle
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
          assemblyDataModelAndGenerateSplitSentencesUI();
        }
      } else {
        logResponseAndStatus(this.responseText, this.status);
        concludeLesson();
      }
    }
  }
}

function assemblyDataModelAndGenerateSplitSentencesUI() {
  theTitle(cardBody, dto.heapText.textname);
  sliceSentencesByWordsIfPossible();
  divideSlicesToSections();
  constructSectionsToDisplay();

  if (dto.options.coverage === 100) {
    popAndPush(dto.options.splits);
  } else {
    let rest = popAndPushMatchingOnes();
    shuffleArrayOfSections(availableSections);
    popAndPush(rest);
  }
  shuffleArrayOfSections(sectionsToDisplay);

  generateUI();

  pageButtons();
  appendix(cardBody, form, card, containerUI);
}

let gridOfSlices = [];
let availableSections = [];
let sectionsToDisplay = [];
function sliceSentencesByWordsIfPossible() {
  for (let sentence of dto.heapText.sentences) {
    let row = [];
    let id = sentence.id;
    let line = sentence.line;
    let from = 0;
    let max = Math.floor(line.length / dto.options.sections);
    let section = 0;
    while (section++ < dto.options.sections) {
      let slice = "";
      if (section < dto.options.sections) {
        let to = toIndex(line, from, max);
        slice = line.substring(from, to);
        from = to;
      } else {
        slice = line.substring(from);
      }
      max += slice.length;

      let cell = {
        id: id,
        line: slice.trim()
      }
      row.push(cell);
    }
    gridOfSlices.push(row);
  }
}

function toIndex(line, from, max) {
  let to = from;
  let index = from;
  while (index++ < max) {
    if (line.charAt(index).trim() === '') {
      to = index;
    }
  }
  if (to > from) {
    return to + 1;
  } else {
    return max + 1;
  }
}

function divideSlicesToSections() {
  let i = 0;
  while (i < dto.options.sections) {
    let section = [];
    for (let row of gridOfSlices) {
      let id = row[i].id;
      let slice = row[i].line;
      let cell = {
        id: id,
        slice: slice
      }
      section.push(cell);
    }
    availableSections.push(section);
    i++;
  }
}

function constructSectionsToDisplay() {
  let sections = dto.options.sections;
  while (sections-- > 0) {
    sectionsToDisplay.push([]);
  }
}

function popAndPushMatchingOnes() {
  let matching = Math.floor(Math.max(1, dto.options.matching / 100 * dto.options.splits));
  let rest = dto.options.splits - matching;
  popAndPush(matching);
  return rest;
}

function popAndPush(splits) {
  while (splits-- > 0) {
    for (let [i, section] of availableSections.entries()) {
      sectionsToDisplay[i].push(section.pop());
    }
  }
}

function shuffleArrayOfSections(arrayOfSections) {
  for (let section of arrayOfSections) {
    section.sort(() => Math.random() - 0.5);
  }
}

// If matching === 100%
// Shuffle sectionsToDisplay after every pick (positive hit)
// else
// After every pick (positive hit) poll availableSections and check if there will be
// at least 1 matching, and if not poll matching one and shuffle sectionsToDisplay.
function generateUI() {

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

function concludeLesson() {
  console.log("Concluding this lesson ...");

}
