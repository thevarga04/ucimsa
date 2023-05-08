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
  sliceSentencesByWordsIfPossible();
  divideSlicesToSections();
  constructSectionsToDisplay();
  popAvailableAndPushInquiries();

  generateUI();
}

let gridOfSlices = [];
let availableSections = [];
let inquiries = [];
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
    inquiries.push([]);
  }
}

function popAvailableAndPushInquiries() {
  if (dto.options.coverage === 100) {
    popAndPush(dto.options.splits);
  } else {
    let matching = Math.floor(Math.max(1, dto.options.matching / 100 * dto.options.splits));
    popAndPush(matching);
    shuffleArrayOfSections(availableSections);
    popAndPush(dto.options.splits - matching);
  }
  shuffleArrayOfSections(inquiries);
}

function popAndPush(splits) {
  while (splits-- > 0) {
    for (let [i, section] of availableSections.entries()) {
      inquiries[i].push(section.pop());
    }
  }
}

function shuffleArrayOfSections(arrayOfSections) {
  for (let section of arrayOfSections) {
    section.sort(() => Math.random() - 0.5);
  }
}

function generateUI() {
  theTitle(cardBody, dto.heapText.textname);
  inquiriesAsCards();
  pageButtons();
  appendix(cardBody, form, card, containerUI);
}

function inquiriesAsCards() {
  let row = 0;
  while (row < dto.options.splits) {
    let aRow = aDiv("row card-group");
    for (let i = 0; i < inquiries.length; i++){
      let inquiry = inquiries[i];
      aRow.append(cardSlice(i, inquiry[row]));
    }
    row++;
    cardBody.append(aRow);
  }
}

function cardSlice(col, cell) {
  let aCard = aDiv("card card-body border-left-heap btn-outline-heap mx-1 my-1", "border-radius: 0.5rem");
  aCard.id = `slice_${col}_${cell.id}`;
  aCard.onclick = function () { selectOrSolve(this, col, cell.id) };
  aCard.append(cell.id + " " + cell.slice);
  return aCard;
}

function selectOrSolve(aCard, col, id) {
  // TODO: Disable this card ...
  deselectAllCardsInThisCol(col);
  selectThisCard(aCard);
  solveIfRight(id);
}

function deselectAllCardsInThisCol(col) {
  let pattern = `slice_${col}`;
  let cardsInThisCol = document.querySelectorAll(`[id^=${CSS.escape(pattern)}]`);
  for (let aCard of cardsInThisCol) {
    aCard.classList.remove("btn-outline-heap-selected");
    aCard.classList.add("btn-outline-heap");
  }
}

function selectThisCard(aCard) {
  aCard.classList.remove("btn-outline-heap");
  aCard.classList.add("btn-outline-heap-selected");
}

function solveIfRight(id) {
  let selectedSlices = document.getElementsByClassName("btn-outline-heap-selected");
  if (selectedSlices.length < dto.options.sections) {
    return;
  }

  let wrongPick = false;
  let setOfPickedIds = new Set();
  for (let selectedSlice of selectedSlices) {
    let selectedId = parseInt(selectedSlice.id.split('_').pop(), 10);
    setOfPickedIds.add(selectedId);
    if (selectedId !== id) {
      wrongPick = true;
    }
  }

  if (wrongPick) {
    recordWrongPick(setOfPickedIds);
    // TODO: enable this card ...
  } else {
    displayWholeSentence(id);
    recordGoodPick(id);
    nextInquiry(selectedSlices);
  }
}

function recordWrongPick(setOfPickedIds) {
  console.log("Wrong pick on IDs: " + JSON.stringify(Array.from(setOfPickedIds.values())));
  // ...

}

function displayWholeSentence(id) {
  // from gridOfSlices ...

}

function recordGoodPick(id) {
  console.log("Good pick on ID: " + id);
  // ...

}

// If matching === 100%
// Shuffle inquiries after every pick (positive hit)
// else
// After every pick (positive hit) poll availableSections and check if there will be
// at least 1 matching, and if not poll matching one and shuffle inquiries.
function nextInquiry(selectedSlices) {

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
