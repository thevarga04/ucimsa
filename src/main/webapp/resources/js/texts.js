import {
  appendix,
  createContainerUI,
  csrfHeader,
  csrfToken,
  formCardAndCardBody,
  generateHeader,
  getCsrfToken,
  logResponseAndStatus,
  theTitle,
  urls
} from "./common.js";

let containerUI = document.createElement("div");
let card = document.createElement("div");
let form = document.createElement("form");
let cardBody = document.createElement("div");

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  generateHeader();
  getTextsAndGenerateUI();
});

function getTextsAndGenerateUI() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", urls.apiTextsUrl);
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
  createContainerUI(containerUI);
  formCardAndCardBody(form, card, cardBody);
  newTextsLinks();
  theTitle(cardBody, texts.length > 0 ? "Your Texts" : "");
  textsAsCards(texts);
  footer();
  appendix(cardBody, form, card, containerUI);
}

function newTextsLinks() {
  let row = document.createElement("div");
  row.setAttribute("class", "d-flex flex-row mt-4");

  let linkNewHeapText = document.createElement("a");
  linkNewHeapText.setAttribute("class", "btn btn-outline-heap me-4");
  linkNewHeapText.setAttribute("style", "width: 160px;");
  linkNewHeapText.title = "Create new Heap Text";
  linkNewHeapText.href = "/texts/heap";
  let linkNewHeapTextIcon = document.createElement("i");
  linkNewHeapTextIcon.setAttribute("class", "fas fa-list-ul me-2");
  let linkNewHeapTextText = document.createTextNode("New Heap Text");
  linkNewHeapText.append(linkNewHeapTextIcon, linkNewHeapTextText);
  row.append(linkNewHeapText);
  containerUI.append(row);
}

function textsAsCards(texts) {
  for (let text of texts) {
    textCard(text.id, text.textname, entries(text.sentences));
  }
}

// Textname :: Sentences/Entries :: Learn :: Stats :: Share/Private (Delete text when editing it)
function textCard(id, textname, entries) {
  let divCard = document.createElement("div");
  divCard.setAttribute("class", "d-flex card shadow border-left-heap");

  let divRow = document.createElement("div");
  divRow.setAttribute("class", "row card-body-list");

  let divColName = textNameElement(id, textname);
  let divColEntries = entriesElement(entries);
  let divColLearn = textLearnElement(id);
  let divColStats = textStatsElement(id);

  divRow.append(divColName, divColEntries, divColLearn, divColStats);
  divCard.append(divRow);
  cardBody.append(divCard);
}

function entries(sentences) {
  return sentences.split(/\r?\n/).length;
}

function textNameElement(id, textname) {
  let divColName = document.createElement("div");
  divColName.setAttribute("class", "col-auto flex-grow-1");
  let nameLink = document.createElement("a");
  nameLink.title = "View or Edit this Test";
  nameLink.href = "/texts/heap?id=" + id;
  let nameIcon = document.createElement("i");
  nameIcon.setAttribute("class", "fas fa-edit me-2");
  let nameText = document.createTextNode(textname);
  nameLink.append(nameIcon, nameText);
  divColName.append(nameLink);
  return divColName;
}

function entriesElement(entries) {
  let divColEntries = document.createElement("div");
  divColEntries.setAttribute("class", "col-auto");
  let divEntries = document.createElement("div");
  divEntries.setAttribute("class", "col-auto");
  let divSpan = document.createElement("span");
  divSpan.setAttribute("class", "badge badge-secondary badge-pill");
  divSpan.title = "Sentences";
  divSpan.setAttribute("style", "cursor: pointer; font-size: 1rem; color: #E8CDA8");
  divSpan.append(entries);
  divEntries.append(divSpan);
  divColEntries.append(divEntries);
  return divColEntries;
}

function textLearnElement(id) {
  let divColLearn = document.createElement("div");
  divColLearn.setAttribute("class", "col-auto");
  let divLearn = document.createElement("div");
  divLearn.setAttribute("class", "col-auto");
  let learnLink = document.createElement("a");
  learnLink.setAttribute("class", "btn btn-outline-schedule btn-sm");
  learnLink.setAttribute("style", "width: 90px;");
  learnLink.title = "Start a learning session with this text";
  learnLink.href = "/texts/learn?id=" + id;
  let learnIcon = document.createElement("i");
  learnIcon.setAttribute("class", "fa-solid fa-graduation-cap me-2");
  let learnText = document.createTextNode("Learn");
  learnLink.append(learnIcon, learnText);
  divLearn.append(learnLink);
  divColLearn.append(divLearn);
  return divColLearn;
}

function textStatsElement(id) {
  let divColStats = document.createElement("div");
  divColStats.setAttribute("class", "col-auto");
  let divStats = document.createElement("div");
  divStats.setAttribute("class", "col-auto");
  let statsLink = document.createElement("a");
  statsLink.setAttribute("class", "btn btn-outline-test btn-sm");
  statsLink.setAttribute("style", "width: 90px;");
  statsLink.title = "Start a statsing session with this text";
  statsLink.href = "/texts/stats?id=" + id;
  let statsIcon = document.createElement("i");
  statsIcon.setAttribute("class", "fa-solid fa-chart-line me-2");
  let statsText = document.createTextNode("Stats");
  statsLink.append(statsIcon, statsText);
  divStats.append(statsLink);
  divColStats.append(divStats);
  return divColStats;
}


function footer() {
  let footer = document.createElement("div");
  footer.setAttribute("class", "my-3");
  footer.append("");

  cardBody.append(footer);
}
