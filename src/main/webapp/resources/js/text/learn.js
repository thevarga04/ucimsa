import {appendix, createContainerUI, formCardAndCardBody, generateHeader, getCsrfToken, theTitle} from "../common.js";

let containerUI = document.createElement("div");
let card = document.createElement("div");
let form = document.createElement("form");
let cardBody = document.createElement("div");

let id = 0;
let dto;

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  generateHeader();
  generateUI();
});

function generateUI() {
  createContainerUI(containerUI);
  formCardAndCardBody(form, card, cardBody);
  theTitle(cardBody, "Choose Lesson Type");
  lessonTypesAsCards();
  appendix(cardBody, form, card, containerUI);
}

function lessonTypesAsCards() {
  let group = document.createElement("div");
  group.setAttribute("class", "card-group");

  let tSplit = "Sentence splitting or sentence simplification is the task of taking a sentence that is usually too long and breaking it up into two or more simpler sentences.";
  let nSplit = "Split sentences";
  let hSplit = "/lessons/splitSentences";
  let lSplit = lesson("heap", tSplit, nSplit, hSplit, 14, 74);

  let tAnother = "Another lesson type ...";
  let nAnother = "Another lesson type";
  let hAnother = "/lessons/anotherType";
  let lAnother = lesson("mcq", tAnother, nAnother, hAnother, 3, 0);

  group.append(lSplit, lAnother);
  cardBody.append(group);
}

function lesson(type, texting, linkText, linkHref, sessions, rate) {
  let aCard = document.createElement("div");
  aCard.setAttribute("class", `card shadow border-left-${type} mx-4`);
  aCard.setAttribute("style", "border-radius: 1rem;");

  let aBody = document.createElement("div");
  aBody.setAttribute("class", "card-body");

  let wording = document.createElement("p");
  wording.setAttribute("class", "card-text");
  wording.append(texting);

  let aLink = document.createElement("a");
  aLink.setAttribute("class", `btn btn-outline-${type} stretched-link mb-3`);
  aLink.append(linkText);
  aLink.href = linkHref;

  let aFooter = document.createElement("div");
  aFooter.setAttribute("class", "card-footer");

  let footerWording = document.createElement("small");
  footerWording.setAttribute("class", "text-muted");
  footerWording.append(`Sessions: ${sessions}, Success rate: ${rate}%`);

  aFooter.append(footerWording);
  aBody.append(wording, aLink, aFooter);
  aCard.append(aBody);
  return aCard;
}


