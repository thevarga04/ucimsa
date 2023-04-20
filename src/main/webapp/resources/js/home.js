import {assemblyContextAndUrls, generateHeader, getCsrfToken} from "./common.js";

let containerUI;

// Generate the UI after page load is complete
$(document).ready(function () {
  getCsrfToken();
  assemblyContextAndUrls();
  generateHeader();
  generateUI();
});

function generateUI() {
  // ...
}
