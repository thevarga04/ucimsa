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
  xhttp.open("GET", urls.getTextsUrl)
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
  legend();
  textsAsCards(texts);
  footer();
  appendix();
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
    textAsCard(text);
  }
}

// Textname :: Sentences/Entries :: Learn :: Stats :: Share/Private (Delete text when editing it)
function textAsCard(text) {
  textCard(text.id, text.textname, entries(text.sentences));
}

function textCard(id, textname, entries) {
  let type = "HEAP";

  let div1 = document.createElement("div");
  div1.setAttribute("id", "card_" + id);
  div1.setAttribute("class", "mb-1");

  let div2 = document.createElement("div");
  div2.setAttribute("class", "card shadow border-left-heap");

  let div3 = document.createElement("div");
  div3.setAttribute("class", "card-body-list");

  let div4 = document.createElement("div");
  div4.setAttribute("class", "row align-items-center");

  let div5 = document.createElement("div");
  div5.setAttribute("class", "col");

  let div6 = document.createElement("div");
  div6.setAttribute("class", "row align-items-center justify-content-between");

  // Icon, Testname
  let div7 = document.createElement("div");
  div7.setAttribute("class", "col-auto");

  let div8 = document.createElement("div");
  div8.setAttribute("class", "h6 mb-0 font-weight-bold");

  let nameLink = document.createElement("a");
  nameLink.title = "View or Edit this Test";
  nameLink.href = "/api/texts/" + id + "?type=" + type;
  let nameIcon = document.createElement("i");
  nameIcon.setAttribute("class", "fas fa-edit me-2");
  let nameText = document.createTextNode(textname);
  nameLink.append(nameIcon, nameText);

  // Sentences/Entries
  let div7Entries = document.createElement("div");
  div7Entries.setAttribute("class", "col-auto");
  let div7Span = document.createElement("span");
  div7Span.setAttribute("class", "badge badge-secondary badge-pill");
  div7Span.title = type === "HEAP" ? "Sentences" : "Entries";
  div7Span.setAttribute("style", "cursor: pointer; font-size: 1rem" + (type === "HEAP" ? "; color: #E8CDA8" : ""));
  div7Span.append(entries);
  div7Entries.append(div7Span);

  // Learn
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

  // Stats
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

  // // Delete is irreversible operation, delete text when editing
  // let divDelete = document.createElement("div");
  // divDelete.setAttribute("class", "col-auto");
  // let delete_button = document.createElement("button");
  // delete_button.setAttribute("style", "width: 90px");
  // delete_button.setAttribute("class", "btn btn-outline-danger btn-sm");
  // delete_button.title = "Delete this text permanently.";
  // delete_button.onclick = function () { deleteText(id) };
  // let delete_icon = document.createElement("i");
  // delete_icon.setAttribute("class", "far fa-trash-alt me-2");
  // let delete_text = document.createTextNode("Delete");
  // delete_button.append(delete_icon, delete_text);
  // divDelete.append(delete_button);

  div8.append(nameLink);
  div7.append(div8);
  div6.append(div7, div7Entries);
  div5.append(div6);
  div4.append(div5, divLearn, divStats);
  div3.append(div4);
  div2.append(div3);
  div1.append(div2);
  cardBody.append(div1);
}

function entries(sentences) {
  return sentences.split(/\r?\n/).length;
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
