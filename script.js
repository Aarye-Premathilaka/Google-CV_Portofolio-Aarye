const query = "Best candidate for your Lehrstelle as Informatiker Applikationsentwicklung EFZ at Google Schweiz GmbH";
const input = document.querySelector("#searchInput");
const form = document.querySelector("#searchForm");
const button = document.querySelector("#searchButton");
const intro = document.querySelector("#introScreen");
const cv = document.querySelector("#cvScreen");
const statusText = document.querySelector("#statusText");
const loadingDots = document.querySelector("#loadingDots");

let index = 0;
let isTransitioning = false;
let typingTimer;

function typeQuery() {
  input.value = query.slice(0, index);
  index += 1;

  if (index <= query.length) {
    typingTimer = window.setTimeout(typeQuery, 34);
    return;
  }

  statusText.textContent = "Press Enter or click the blue search button.";
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function revealCv() {
  if (isTransitioning) return;

  isTransitioning = true;
  window.clearTimeout(typingTimer);
  input.value = input.value.trim() || query;
  input.blur();
  input.disabled = true;
  button.disabled = true;
  statusText.classList.remove("is-match");
  statusText.textContent = "Searching…";
  loadingDots.hidden = false;

  await wait(950);
  loadingDots.hidden = true;
  statusText.textContent = "Best match found: Aarye Premathilaka";
  statusText.classList.add("is-match");

  await wait(1050);
  intro.classList.add("is-leaving");

  await wait(540);
  intro.hidden = true;
  cv.hidden = false;
  cv.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  revealCv();
});

input.addEventListener("focus", () => {
  if (!isTransitioning && input.value.length === query.length) {
    input.select();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  input.focus({ preventScroll: true });
  typeQuery();
});
