export let csrf = {
  token: ""
}

export function getCsrfToken() {
  const csrfNodes = document.getElementsByName("_csrf");
  if (csrfNodes != null && csrfNodes[0] != null) {
    csrf.token = csrfNodes[0].value;
  }
}

let contextPath = document.getElementById("contextPath").value;

export let urls = {
  registrationUrlGet: contextPath + "/registration",
  registrationUrlPost: contextPath +  "/pub/registration",
  loginUrlGet: contextPath +  "/login",
  loginUrlPost: contextPath +  "/pub/login",
  logoutUrl: contextPath +  "/logout",
  textsUrl: contextPath +  "/texts",
  getTextsUrl: contextPath +  "/api/texts",
  heapTextUrl: contextPath +  "/api/texts/heap",
  profileUrl: contextPath +  "/profile"
};

export let links = {
  home: "Home",
  login: "Login",
  registration: "Registration",
  profile: "Profile",
  texts: "Texts"
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
  formLogout.action = urls.logoutUrl;

  let csrfInput = document.createElement("input");
  csrfInput.id = "csrfLogout";
  csrfInput.type = "hidden";
  csrfInput.name = "_csrf";
  csrfInput.value = csrf.token;

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
  aRegistration.href = urls.registrationUrlGet;
  aRegistration.title = "Registration";
  let aRegistrationText = document.createTextNode("Registration");
  aRegistration.append(aRegistrationText);

  divLinks.append(aRegistration);
}

function addLinkLogin(divLinks) {
  let aLogin = document.createElement("a");
  aLogin.id = "aLogin";
  aLogin.setAttribute( "class", "h6 text-primary" );
  aLogin.href = urls.loginUrlGet;
  aLogin.title = "Home";
  let aLoginText = document.createTextNode("Login");
  aLogin.append(aLoginText);

  divLinks.append(aLogin);
}

function addLinkTexts(divLinks) {
  let aTexts = document.createElement("a");
  aTexts.id = "aTexts";
  aTexts.setAttribute( "class", "h6 text-info" );
  aTexts.href = urls.textsUrl;
  aTexts.title = "Texts";
  let aTextsText = document.createTextNode("Texts");
  aTexts.append(aTextsText);

  divLinks.append(aTexts);
}

function addLinkProfile(divLinks) {
  let aProfile = document.createElement("a");
  aProfile.id = "aProfile";
  aProfile.setAttribute( "class", "h6 color-register" );
  aProfile.href = urls.profileUrl;
  aProfile.title = "Profile";
  let aProfileText = document.createTextNode("Profile");
  aProfile.append(aProfileText);

  divLinks.append(aProfile);
}

function logout() {
  document.forms["formLogout"].submit();
}

export function createContainerUI() {
  let containerUI = document.createElement("div");
  containerUI.id = "containerUI";
  containerUI.setAttribute("class", "container");
  document.body.append(containerUI);
  return containerUI;
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
