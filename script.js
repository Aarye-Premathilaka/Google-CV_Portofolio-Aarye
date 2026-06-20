const query = "Best candidate for your Lehrstelle as Informatiker Applikationsentwicklung EFZ at Google Schweiz GmbH";
const input = document.querySelector("#searchInput");
const button = document.querySelector("#searchButton");
const intro = document.querySelector("#introScreen");
const cv = document.querySelector("#cvScreen");
const statusText = document.querySelector("#statusText");
const loadingDots = document.querySelector("#loadingDots");

let index = 0;

function typeQuery() {
  input.value = query.slice(0, index);
  index += 1;

  if (index <= query.length) {
    window.setTimeout(typeQuery, 42);
    return;
  }

  statusText.textContent = "Ready to search the CV.";
  button.hidden = false;
  button.focus({ preventScroll: true });
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function revealCv() {
  button.disabled = true;
  statusText.textContent = "Searching";
  loadingDots.hidden = false;

  await wait(950);
  statusText.textContent = "Result found: Aarye Premathilaka";

  await wait(850);
  intro.classList.add("is-leaving");

  await wait(520);
  intro.hidden = true;
  cv.hidden = false;
  cv.scrollIntoView({ behavior: "smooth", block: "start" });
}

input.addEventListener("keydown", (event) => event.preventDefault());
input.addEventListener("paste", (event) => event.preventDefault());
button.addEventListener("click", revealCv);

window.addEventListener("DOMContentLoaded", typeQuery);
