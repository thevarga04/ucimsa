import {
  aDiv,
  anUrl,
  appendix,
  createContainerUI,
  formCardAndCardBody,
  generateHeader,
  getCsrfToken,
  getParamNumberValueFromUrl,
  params,
  paths,
  theTitle
} from "../common.js";

let containerUI = document.createElement("div");
let card = document.createElement("div");
let form = document.createElement("form");
let cardBody = document.createElement("div");

let textId = 0;

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  generateHeader();
  generateUI();
});

function generateUI() {
  createContainerUI(containerUI);
  formCardAndCardBody(form, card, cardBody);
  getId();
  theTitle(cardBody, "Choose Lesson Type");
  lessonTypesAsCards();
  appendix(cardBody, form, card, containerUI);
}

function getId() {
  textId = getParamNumberValueFromUrl(params.TEXT_ID);
  if (!textId) {
    console.log("Failed to determinate the ID, Don't Rattle My Cage.");
  }
}

function lessonTypesAsCards() {
  let group = aDiv("card-group");

  let textSplit = "Sentence splitting or sentence simplification is the task of taking a sentence that is usually too long and breaking it up into two or more simpler sentences.";
  let linkSplit = "Split sentences";
  let hrefSplit = anUrl(paths.learnSplitSentencesOptionsUrl, new Map([[params.TEXT_ID, textId]]));
  let cardSplit = cardLesson("heap", textSplit, linkSplit, hrefSplit, 147, 147);

  // Find Mistake | Assembly Sentence | Fill Blanks (from shuffled letters)
  let textAnother = "Another lesson type ...";
  let linkAnother = "Another lesson type";
  let hrefAnother = "/lessons/anotherType";
  let cardAnother = cardLesson("mcq", textAnother, linkAnother, hrefAnother, 3, 0);

  group.append(cardSplit, cardAnother);
  cardBody.append(group);
}

function cardLesson(type, texting, linkText, linkHref, sessions, rate) {
  let aCard = aDiv(`card shadow border-left-${type} mx-4`);
  aCard.setAttribute("style", "border-radius: 1rem;");

  let aBody = aDiv("card-body");

  let wording = document.createElement("p");
  wording.setAttribute("class", "card-text");
  wording.append(texting);

  let aLink = document.createElement("a");
  aLink.setAttribute("class", `btn btn-outline-${type} stretched-link mb-3`);
  aLink.append(linkText);
  aLink.href = linkHref;

  let aFooter = aDiv("card-footer");

  let footerWording = document.createElement("small");
  footerWording.setAttribute("class", "text-muted");
  footerWording.append(`Sessions: ${sessions}, Success rate: ${rate}%`);

  aFooter.append(footerWording);
  aBody.append(wording, aLink, aFooter);
  aCard.append(aBody);
  return aCard;
}
