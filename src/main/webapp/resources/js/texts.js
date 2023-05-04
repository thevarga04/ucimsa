import {
  aDiv,
  aForm,
  anUrl,
  appendContainerUI,
  appendix,
  csrfHeader,
  csrfToken,
  generateHeader,
  getCsrfToken,
  logResponseAndStatus,
  params,
  paths,
  theTitle
} from "./common.js";

let containerUI = aDiv("container");
let card = aDiv("card mt-3");
let form = aForm("form");
let cardBody = aDiv("card-body");

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  generateHeader();
  getTextsAndGenerateUI();
});

function getTextsAndGenerateUI() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", paths.apiTextsUrl);
  xhttp.setRequestHeader(csrfHeader, csrfToken);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let texts = JSON.parse(this.responseText);
        generateUI(texts);
      } else {
        logResponseAndStatus(this.responseText, this.status);
      }
    }
  }
}


function generateUI(texts) {
  appendContainerUI(containerUI);
  newTextsLinks();
  theTitle(cardBody, texts.length > 0 ? "Your Texts" : "");
  textsAsCards(texts);
  footer();
  appendix(cardBody, form, card, containerUI);
}

function newTextsLinks() {
  let aRow = aDiv("d-flex flex-row mt-4");

  let linkNewHeapText = document.createElement("a");
  linkNewHeapText.setAttribute("class", "btn btn-outline-heap me-4");
  linkNewHeapText.setAttribute("style", "width: 160px;");
  linkNewHeapText.title = "Create new Heap Text";
  linkNewHeapText.href = paths.heapTextUrl;
  let linkNewHeapTextIcon = document.createElement("i");
  linkNewHeapTextIcon.setAttribute("class", "fas fa-list-ul me-2");
  let linkNewHeapTextText = document.createTextNode("New Heap Text");
  linkNewHeapText.append(linkNewHeapTextIcon, linkNewHeapTextText);

  // Other text types goes here ...
  // ...

  aRow.append(linkNewHeapText);
  containerUI.append(aRow);
}

function textsAsCards(texts) {
  for (let text of texts) {
    textCard(text.id, text.textname, entries(text.sentences));
  }
}

// Textname :: Sentences/Entries :: Learn :: Stats :: Share/Private (Delete text when editing it)
function textCard(textId, textname, entries) {
  let aTextCard = aDiv("d-flex card shadow border-left-heap");
  let aTextCardBody = aDiv("row card-body-list");

  let colName = nameElement(textId, textname);
  let colEntries = entriesElement(entries);
  let colLinkLearn = linkLearnElement(textId);
  let colLinkStats = linkStatsElement(textId);

  aTextCardBody.append(colName, colEntries, colLinkLearn, colLinkStats);
  aTextCard.append(aTextCardBody);
  cardBody.append(aTextCard);
}

function entries(sentences) {
  return sentences.split(/\r?\n/).length;
}

function nameElement(textId, textname) {
  let aCol = aDiv("col-auto flex-grow-1");

  let linkTextName = document.createElement("a");
  linkTextName.title = "View or Edit this Test";
  linkTextName.href = anUrl(paths.heapTextUrl, new Map([[params.TEXT_ID, textId]]));
  let nameIcon = document.createElement("i");
  nameIcon.setAttribute("class", "fas fa-edit me-2");
  let nameText = document.createTextNode(textname);
  linkTextName.append(nameIcon, nameText);

  aCol.append(linkTextName);
  return aCol;
}

function entriesElement(entries) {
  let aCol = aDiv("col-auto");

  let spanEntries = document.createElement("span");
  spanEntries.setAttribute("class", "badge badge-secondary badge-pill");
  spanEntries.title = "Sentences";
  spanEntries.setAttribute("style", "cursor: pointer; font-size: 1rem; color: #E8CDA8");
  spanEntries.append(entries);

  aCol.append(spanEntries);
  return aCol;
}

function linkLearnElement(textId) {
  let aCol = aDiv("col-auto");

  let linkLearn = document.createElement("a");
  linkLearn.setAttribute("class", "btn btn-outline-schedule btn-sm");
  linkLearn.setAttribute("style", "width: 90px;");
  linkLearn.title = "Start a learning session with this text";
  linkLearn.href = anUrl(paths.chooseLessonTypeUrl, new Map([[params.TEXT_ID, textId]]));
  let learnIcon = document.createElement("i");
  learnIcon.setAttribute("class", "fa-solid fa-graduation-cap me-2");
  let learnText = document.createTextNode("Learn");
  linkLearn.append(learnIcon, learnText);

  aCol.append(linkLearn);
  return aCol;
}

function linkStatsElement(textId) {
  let aCol = aDiv("col-auto");

  let linkStats = document.createElement("a");
  linkStats.setAttribute("class", "btn btn-outline-test btn-sm");
  linkStats.setAttribute("style", "width: 90px;");
  linkStats.title = "Start a statsing session with this text";
  linkStats.href = anUrl(paths.statsUrl, new Map([[params.TEXT_ID, textId]]));
  let statsIcon = document.createElement("i");
  statsIcon.setAttribute("class", "fa-solid fa-chart-line me-2");
  let statsText = document.createTextNode("Stats");
  linkStats.append(statsIcon, statsText);

  aCol.append(linkStats);
  return aCol;
}


function footer() {
  let footer = document.createElement("div");
  footer.setAttribute("class", "my-3");
  footer.append("");

  cardBody.append(footer);
}
