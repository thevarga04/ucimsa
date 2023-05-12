import {
  aDiv,
  aForm,
  anUrl,
  appendContainerUI,
  appendix,
  csrfHeader,
  csrfToken,
  debug,
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
  if (dto.options.matching === 100) {
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
    for (let [col, section] of availableSections.entries()) {
      inquiries[col].push(section.pop());
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

  let inquiriesDiv = aDiv("row");
  inquiriesDiv.id = "inquiriesDiv";
  addInquiriesAsCards(inquiriesDiv);
  cardBody.append(inquiriesDiv);

  messageRow();
  pageButtons();
  appendix(cardBody, form, card, containerUI);
}

function addInquiriesAsCards(inquiriesDiv) {
  let row = 0;
  while (row < Math.min(dto.options.splits, inquiries[0].length)) {
    let aRow = aDiv("row card-group");
    for (let i = 0; i < inquiries.length; i++){
      let section = inquiries[i];
      aRow.append(cardSlice(i, section[row]));
    }
    row++;
    inquiriesDiv.append(aRow);
  }
}

function cardSlice(col, cell) {
  let aCard = aDiv("card card-body border-left-heap btn-outline-heap mx-1 my-1", "border-radius: 0.5rem");
  aCard.id = `slice_${col}_${cell.id}`;
  aCard.onclick = function () { selectOrSolve(this, col, cell.id) };
  aCard.append(cell.slice);
  return aCard;
}

function selectOrSolve(aCard, col, id) {
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
    notRightMessage();
    recordWrongPicks(setOfPickedIds);
  } else {
    displayWholeSentence(id);
    recordPick(id, "true");
    nextInquiry(id);
  }
}

function messageRow() {
  let message = aDiv("row d-flex justify-content-center fs-5 mt-4");
  message.setAttribute("style", "min-height: 30px");
  message.id = "message";
  cardBody.append(message);
}

function notRightMessage() {
  let aMessage = document.getElementById("message");
  while (aMessage.firstChild) {
    aMessage.removeChild(aMessage.lastChild);
  }
  aMessage.innerHTML = "That is not right.";
}

function recordWrongPicks(setOfPickedIds) {
  console.log("Wrong pick on IDs: " + JSON.stringify(Array.from(setOfPickedIds.values())));

  for (let id of setOfPickedIds) {
    recordPick(id, "false");
  }
}

function recordPick(id, isGood) {
  if (debug && isGood === "true") {
    console.log("Good pick on ID: " + id);
  }

  let formData = new FormData();
  formData.set("textId", dto.heapText.id);
  formData.set("lessonId", dto.options.lessonId);
  formData.set("sentenceId", id);
  formData.set("goodPick", isGood);
  formData.set("timestamp", Date.now().toString());

  if (debug) {
    console.log(JSON.stringify(Object.fromEntries(formData)))
  }

  let xhttp = new XMLHttpRequest();
  xhttp.open(methods.POST, paths.apiStatsSplitSentences);
  xhttp.setRequestHeader(csrfHeader, csrfToken);
  xhttp.send(formData);

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status !== 200) {
        console.log("Response status: " + this.status);
        console.log(this.responseText);
      }
    }
  }
}

function displayWholeSentence(id) {
  let aMessage = document.getElementById("message");
  while (aMessage.firstChild) {
    aMessage.removeChild(aMessage.lastChild);
  }
  for (let sentence of dto.heapText.sentences) {
    if (sentence.id === id) {
      aMessage.innerHTML = sentence.line;
      break;
    }
  }
}

function nextInquiry(id) {
  if (!availableSections || availableSections.length === 0 || availableSections[0].length === 0) {
    removeSelectedFromInquiries(id);
  } else if (needToSelectMatching(id)) {
    if (replaceSelectedWithMatching(id)) {
      shuffleArrayOfSections(inquiries);
      console.log("Shuffled, because selected ones were replaced by a matching ones.");
    }
  } else {
    replaceSelectedWithAny(id);
  }
  let inquiriesDiv = removeInquiriesAsCards();

  if (!inquiries || inquiries.length === 0 || inquiries[0].length === 0) {
    youCanConcludeThisLesson(inquiriesDiv);
  } else {
    addInquiriesAsCards(inquiriesDiv);
  }
}

function removeSelectedFromInquiries(id) {
  for (const section of inquiries) {
    let indexToRemove = 0;
    for (const [row, cell] of section.entries()) {
      if (cell.id === id) {
        indexToRemove = row;
      }
    }
    section.splice(indexToRemove, 1);
  }
}

function needToSelectMatching(selectedId) {
  let mapOfIds = new Map();
  for (let section of inquiries) {
    for (let cell of section) {
      let id = cell.id;
      let count = mapOfIds.get(id);
      if (count) {
        mapOfIds.set(id, count + 1);
      } else {
        mapOfIds.set(id, 1);
      }
    }
  }
  for (let [id, value] of mapOfIds) {
    if (id !== selectedId && value === dto.options.sections) {
      return false;
    }
  }
  return true;
}

function replaceSelectedWithMatching(id) {
  let nextMatchingId = findOneAvailableInAllSections();
  if (!nextMatchingId) {
    replaceSelectedWithAny(id);
    return false;
  }

  for (let [col, section] of inquiries.entries()) {
    for (let cell of section) {
      if (cell.id === id) {
        let slice = getAndRemoveMatchingOne(nextMatchingId, availableSections[col]);
        cell.id = nextMatchingId;
        cell.slice = slice;
      }
    }
  }
  return true;
}

function findOneAvailableInAllSections() {
  let mapOfIds = new Map();
  for (let section of availableSections) {
    for (let cell of section) {
      let id = cell.id;
      let count = mapOfIds.get(id);
      if (count) {
        mapOfIds.set(id, count + 1);
      } else {
        mapOfIds.set(id, 1);
      }
    }
  }
  for (let [id, value] of mapOfIds) {
    if (value === dto.options.sections) {
      return id;
    }
  }
}

function getAndRemoveMatchingOne(nextMatchingId, availableSection) {
  let indexToRemove = 0;
  let slice = "nextMatchingId Not Found in this availableSection :-(";
  for (let [row, cell] of availableSection.entries()) {
    if (cell.id === nextMatchingId) {
      indexToRemove = row;
      slice = cell.slice;
      break;
    }
  }
  availableSection.splice(indexToRemove, 1);
  return slice;
}

function replaceSelectedWithAny(id) {
  for (let [col, section] of inquiries.entries()) {
    for (let cell of section) {
      if (cell.id === id) {
        let nextCell = availableSections[col].pop();
        cell.id = nextCell.id;
        cell.slice = nextCell.slice;
      }
    }
  }
}

function removeInquiriesAsCards() {
  let inquiriesDiv = document.getElementById("inquiriesDiv");
  while (inquiriesDiv.firstChild) {
    inquiriesDiv.removeChild(inquiriesDiv.lastChild);
  }
  return inquiriesDiv;
}

function pageButtons() {
  let row = aDiv("row justify-content-start mt-5");
  row.id = "rowPageButtons";
  row.append(cancelLessonButton());
  cardBody.append(row);
}

function cancelLessonButton() {
  let searchOptions = new Map();
  searchOptions.set(params.LESSON_ID, dto.options.lessonId);
  let url = anUrl(paths.statsUrl, searchOptions);

  let linkCancel = document.createElement("a");
  linkCancel.id = "linkCancel";
  linkCancel.setAttribute("class", "btn btn-sm btn-outline-secondary mx-3");
  linkCancel.setAttribute("style", "width: 180px;");
  linkCancel.title = "Cancel Lesson";
  linkCancel.href = url;
  linkCancel.onclick = function () { concludeLesson() };
  let linkCancelIcon = document.createElement("i");
  linkCancelIcon.setAttribute("class", "far fa-window-close me-2");
  let linkCancelText = document.createTextNode("Cancel Lesson");
  linkCancel.append(linkCancelIcon, linkCancelText);
  return linkCancel;
}

function youCanConcludeThisLesson(inquiriesDiv) {
  inquiriesDiv.classList.add("justify-content-center");
  inquiriesDiv.append("You Can Conclude This Lesson");

  let rowPageButtons = document.getElementById("rowPageButtons");
  rowPageButtons.classList.remove("justify-content-start");
  rowPageButtons.classList.add("justify-content-center");
  while (rowPageButtons.firstChild) {
    rowPageButtons.removeChild(rowPageButtons.lastChild);
  }
  rowPageButtons.append(concludeLessonButton());
}

function concludeLessonButton() {
  let searchOptions = new Map();
  searchOptions.set(params.LESSON_ID, dto.options.lessonId);
  let url = anUrl(paths.statsUrl, searchOptions);

  let linkConclude = document.createElement("a");
  linkConclude.id = "linkConclude";
  linkConclude.setAttribute("class", "btn btn-outline-success mx-3");
  linkConclude.setAttribute("style", "width: 180px;");
  linkConclude.title = "Conclude Lesson";
  linkConclude.href = url;
  linkConclude.onclick = function () { concludeLesson() };
  let linkConcludeIcon = document.createElement("i");
  linkConcludeIcon.setAttribute("class", "fa-regular fa-circle-check me-2");
  let linkConcludeText = document.createTextNode("Conclude Lesson");
  linkConclude.append(linkConcludeIcon, linkConcludeText);
  return linkConclude;
}

function concludeLesson() {
  console.log("Concluding this lesson ...");
  form = null;

  let xhttp = new XMLHttpRequest();
  xhttp.open(methods.DELETE, paths.apiLearnInquirySplitSentences);
  xhttp.setRequestHeader(csrfHeader, csrfToken);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status !== 200) {
        console.log("Response status: " + this.status);
        console.log(this.responseText);
      }
    }
  }
}
