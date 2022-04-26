let body = document.getElementsByTagName("body").item(0)
let anchors = document.getElementsByTagName("a")
// codeElements already defined in main.js

const setDarkModeCookie = function () {
  document.cookie = "darkmode=true;" + " max-age=" + 3600 * 24 * 7 + "; Secure"
}

const unsetDarkModeCookie = function () {
  document.cookie = "darkmode=false; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure"
}

const darkModeCookieIsSet = function () {
  if (document.cookie == "darkmode=true") {
    return true
  } else return false
}

const makeDarkMode = function () {
  body.classList.add("dark-mode")
  for (let i = 0; i < codeElements.length; i++) {
    codeElements.item(i).classList.add("dark-mode")
  }
  for (let i = 0; i < anchors.length; i++) {
    anchors.item(i).classList.add("dark-mode")
  }
}

const makeLightMode = function () {
  body.classList.remove("dark-mode")
  for (let i = 0; i < codeElements.length; i++) {
    codeElements.item(i).classList.remove("dark-mode")
  }
  for (let i = 0; i < anchors.length; i++) {
    anchors.item(i).classList.remove("dark-mode")
  }
}

const readDarkModeCookie = function () {
  if (darkModeCookieIsSet()) {
    makeDarkMode()
    document.getElementById("toggle-switch").checked = true
  } else {
    makeLightMode()
    document.getElementById("toggle-switch").checked = false
  }
}

const toggleDarkMode = function () {
  if (darkModeCookieIsSet()) {
    makeLightMode()
    unsetDarkModeCookie()
  } else {
    makeDarkMode()
    setDarkModeCookie()
  }
}

readDarkModeCookie()
