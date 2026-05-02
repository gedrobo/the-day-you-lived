const dayData = [
  { label: "Song of the week", value: '"The Millennium Prayer" — Cliff Richard' },
  { label: "On at the cinema", value: "Toy Story 2" },
  { label: "News headline", value: "Yeltsin resigns; Vladimir Putin becomes acting Russian president" },
  { label: "Price of a pint of milk", value: "About 34p" },
  { label: "Quiet, unexpected fact", value: "Google was 16 months old and had around 40 employees." }
];

const form = document.querySelector(".date-form");
const resultsEl = document.getElementById("results");

function render() {
  resultsEl.innerHTML = dayData
    .map(item => `
      <div class="result-item">
        <p class="result-label">${item.label}</p>
        <p class="result-value">${item.value}</p>
      </div>
    `)
    .join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  render();
});
