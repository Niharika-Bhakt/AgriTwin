const CITY = "Bhimtal";
const API_KEY = "bd5e378503939ddaee76f12ad7a97608";

async function fetchWeather() {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`);
    const data = await res.json();
    
    if (data.main) {
      document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
      const desc = data.weather[0].description;
      document.getElementById('condition').innerText = desc.charAt(0).toUpperCase() + desc.slice(1);
      document.getElementById('humidity').innerText = `${data.main.humidity}%`;
      document.getElementById('wind').innerText = `${data.wind.speed} km/h`;
      document.getElementById('pressure').innerText = `${data.main.pressure}`;

      // Dynamic AI Advisory based on Humidity/Rain
      const advisory = document.getElementById('advisory-text');
      if (data.main.humidity > 80) {
        advisory.innerHTML = "⚠️ High humidity detected. Risk of fungal infection is elevated. Avoid chemical spraying today.";
        advisory.style.color = "#ff4d4d";
      } else {
        advisory.innerHTML = "✅ Weather conditions are optimal for regular field operations and irrigation scheduling.";
        advisory.style.color = "#00ff66";
      }
    }
  } catch (err) {
    console.log("Weather fetch error:", err);
  }
}

fetchWeather();