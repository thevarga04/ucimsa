import {aDiv, aForm, getCsrfToken, headerAboveContainerUI} from "./common.js";

let containerUI = aDiv("container");
let card = aDiv("card mt-3");
let form = aForm("form");
let cardBody = aDiv("card-body");

// Generate the UI after page load is complete
// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  headerAboveContainerUI();
  generateUI();
});

function generateUI() {
  let x = "";


}
