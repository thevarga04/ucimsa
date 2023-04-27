import {generateHeader, getCsrfToken} from "../common.js";

let debug = true;
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

}
