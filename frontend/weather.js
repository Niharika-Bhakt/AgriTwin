const CITY = "Bhimtal";
const API_KEY = "bd5e378503939ddaee76f12ad7a97608";

async function fetchWeather() {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`);
    const data = await res.json();
    if (data.main) {
      document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
      document.getElementById('condition').innerText = data.weather[0].description;
      document.getElementById('humidity').innerText = `${data.main.humidity}%`;
      document.getElementById('wind').innerText = `${data.wind.speed} km/h`;
    }
  } catch (err) {
    console.log("Weather fetch error:", err);
  }
}

fetchWeather();