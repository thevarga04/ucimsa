export let csrfHeader = "X-CSRF-Token";
export let csrfToken = "";

export let debug = true;

export function getCsrfToken() {
  const csrfNodes = document.getElementsByName("_csrf");
  if (csrfNodes != null && csrfNodes[0] != null) {
    csrfToken = csrfNodes[0].value;
  }
}

export let methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
}

export function httpHeaders() {
  const headers = new Headers();
  headers.append(csrfHeader, csrfToken);
  return headers;
}

let contextPath = document.getElementById("contextPath").value;

export let lessons = {
  SPLIT: "splitSentences",                  // into multiple pairs, triplets or 1/4 parts
  FIND_MISTAKE: "findMistake",              // identify wrong words and choose correct ones from given list
  ASSEMBLY_SENTENCE: "assemblySentence",    // shuffled words
  FILL_BLANKS: "fillBlanks"                 // from shuffled letters
}

export let paths = {
  registrationUrlGet: contextPath +             "/registration",
  registrationUrlPost: contextPath +            "/pub/registration",
  loginUrlGet: contextPath +                    "/login",
  loginUrlPost: contextPath +                   "/pub/login",
  logoutUrl: contextPath +                      "/logout",
  profileUrl: contextPath +                     "/profile",
  textsUrl: contextPath +                       "/texts",
  apiTextsUrl: contextPath +                    "/api/texts",
  heapTextUrl: contextPath +                    "/texts/heapText",
  apiHeapTextUrl: contextPath +                 "/api/texts/heapText",
  chooseLessonTypeUrl: contextPath +            "/learn/chooseLessonType",
  statsUrl: contextPath +                       "/texts/stats",
  learnOptionsSplitSentencesUrl: contextPath +  "/learn/optionsSplitSentences",
  apiLearnOptionsSplitSentences: contextPath +  "/api/learn/options/splitSentences",
  learnLessonSplitSentencesUrl: contextPath +   "/learn/lessonSplitSentences",
  apiLearnInquirySplitSentences: contextPath +  "/api/learn/inquiry/splitSentences",
  apiStatsSplitSentences: contextPath +         "/api/stats/splitSentences"
};

export let links = {
  home: "Home",
  login: "Login",
  registration: "Registration",
  profile: "Profile",
  texts: "Texts"
}

export let params = {
  TEXT_ID: "textId",
  TYPE: "type",
  LESSON_ID: "lessonId",
}

export let baseUrl = `${window.location.protocol}//${window.location.host}`;

export function anUrl(aPath, mapOfSearchParams) {
  let url = new URL(baseUrl + aPath);
  for (let [key, value] of mapOfSearchParams) {
    url.searchParams.set(key, value);
  }
  return url.href;
}

let signOn = false;

export function generateHeader() {
  let containerHeader = document.createElement("div");
  containerHeader.id = "containerHeader";
  containerHeader.setAttribute("class", "container");
  document.body.append(containerHeader);

  let divHeader = document.createElement("div");
  divHeader.id = "divHeader";
  divHeader.setAttribute("class", "grid d-flex justify-content-between");

  let divLogout = document.createElement("div");
  divLogout.setAttribute("class", "d-flex col-auto");

  let formLogout = document.createElement("form");
  formLogout.id = "formLogout";
  formLogout.method = "POST";
  formLogout.action = paths.logoutUrl;

  let csrfInput = document.createElement("input");
  csrfInput.id = "csrfLogout";
  csrfInput.type = "hidden";
  csrfInput.name = "_csrf";
  csrfInput.value = csrfToken;

  let userPrincipalName = document.getElementById("userPrincipalName");

  let aLogout = document.createElement("a");
  if (userPrincipalName == null || !userPrincipalName.value) {
    aLogout.style.display = "none";
  } else {
    signOn = true;
    aLogout.id = "aLogout";
    aLogout.title = "Logout";
    aLogout.setAttribute("class", "h6 text-warning");
    aLogout.setAttribute("style", "cursor: pointer; text-decoration: none !important");
    aLogout.onclick = function () { logout() };
    let aLogoutText = document.createTextNode("Logout " + userPrincipalName.value);
    aLogout.append(aLogoutText);
  }

  formLogout.append(csrfInput);
  divLogout.append(formLogout, aLogout);
  // divLogout.append(aLogout);


  let divLinks = document.createElement("div");
  divLinks.setAttribute("class", "d-flex col-auto gap-5");

  if (signOn) {
    signOnLinks(divLinks);
  } else {
    signOffLinks(divLinks);
  }

  divHeader.append(divLogout, divLinks);
  containerHeader.append(divHeader);
}

function signOnLinks(divLinks) {
  addLinkHome(divLinks);
  addLinkTexts(divLinks);
  addLinkProfile(divLinks);
}

function signOffLinks(divLinks) {
  addLinkHome(divLinks);
  addLinkRegistration(divLinks);
  addLinkLogin(divLinks);
}

function addLinkHome(divLinks) {
  let aHome = document.createElement("a");
  aHome.id = "aHome";
  aHome.setAttribute( "class", "h6 text-secondary" );
  aHome.href = contextPath + "/";
  aHome.title = "Home";
  let aHomeText = document.createTextNode("Home");
  aHome.append(aHomeText);

  divLinks.append(aHome);
}

function addLinkRegistration(divLinks) {
  let aRegistration = document.createElement("a");
  aRegistration.id = "aRegistration";
  aRegistration.setAttribute( "class", "h6 color-register" );
  aRegistration.href = paths.registrationUrlGet;
  aRegistration.title = "Registration";
  let aRegistrationText = document.createTextNode("Registration");
  aRegistration.append(aRegistrationText);

  divLinks.append(aRegistration);
}

function addLinkLogin(divLinks) {
  let aLogin = document.createElement("a");
  aLogin.id = "aLogin";
  aLogin.setAttribute( "class", "h6 text-primary" );
  aLogin.href = paths.loginUrlGet;
  aLogin.title = "Home";
  let aLoginText = document.createTextNode("Login");
  aLogin.append(aLoginText);

  divLinks.append(aLogin);
}

function addLinkTexts(divLinks) {
  let aTexts = document.createElement("a");
  aTexts.id = "aTexts";
  aTexts.setAttribute( "class", "h6 text-info" );
  aTexts.href = paths.textsUrl;
  aTexts.title = "Texts";
  let aTextsText = document.createTextNode("Texts");
  aTexts.append(aTextsText);

  divLinks.append(aTexts);
}

function addLinkProfile(divLinks) {
  let aProfile = document.createElement("a");
  aProfile.id = "aProfile";
  aProfile.setAttribute( "class", "h6 color-register" );
  aProfile.href = paths.profileUrl;
  aProfile.title = "Profile";
  let aProfileText = document.createTextNode("Profile");
  aProfile.append(aProfileText);

  divLinks.append(aProfile);
}

function logout() {
  document.forms["formLogout"].submit();
}

export function appendContainerUI(containerUI) {
  containerUI.id = "containerUI";
  document.body.append(containerUI);
}

export function displayWarning(action, responseText) {
  let warning = document.getElementById("warning");
  if (warning == null) {
    warning = document.createElement("div");
    warning.id = "warning";
    warning.setAttribute("class", "container");
  }

  while (warning.firstChild) {
    warning.removeChild(warning.lastChild);
  }

  let note = document.createElement("div");
  note.setAttribute("class", "text-danger mt-2");
  note.innerHTML = `${action} has failed due: ${responseText}`;
  warning.append(note);
  return warning;
}


export function logResponseAndStatus(responseText, status) {
  if (debug) {
    console.log("ResponseText: " + responseText);
    console.log("Status: " + status);
  }
}

export function getParamNumberValueFromUrl(id) {
  let aValue = new URLSearchParams(window.location.search).get(id);
  if (aValue != null) {
    let aNumber = parseInt(aValue, 10);
    if (!isNaN(aNumber)) {
      return aNumber;
    }
  }
  return null;
}

export function aDiv(aClass, aStyle) {
  let aDiv = document.createElement("div");
  aDiv.setAttribute("class", aClass);
  if (aStyle) {
    aDiv.setAttribute("style", aStyle);
  }
  return aDiv;
}

export function aForm(anId, aClass, aStyle) {
  let aForm = document.createElement("form");
  aForm.id = anId;
  if (aClass) {
    aForm.setAttribute("class", aClass);
  }
  if (aStyle) {
    aForm.setAttribute("style", aStyle);
  }
  return aForm;
}

export function aLabel(aClass, aStyle) {
  let aLabel = document.createElement("label");
  aLabel.setAttribute("class", aClass);
  if (aStyle) {
    aLabel.setAttribute("style", aStyle);
  }
  return aLabel;
}

export function aSpan(aClass, aText) {
  let aSpan = document.createElement("span");
  aSpan.setAttribute("class", aClass);
  aSpan.append(aText);
  return aSpan;
}


export function theTitle(cardBody, titleWording) {
  let legend = document.createElement("div");
  legend.id = "header";
  legend.setAttribute("class", "row myLegend mx-2 mb-3");
  legend.append(titleWording);

  cardBody.append(legend);
}

export function appendix(cardBody, form, card, containerUI) {
  form.append(cardBody);
  card.append(form);
  containerUI.append(card);
}
