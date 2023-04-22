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

function textAsCard(text) {
  // Textname :: Sentences/Entries :: Learn :: Stats :: Share/Private :: Delete
  textCard(text.id, text.textname);
  // textname(text);
}

function textCard(id, textname) {
  let div1 = document.createElement("div");
  div1.setAttribute("id", "card_" + id);
  div1.setAttribute("class", "mb-1");

  let test_type = document.createElement("input");
  test_type.id = "type_" + id;
  test_type.value = "HEAP";
  test_type.type = "hidden";
  div1.append(test_type);

  let div2 = document.createElement("div");
  div2.setAttribute("class", "card shadow border-left-heap");

  let div3 = document.createElement("div");
  div3.setAttribute("class", "card-body-mylist");

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

  let edit_link = document.createElement("a");
  edit_link.title = "View or Edit this Test";
  edit_link.href = "/api/texts/" + id + "?type=HEAP";

  let edit_icon = document.createElement("i");
  edit_icon.setAttribute("class", "fas fa-edit me-2");

  let edit_text = document.createTextNode(textname);
  edit_link.append(edit_icon, edit_text);

  div8.append(edit_link);
  div7.append(div8);
  div6.append(div7);
  div5.append(div6);
  div4.append(div5);
  div3.append(div4);
  div2.append(div3);
  div1.append(div2);
  cardBody.append(div1);
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
