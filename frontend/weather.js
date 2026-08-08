const CITY = "Bhimtal";
const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; 

async function fetchWeather() {
  console.log("Fetching weather for:", CITY);
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`);
    
    // Agar API response error deta hai
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data); // Isse browser F12 Console mein data dikhega
    
    // Data update karna
    document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('condition').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('wind').innerText = `${data.wind.speed} km/h`;
    document.getElementById('pressure').innerText = `${data.main.pressure} hPa`;

  } catch (err) {
    console.error("Weather API error:", err);
    // Fallback: Agar API na chale toh manual values dikhayein
    document.getElementById('temp').innerText = "22°C";
    document.getElementById('condition').innerText = "Clear Sky";
    document.getElementById('humidity').innerText = "65%";
    document.getElementById('wind').innerText = "5.2 km/h";
    document.getElementById('pressure').innerText = "1012 hPa";
  }
}

fetchWeather();