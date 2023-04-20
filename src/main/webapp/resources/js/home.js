import {assemblyContextAndUrls, generateHeader, getCsrfToken, links} from "./common.js";

let debug = true;
let containerUI;
let card = document.createElement("div");
let form = document.createElement("form");
let cardBody = document.createElement("div");

// Generate the UI after page load is complete
// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  assemblyContextAndUrls();
  generateHeader(links.home);
  generateUI();
});

function generateUI() {

}
