const preElements = document.getElementsByTagName("pre")
const codeElements = document.getElementsByTagName("code")
const container = document.getElementById("container")
const headerElements = [
  ...container.getElementsByTagName("h1"),
  ...container.getElementsByTagName("h2"),
  ...container.getElementsByTagName("h3"),
  ...container.getElementsByTagName("h4"),
  ...container.getElementsByTagName("h5"),
]
const main = document.getElementById("main")
const tableOfContents = document.getElementById("contents-list")

const styleCodeBlocks = function () {
  for (let i = 0; i < codeElements.length; i++) {
    codeElements.item(i).classList.add("language-javascript")
    if (codeElements.item(i).parentElement.tagName != "PRE") {
      codeElements.item(i).classList.add("inline")
    }
  }
}

const makeFragmentID = function (headerText) {
  fragmentID = headerText.trim().toLowerCase()
  fragmentID = fragmentID.replaceAll(": ", "-")
  fragmentID = fragmentID.replaceAll("?", "")
  fragmentID = fragmentID.replaceAll("'", "")
  fragmentID = fragmentID.replaceAll(" ", "-")
  return fragmentID
}

const addFragmentIdentifiers = function () {
  for (let i = 0; i < headerElements.length; i++) {
    let fragmentID = makeFragmentID(headerElements[i].innerText)
    let a = document.createElement("a")
    a.href = "#" + fragmentID
    headerElements[i].id = fragmentID
    headerElements[i].appendChild(a)
    headerElements[i].parentElement.classList.add("section-" + headerElements[i].tagName.toLowerCase())
  }
}

const getChildSections = function (section) {
  return [...section.children].filter((child) => child.tagName == "SECTION")
}

const buildList = function (section = main, list = "") {
  let childSections = getChildSections(section)
  if (section.tagName != "MAIN") {
    list += `<li class="level-${parseInt(section.firstElementChild.tagName.charAt(1)) - 1}"><a href="#${section.firstElementChild.id}">${section.firstElementChild.innerText}</a>`
  }
  if (childSections.length > 0) {
    list += "<ol>"
    for (let i = 0; i < childSections.length; i++) {
      list += buildList(childSections[i])
    }
    list += "</ol>"
  }
  list += "</li>"
  return list
}

const makeTableOfContents = function () {
  tableOfContents.innerHTML = buildList()
}

styleCodeBlocks()
addFragmentIdentifiers()
makeTableOfContents()
