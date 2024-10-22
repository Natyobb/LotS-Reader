"use strict";
const chapters = [
  "Prologue",
  "Chapter 1",
  "Chapter 2",
  "Chapter 3",
  "Chapter 4",
  "Chapter 5",
  "Chapter 6",
  "Chapter 7",
  "The End"
];
const folderName = "LotS Full";
/** @type {HTMLSelectElement} */
const chapterSelect = document.querySelector("#chapterselect");
/** @type {HTMLSelectElement} */
const subChapterSelect = document.querySelector("#subchapterselect");
/** @type {HTMLButtonElement} */
const prevButton = document.querySelector("#prev-chapter");
/** @type {HTMLButtonElement} */
const nextButton = document.querySelector("#next-chapter");
const iframe = document.querySelector("iframe");
/** @type {NodeListOf<HTMLDivElement>}*/
let premables;
/** @type {HTMLDivElement} */
const contents = document.querySelector("div#contents");
/** @type {HTMLDivElement} */
const loader = document.querySelector("div#loader");

function onChapterSelect() {
  iframe.src = chapterSelect.value;
  toggleLoader();
  iframe.onload = () => {
    loadSubChapters();
    toggleLoader();
    updateButtons();
  };
}
function onSubChapterSelect() {
  premables[subChapterSelect.selectedIndex].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
function loadChapters() {
  for (const chapter of chapters) {
    const option = document.createElement("option");
    option.text = chapter;
    option.value = `${folderName}/${chapter}.html`;
    chapterSelect.appendChild(option);
  }
  chapterSelect.selectedIndex = 0;
}
function loadSubChapters() {
  premables =
    iframe.contentWindow.document.body.querySelectorAll("div.preamble");
  while (subChapterSelect.firstChild) {
    subChapterSelect.removeChild(subChapterSelect.lastChild);
  }
  premables.forEach((_premable, index) => {
    const option = document.createElement("option");
    option.text = `Sub-Chapter ${index + 1}`;
    option.value = index;
    subChapterSelect.appendChild(option);
  });
  subChapterSelect.selectedIndex = 0;
}
/** @param {'next' | 'prev'} action */
function onButtonClick(action) {
  switch (action) {
    case "next":
      chapterSelect.selectedIndex++;
      break;
    case "prev":
      chapterSelect.selectedIndex--;
      break;
  }
  onChapterSelect();
}

function scrollToggle() {
  iframe.classList.toggle("noscroll");
}
window.addEventListener("load", () => {
  addListeners();
  loadChapters();
  onChapterSelect();
});

function addListeners() {
  chapterSelect.addEventListener("change", onChapterSelect);
  subChapterSelect.addEventListener("change", onSubChapterSelect);
  nextButton.addEventListener("click", () => onButtonClick("next"));
  prevButton.addEventListener("click", () => onButtonClick("prev"));
}

function toggleLoader() {
  iframe.classList.toggle("hidden");
  loader.classList.toggle("hidden");
  document.querySelector("div.selector").classList.toggle("hidden");
}

function updateButtons() {
  /** @type {HTMLButtonElement} */
  const prevButton = document.querySelector("button#prev-chapter");
  /** @type {HTMLButtonElement} */
  const nextButton = document.querySelector("button#next-chapter");
  prevButton.removeAttribute("disabled");
  nextButton.removeAttribute("disabled");
  if (chapterSelect.selectedIndex === 0) {
    prevButton.setAttribute("disabled", "true");
  } else if (chapterSelect.selectedIndex === chapters.length - 1) {
    nextButton.setAttribute("disabled", "true");
  }
}
