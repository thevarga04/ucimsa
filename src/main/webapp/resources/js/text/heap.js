import {
  appendix,
  createContainerUI,
  csrfHeader,
  csrfToken,
  debug,
  displayWarning,
  formCardAndCardBody,
  generateHeader,
  getCsrfToken,
  httpHeaders,
  logResponseAndStatus,
  methods,
  theTitle,
  urls
} from "../common.js";

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
  generateUIorFirstGetText();
});

function generateUIorFirstGetText() {
  let idValue = new URLSearchParams(window.location.search).get("id");
  if (idValue != null) {
    let idNumber = parseInt(idValue, 10);
    if (!isNaN(idNumber)) {
      id = idNumber;
      getTextAndGenerateUI();
      return;
    }
  }
  generateUI();
}

function getTextAndGenerateUI() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", urls.apiHeapTextUrl + "/" + id);
  xhttp.setRequestHeader(csrfHeader, csrfToken);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        dto = JSON.parse(this.responseText);
        generateUI();
      } else {
        logResponseAndStatus(this.responseText, this.status);
      }
    }
  }
}


function generateUI() {
  createContainerUI(containerUI);
  formCardAndCardBody(form, card, cardBody);
  theTitle(cardBody, "Your new text");
  textName();
  textarea();
  pageButtons();
  appendix(cardBody, form, card, containerUI);
  countCharsInTextarea();
}



function textName() {
  let nameRow = document.createElement("div");
  nameRow.setAttribute("class", "row");

  let nameCol = document.createElement("div");
  nameCol.setAttribute("class", "col");

  let nameLabel = document.createElement("label");
  nameLabel.setAttribute("style", "width: 100%");

  let nameSpan = document.createElement("span");
  nameSpan.setAttribute("class", "h6 ml-2");
  nameSpan.append("Name");

  let nameInput = document.createElement("input");
  nameInput.setAttribute("class", "form-control input-heap mt-2");
  nameInput.id = "textname";
  nameInput.name = "textname";
  nameInput.placeholder = "Text Name";
  nameInput.autofocus = true;
  nameInput.maxLength = 64;
  nameInput.type = "text";
  nameInput.value = dto == null ? null : dto.textname;

  nameLabel.append(nameSpan, nameInput);
  nameCol.append(nameLabel);
  nameRow.append(nameCol);
  cardBody.append(nameRow);
}

function textarea(sentences) {
  let div1 = document.createElement("div");
  div1.setAttribute("class", "my-3");

  let label = document.createElement("label");
  label.setAttribute("class", "d-flex justify-content-between");
  label.setAttribute("for", "sentences");

  let span1 = document.createElement("span");
  span1.setAttribute("class", "text-muted");
  span1.append('');
  label.append(span1);

  let span2 = document.createElement("span");
  span2.id = "count";
  span2.append("4096 characters remaining");
  span2.setAttribute("class", "text-muted");
  label.append(span2);

  let div2 = document.createElement("div");
  div2.setAttribute("class", "card border-left-heap shadow");

  let div3 = document.createElement("div");
  div3.setAttribute("class", "card-body");

  let div4 = document.createElement("div");
  div4.setAttribute("class", "row align-items-center");

  let div5 = document.createElement("div");
  div5.setAttribute("class", "col mr-2");

  let div6 = document.createElement("div");
  div6.setAttribute("class", "row align-items-center");

  let div7 = document.createElement("div");
  div7.setAttribute("class", "col");

  let textarea = document.createElement("textarea");
  textarea.id = "sentences";
  textarea.name = "sentences";
  textarea.maxLength = 4096;
  textarea.setAttribute("class", "form-control text-input");
  textarea.rows = 10;
  textarea.autofocus = true;
  textarea.placeholder = "Insert your text here.";
  textarea.value = dto == null ? null : dto.sentences;

  div7.append(textarea);
  div6.append(div7);
  div5.append(div6);
  div4.append(div5);
  div3.append(div4);
  div2.append(div3);
  div1.append(label, div2);
  cardBody.append(div1);
}

function pageButtons() {
  let row = document.createElement("div");
  row.setAttribute("class", "d-flex mt-4");

  let leftGroup = document.createElement("div");
  leftGroup.setAttribute("class", "flex-grow-1");
  leftGroup.append(optimizeButton(), saveButton());

  let rightGroup = document.createElement("div");
  rightGroup.setAttribute("class", "me-0");
  rightGroup.append(linkCancel(), deleteButton());

  row.append(leftGroup, rightGroup);
  cardBody.append(row);
}

function optimizeButton() {
  let optimizeButton = document.createElement("button");
  optimizeButton.id = "optimizeButton";
  optimizeButton.name = "Optimize";
  optimizeButton.title = "Optimize text - one sentence per line";
  optimizeButton.type = "button";
  optimizeButton.setAttribute("style", "width: 160px");
  optimizeButton.setAttribute("class", "btn btn-outline-heap mx-4");
  optimizeButton.onclick = function () { optimizeHeapText() };
  optimizeButton.disabled = true;
  let optimizeButtonIcon = document.createElement("i");
  optimizeButtonIcon.setAttribute("class", "fab fa-leanpub me-2");
  let optimizeButtonText = document.createTextNode("Optimize Text");
  optimizeButton.append(optimizeButtonIcon, optimizeButtonText);
  return optimizeButton;
}

function saveButton() {
  let saveButton = document.createElement("button");
  saveButton.id = "saveButton";
  saveButton.name = "Save";
  saveButton.title = "Save this text";
  saveButton.setAttribute("type", "button");
  saveButton.setAttribute("style", "width: 100px");
  saveButton.setAttribute("class", "btn btn-primary mx-4");
  saveButton.onclick = function () { saveHeapText() };
  let saveButtonIcon = document.createElement("i");
  saveButtonIcon.setAttribute("class", "far fa-check-circle me-2");
  let saveButtonText = document.createTextNode("Save");
  saveButton.append(saveButtonIcon, saveButtonText);
  return saveButton;
}

function linkCancel() {
  let linkCancel = document.createElement("a");
  linkCancel.setAttribute("class", "btn btn-outline-warning me-4");
  linkCancel.setAttribute("style", "width: 100px;");
  linkCancel.title = "Cancel any changes";
  linkCancel.href = urls.textsUrl;
  let linkCancelIcon = document.createElement("i");
  linkCancelIcon.setAttribute("class", "far fa-window-close me-2");
  let linkCancelText = document.createTextNode("Cancel");
  linkCancel.append(linkCancelIcon, linkCancelText);
  return linkCancel;
}

function deleteButton() {
  let deleteButton = document.createElement("button");
  if (id === 0) {
    deleteButton.setAttribute("style", "display: none");
    deleteButton.disabled = true;
    return deleteButton;
  }

  deleteButton.setAttribute("class", "btn btn-outline-danger me-4");
  deleteButton.setAttribute("style", "width: 100px");
  deleteButton.id = "deleteButton";
  deleteButton.title = "Delete this text permanently.";
  deleteButton.onclick = function () {
    deleteThisText()
  };
  let deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "far fa-trash-alt me-2");
  let deleteText = document.createTextNode("Delete");
  deleteButton.append(deleteIcon, deleteText);
  return deleteButton;
}

function optimizeHeapText() {
  let text = document.getElementById("sentences").value;
  let sentences = text.split(/(?<=[.?!])\s+(?=[A-Z])/);
  let optimizedText = "";
  for (let sentence of sentences) {
    optimizedText += sentence + "\n";
  }
  optimizedText = optimizedText.substring(0, optimizedText.length - 1);
  document.getElementById("sentences").value = optimizedText;
}

function saveHeapText() {
  let formData = new FormData(form);
  if (!validForm(formData)) {
    return;
  }

  formData.append("id", dto ? dto.id : "0");

  if (debug) {
    console.log(JSON.stringify(Object.fromEntries(formData)));
  }

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", urls.apiHeapTextUrl);
  xhttp.setRequestHeader(csrfHeader, csrfToken);
  xhttp.send(formData);

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let savedText = JSON.parse(xhttp.responseText);
        if (savedText) {
          console.log("Text saved as: " + savedText.id);
        }
        location.href = urls.textsUrl;
      } else {
        console.log(`Failed to save this text. ${this.responseText} Response code: ${this.status}`);
        showWarning(this.responseText);
      }

      if (debug) {
        console.log(this.responseText);
      }
    }
  }
}

function validForm(formData) {
  if (isEmptyOrTooShort(formData.get("textname"), 2)) {
    showWarning("Text name is blank or too short. Min length of name is 3 characters.");
    return false;
  } else {
    removeWarning();
  }

  if (isEmptyOrTooShort(formData.get("sentences"), 10)) {
    showWarning("Text is blank or too short. Min length is 10 characters.");
    return false;
  } else {
    removeWarning();
  }

  return true;
}

function isEmptyOrTooShort(string, length) {
  return string.replace(/ /g, "").slice(0, -1).length < length;
}

function showWarning(detail) {
  let warning = displayWarning("Save", detail);
  containerUI.append(warning);
}

function removeWarning() {
  let warning = document.getElementById("warning");
  if (warning) {
    warning.remove();
  }
}

function countCharsInTextarea() {
  $("#sentences").keyup(function () {
    let chars = $(this).val().length;
    $("#count").text((4096 - chars) + " characters remaining");

    document.getElementById("optimizeButton").disabled = chars === 0;
  });
}

// There is following message in console:
// Fetch failed loading: DELETE "http://localhost:9191/api/texts/heap/72". :-(
// But it works
function deleteThisTextFetch() {
  document.getElementById("deleteButton").disabled = true;
  form = null;

  fetch(urls.apiHeapTextUrl + "/" + id, {
    method: methods.DELETE,
    headers: httpHeaders()
  })
  .then(function (response) {
    if (response.ok) {
      window.location.assign(urls.textsUrl);
    } else {
      console.log(response.status);
      console.log(response.json());
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}


function deleteThisText() {
  document.getElementById("deleteButton").disabled = true;
  form = null;

  let xhttp = new XMLHttpRequest();
  xhttp.open(methods.DELETE, urls.apiHeapTextUrl + "/" + id);
  xhttp.setRequestHeader(csrfHeader, csrfToken);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        window.location.assign(urls.textsUrl);
      } else {
        console.log("Response status: " + this.status);
        console.log(this.responseText);
      }
    }
  }
}

