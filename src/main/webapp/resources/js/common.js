export let csrf = {
  token: ""
}

export function getCsrfToken() {
  const csrfNodes = document.getElementsByName("_csrf");
  if (csrfNodes != null && csrfNodes[0] != null) {
    csrf.token = csrfNodes[0].value;
  }
}

export let urls = {
  contextPath: '',
  registrationUrlGet: "/registration",
  registrationUrlPost: "/pub/registration",
  loginUrlGet: "/login",
  loginUrlPost: "/pub/login",
  logoutUrl: "/logout",
  textsUrl: "/texts",
  heapTextUrl: "/api/texts/heap"
};

export function assemblyContextAndUrls() {
  urls.contextPath = document.getElementById("contextPath").value;
  urls.registrationUrlGet = urls.contextPath + urls.registrationUrlGet;
  urls.registrationUrlPost = urls.contextPath + urls.registrationUrlPost;
  urls.loginUrlGet = urls.contextPath + urls.loginUrlGet;
  urls.loginUrlPost = urls.contextPath + urls.loginUrlPost;
  urls.logoutUrl = urls.contextPath + urls.logoutUrl;
  urls.textsUrl = urls.contextPath + urls.textsUrl;
  urls.heapTextUrl = urls.contextPath + urls.heapTextUrl;
}

  export let links = {
  home: "Home",
  login: "Login",
  registration: "Registration",
  profile: "Profile",
  texts: "Texts"
}

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
    aLogout.id = "aLogout";
    aLogout.title = "Logout";
    aLogout.setAttribute("class", "h6 text-warning");
    aLogout.setAttribute("style", "cursor: pointer; text-decoration: none !important");
    aLogout.onclick = function () { logout() };
    let aLogoutText = document.createTextNode("Logout " + userPrincipalName.value);
    aLogout.append(aLogoutText);
  }

  let divLinks = document.createElement("div");
  divLinks.setAttribute("class", "d-flex col-auto gap-5");

  let aHome = document.createElement("a");
  aHome.id = "aHome";
  aHome.setAttribute( "class", "h6 text-secondary" );
  aHome.href = urls.contextPath + "/";
  aHome.title = "Home";
  let aHomeText = document.createTextNode("Home");
  aHome.append(aHomeText);

  let aLogin = document.createElement("a");
  aLogin.id = "aLogin";
  aLogin.setAttribute( "class", "h6 text-primary" );
  aLogin.href = urls.loginUrlGet;
  aLogin.title = "Home";
  let aLoginText = document.createTextNode("Login");
  aLogin.append(aLoginText);

  let aRegistration = document.createElement("a");
  aRegistration.id = "aRegistration";
  aRegistration.setAttribute( "class", "h6 color-register" );
  aRegistration.href = urls.registrationUrlGet;
  aRegistration.title = "Registration";
  let aRegistrationText = document.createTextNode("Registration");
  aRegistration.append(aRegistrationText);

  formLogout.append(csrfInput);
  divLogout.append(formLogout, aLogout);
  divLinks.append(aHome, aRegistration, aLogin);
  divHeader.append(divLogout, divLinks);
  containerHeader.append(divHeader);
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
