import {createContainerUI, csrfToken, displayWarning, generateHeader, getCsrfToken, paths} from "./common.js";

let containerUI = document.createElement("div");

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  generateHeader();
  generateUI();
});

function generateUI() {
  createContainerUI(containerUI);

  let formFrame = document.createElement("form");
  formFrame.id = "form";
  formFrame.setAttribute("method", "POST");
  formFrame.setAttribute("class", "form-signin");

  let header = document.createElement("h2");
  header.setAttribute("class", "form-signin-heading");
  header.append("Create your account");

  let smallNote = document.createElement( "small" );
  smallNote.append("All fields are Mandatory.");

  let divRowNames = document.createElement("div");
  divRowNames.setAttribute("class", "row form-group g-2");

  let divFirstname = document.createElement("div");
  divFirstname.id = "divFirstname";
  divFirstname.setAttribute("class", "col-md");

  let firstname = document.createElement("input");
  firstname.id = "firstname";
  firstname.name = "firstname";
  firstname.type = "text";
  firstname.placeholder = "Firstname";
  firstname.maxLength = 32;
  firstname.autofocus = true;
  firstname.setAttribute("class", "form-control");

  let divLastname = document.createElement("div");
  divLastname.id = "divLastname";
  divLastname.setAttribute("class", "col-md");

  let lastname = document.createElement("input");
  lastname.id = "lastname";
  lastname.name = "lastname";
  lastname.type = "text";
  lastname.placeholder = "Lastname";
  lastname.maxLength = 32;
  lastname.setAttribute("class", "form-control");

  let divUsername = document.createElement("div");
  divUsername.id = "divUsername";
  divUsername.setAttribute("class", "col-md");

  let username = document.createElement("input");
  username.id = "username";
  username.name = "username";
  username.type = "email";
  username.placeholder = "Email Address";
  username.maxLength = 64;
  username.setAttribute("class", "form-control");

  let divPassword = document.createElement("div");
  divPassword.id = "divPassword";
  divPassword.setAttribute("class", "col-md");

  let password = document.createElement("input");
  password.id = "password";
  password.name = "password";
  password.type = "password";
  password.placeholder = "Password";
  password.maxLength = 32;
  password.setAttribute("class", "form-control");

  let divConfirm = document.createElement("div");
  divConfirm.id = "divConfirm";
  divConfirm.setAttribute("class", "col-md");

  let confirm = document.createElement("input");
  confirm.id = "confirm";
  confirm.name = "confirm";
  confirm.type = "password";
  confirm.placeholder = "Confirm your password";
  confirm.maxLength = 32;
  confirm.setAttribute("class", "form-control");

  let csrfInput = document.createElement("input");
  csrfInput.id = "csrfRegistration";
  csrfInput.type = "hidden";
  csrfInput.name = "_csrf";
  csrfInput.value = csrfToken;

  let submit = document.createElement("button");
  submit.id = "submit";
  submit.name = "submit";
  submit.type = "button";
  submit.title = "Submit";
  submit.append("Submit");
  submit.setAttribute("class", "btn btn-lg btn-primary col-12");
  submit.onclick = function () { submitRegister() };

  divFirstname.append(firstname);
  divLastname.append(lastname);
  divRowNames.append(divFirstname, divLastname);
  divUsername.append(username);
  divPassword.append(password);
  divConfirm.append(confirm);
  formFrame.append(header, smallNote, divRowNames, divUsername, divPassword, divConfirm, csrfInput, submit);
  containerUI.append(formFrame);
}

function submitRegister() {
  let form = document.getElementById("form");
  let formData = new FormData(form);
  formData.set("id", "0");
  formData.set("activated", "false");
  formData.delete("roles");
  formData.delete("confirm");

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", paths.registrationUrlPost);
  xhttp.send(formData);

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log(this.responseText);
        location.href = "/";
      } else {
        console.log(`Registration has failed. ${this.responseText} Response code: ${this.status}`);
        let warning = displayWarning("Registration", this.responseText);
        containerUI.append(warning);
      }
    }
  }
}
