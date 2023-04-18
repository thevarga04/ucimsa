import {assemblyContextAndUrls, csrf, displayWarning, generateHeader, getCsrfToken, urls} from "./common.js";

let containerUI;

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  assemblyContextAndUrls();
  generateHeader();
  generateUI();
});

function generateUI() {
  containerUI = document.createElement("div");
  containerUI.id = "containerUI";
  containerUI.setAttribute("class", "container");
  document.body.append(containerUI);


  let formFrame = document.createElement("form");
  formFrame.id = "form";
  formFrame.setAttribute("method", "POST");
  formFrame.setAttribute("class", "form-signin");

  let formGroup = document.createElement("div");
  formGroup.setAttribute("class", "form-group d-grid col-10 mx-auto");

  let formHeading = document.createElement("h2");
  formHeading.setAttribute("class", "form-heading");
  formHeading.append("Log in");

  let message = document.createElement("span");
  message.append("");
  message.id = "message";

  let username = document.createElement("input");
  username.id = "username";
  username.name = "username";
  username.type = "text";
  username.placeholder = "Email Address";
  username.maxLength = 64;
  username.autofocus = true;
  username.setAttribute("class", "form-control");

  let password = document.createElement("input");
  password.id = "password";
  password.name = "password";
  password.type = "password";
  password.placeholder = "Password";
  password.maxLength = 32;
  password.setAttribute("class", "form-control");

  let csrfInput = document.createElement("input");
  csrfInput.id = "csrfLogin";
  csrfInput.type = "hidden";
  csrfInput.name = "_csrf";
  csrfInput.value = csrf.token;

  let error = document.createElement("span");
  error.append("");
  error.id = "error";

  let submit = document.createElement("button");
  submit.id = "submit";
  submit.name = "submit";
  submit.type = "button";
  submit.title = "Log in";
  submit.append("Log In");
  submit.setAttribute("class", "btn btn-lg btn-primary");
  submit.onclick = function () { submitLogin() };


  formGroup.append(formHeading, message, username, password, csrfInput, error, submit);
  formFrame.append(formGroup);
  containerUI.append(formFrame);
}

function submitLogin() {
  let form = document.getElementById("form");
  let formData = new FormData(form);

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", urls.loginUrlPost);
  xhttp.send(formData);

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log(this.responseText);
        location.href = "/";
      } else {
        console.log(`Login failed. ${this.responseText} Response code: ${this.status}`);
        let warning = displayWarning("Login", this.responseText);
        containerUI.append(warning);
      }
    }
  }
}
