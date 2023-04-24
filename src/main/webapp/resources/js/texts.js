import {createContainerUI, generateHeader, getCsrfToken, urls} from "./common.js";

let debug = true;
let containerUI;
let card = document.createElement("div");
let form = document.createElement("form");
let cardBody = document.createElement("div");

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  generateHeader();
  getTexts();
});

function getTexts() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", urls.apiTextsUrl)
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let texts = JSON.parse(this.responseText);
        if (texts.length > 0) {
          generateUI(texts);
        } else {
          logResponseAndStatus();
        }
      } else {
        logResponseAndStatus();
      }
    }
  }
}

function logResponseAndStatus() {
  if (debug) {
    console.log("ResponseText: " + this.responseText);
    console.log("Status: " + this.status);
  }
}


function generateUI(texts) {
  initContainerCardFormBody();
  newTexts();
  legend();
  textsAsCards(texts);
  footer();
  appendix();
}

function newTexts() {
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

function initContainerCardFormBody() {
  containerUI = createContainerUI();

  card.id = "card";
  card.setAttribute("class", "card mt-3");

  form.id = "form";
  form.setAttribute("method", "POST");

  cardBody.id = "cardBody";
  cardBody.setAttribute("class", "card-body");
}

function legend() {
  let legend = document.createElement("div");
  legend.id = "header";
  legend.setAttribute("class", "row myLegend mx-2");
  legend.append("Your Texts");

  cardBody.append(legend);
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
  learnLink.href = "/api/learn/" + id;
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
  statsLink.href = "/api/stats/" + id;
  let statsIcon = document.createElement("i");
  statsIcon.setAttribute("class", "fa-solid fa-chart-line me-2");
  let statsText = document.createTextNode("Stats");
  statsLink.append(statsIcon, statsText);
  divStats.append(statsLink);
  divColStats.append(divStats);
  return divColStats;
}

// Delete is irreversible operation, delete text when editing
function textDeleteElement(id) {
  let divDelete = document.createElement("div");
  divDelete.setAttribute("class", "col-auto");
  let delete_button = document.createElement("button");
  delete_button.setAttribute("style", "width: 90px");
  delete_button.setAttribute("class", "btn btn-outline-danger btn-sm");
  delete_button.title = "Delete this text permanently.";
  delete_button.onclick = function () { deleteText(id) };
  let delete_icon = document.createElement("i");
  delete_icon.setAttribute("class", "far fa-trash-alt me-2");
  let delete_text = document.createTextNode("Delete");
  delete_button.append(delete_icon, delete_text);
  divDelete.append(delete_button);
}

function deleteText(id) {
  console.log("Deleting text: " + id);
}

function footer() {
  let footer = document.createElement("div");
  footer.setAttribute("class", "my-3");
  footer.append("");

  cardBody.append(footer);
}

function appendix() {
  form.append(cardBody);
  card.append(form);
  containerUI.append(card);
}
