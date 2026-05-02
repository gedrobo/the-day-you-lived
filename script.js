const staticData = [
  { label: "Song of the week", value: '"The Millennium Prayer" — Cliff Richard' },
  { label: "On at the cinema", value: "Toy Story 2" },
  { label: "Price of a pint of milk", value: "About 34p" },
  { label: "Quiet, unexpected fact", value: "Google was 16 months old and had around 40 employees." }
];

const form = document.querySelector(".date-form");
const dateInput = document.getElementById("date-input");
const resultsEl = document.getElementById("results");

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showMessage(text) {
  resultsEl.innerHTML = `<p class="results-message">${escapeHtml(text)}</p>`;
}

function renderItems(items) {
  resultsEl.innerHTML = items
    .map(item => `
      <div class="result-item">
        <p class="result-label">${item.label}</p>
        <p class="result-value">${item.value}</p>
      </div>
    `)
    .join("");
}

async function fetchHistoricalEvent(month, day) {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Wikipedia returned status ${response.status}`);
  }
  const data = await response.json();
  if (!data.events || data.events.length === 0) {
    return null;
  }
  const random = data.events[Math.floor(Math.random() * data.events.length)];
  return `${random.year} — ${escapeHtml(random.text)}`;
}

async function handleSubmit(event) {
  event.preventDefault();

  const dateValue = dateInput.value;
  if (!dateValue) {
    showMessage("Pick a date first.");
    return;
  }

  const [, month, day] = dateValue.split("-");

  showMessage("Reading from Wikipedia…");

  try {
    const historicalEvent = await fetchHistoricalEvent(month, day);

    if (!historicalEvent) {
      showMessage("No events found for this day.");
      return;
    }

    const items = [
      staticData[0],
      staticData[1],
      { label: "On this day in history", value: historicalEvent },
      staticData[2],
      staticData[3]
    ];

    renderItems(items);
  } catch (error) {
    console.error("Failed to fetch from Wikipedia:", error);
    showMessage("Couldn't reach Wikipedia right now. Try again in a moment.");
  }
}

form.addEventListener("submit", handleSubmit);
