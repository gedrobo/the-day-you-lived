const form = document.querySelector(".date-form");
const dateInput = document.getElementById("date-input");
const resultsEl = document.getElementById("results");
const exampleButtons = document.querySelectorAll(".example-date");

let userLocation = null;

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

function formatYear(year) {
  return year < 0 ? `${-year} BCE` : `${year}`;
}

function formatMasthead(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const day = date.getDate();
  const monthName = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${monthName} ${year}`;
}

async function detectLocation() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) throw new Error(`ipapi.co returned ${response.status}`);
    const data = await response.json();
    if (data.latitude == null || data.longitude == null) {
      throw new Error("ipapi.co returned no coordinates");
    }
    userLocation = {
      lat: data.latitude,
      lng: data.longitude,
      city: data.city || "your area"
    };
  } catch (error) {
    console.warn("Could not detect location:", error);
    userLocation = null;
  }
}

const locationReady = detectLocation();

async function fetchHistoricalEvent(month, day) {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Wikipedia /events returned ${response.status}`);
  const data = await response.json();
  if (!data.events?.length) return null;
  const random = data.events[Math.floor(Math.random() * data.events.length)];
  return `${formatYear(random.year)} — ${escapeHtml(random.text)}`;
}

async function fetchBirth(month, day) {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${month}/${day}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Wikipedia /births returned ${response.status}`);
  const data = await response.json();
  if (!data.births?.length) return null;
  const random = data.births[Math.floor(Math.random() * data.births.length)];
  return `${formatYear(random.year)} — ${escapeHtml(random.text)}`;
}

async function fetchHoliday(month, day) {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/holidays/${month}/${day}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Wikipedia /holidays returned ${response.status}`);
  const data = await response.json();
  if (!data.holidays?.length) return null;
  const random = data.holidays[Math.floor(Math.random() * data.holidays.length)];
  return escapeHtml(random.text);
}

async function fetchWeather(dateString, location) {
  if (!location) return null;
  const year = parseInt(dateString.split("-")[0], 10);
  if (year < 1940) return null;

  const url = `https://archive-api.open-meteo.com/v1/archive`
    + `?latitude=${location.lat}&longitude=${location.lng}`
    + `&start_date=${dateString}&end_date=${dateString}`
    + `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
    + `&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Open-Meteo returned ${response.status}`);
  const data = await response.json();
  const max = data.daily?.temperature_2m_max?.[0];
  const min = data.daily?.temperature_2m_min?.[0];
  const rain = data.daily?.precipitation_sum?.[0];
  if (max == null || min == null) return null;
  const rainText = rain != null && rain > 0 ? `, ${rain.toFixed(1)} mm rain` : "";
  return `High ${max.toFixed(1)}°C, low ${min.toFixed(1)}°C${rainText}`;
}

function renderBroadsheet({ dateString, location, historicalEvent, birth, weather, holiday }) {
  const weatherLabel = location ? `Weather in ${location.city}` : "Weather";
  const items = [
    { label: "On this day in history", value: historicalEvent },
    { label: "Born on this day",       value: birth },
    { label: weatherLabel,             value: weather },
    { label: "Also observed",          value: holiday }
  ];

  const itemsHtml = items
    .map(item => `
      <li class="item">
        <p class="item-label">${escapeHtml(item.label)}</p>
        <p class="item-value">${item.value}</p>
      </li>
    `)
    .join("");

  resultsEl.innerHTML = `
    <article class="broadsheet">
      <p class="banner">The Day You Lived</p>
      <hr class="rule" />
      <h1 class="masthead">${escapeHtml(formatMasthead(dateString))}</h1>
      <hr class="rule" />
      <p class="dateline">Dispatches from this day</p>

      <ol class="items">${itemsHtml}</ol>
    </article>
  `;

  document.body.classList.add("has-result");
  document.querySelector(".form-label").textContent = "Pick another date";
}

async function handleSubmit(event) {
  event.preventDefault();

  const dateValue = dateInput.value;
  if (!dateValue) {
    showMessage("Pick a date first.");
    return;
  }

  const [, month, day] = dateValue.split("-");

  showMessage("Reading the archives…");

  await locationReady;

  const [eventR, birthR, weatherR, holidayR] = await Promise.allSettled([
    fetchHistoricalEvent(month, day),
    fetchBirth(month, day),
    fetchWeather(dateValue, userLocation),
    fetchHoliday(month, day)
  ]);

  const pick = (result, missing) =>
    result.status === "fulfilled" && result.value ? result.value : missing;

  const weatherFallback = !userLocation
    ? "(weather unavailable — could not detect location)"
    : "(weather records begin 1940)";

  renderBroadsheet({
    dateString: dateValue,
    location: userLocation,
    historicalEvent: pick(eventR,   "(no event recorded for this day)"),
    birth:           pick(birthR,   "(no notable birth recorded for this day)"),
    weather:         pick(weatherR, weatherFallback),
    holiday:         pick(holidayR, "(no observance recorded for this day)")
  });
}

form.addEventListener("submit", handleSubmit);

exampleButtons.forEach(button => {
  button.addEventListener("click", () => {
    dateInput.value = button.dataset.date;
    form.requestSubmit();
  });
});

dateInput.addEventListener("focus", () => {
  const rect = dateInput.getBoundingClientRect();
  if (rect.top > window.innerHeight / 2) {
    dateInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

dateInput.addEventListener("click", () => {
  dateInput.showPicker?.();
});
