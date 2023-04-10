import {assemblyContextAndUrls, generateHeader, getCsrfToken} from "./header.js";

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
