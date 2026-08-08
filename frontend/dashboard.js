// 1. Fetch Live Weather Data
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
    console.log("Weather loading error:", err);
  }
}
fetchWeather();

// 2. Profit Chart Rendering
window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('profitChart');
  if (ctx) {
    new Chart(ctx.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Net Profit (₹)',
          data: [4000, 5500, 3000, 7000, 8500, 6000, 9300],
          borderColor: '#2e7d32',
          backgroundColor: 'rgba(46, 125, 50, 0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
});

// 3. AI Price Suggestion & Marketplace
const baseRates = { 'mango': [55, 70], 'tomato': [25, 35], 'potato': [18, 25], 'wheat': [26, 32] };

function suggestAIPrice() {
  const name = document.getElementById('pName').value.toLowerCase().trim();
  const notice = document.getElementById('aiPriceNotice');
  if (baseRates[name]) {
    notice.innerText = `🤖 AgriTwin AI Suggested Rate: ₹${baseRates[name][0]} - ₹${baseRates[name][1]}/kg`;
  } else if (name.length > 2) {
    notice.innerText = `🤖 AgriTwin AI Suggested Avg Rate: ₹30 - ₹45/kg`;
  } else {
    notice.innerText = '';
  }
}

let marketItems = [];
function addMarketProduct(e) {
  e.preventDefault();
  const item = {
    name: document.getElementById('pName').value,
    qty: document.getElementById('pQty').value,
    price: document.getElementById('pPrice').value,
    loc: document.getElementById('pLoc').value
  };
  marketItems.push(item);
  renderMarket();
  document.getElementById('sellForm').reset();
  document.getElementById('aiPriceNotice').innerText = '';
}

function renderMarket() {
  const list = document.getElementById('marketList');
  if (!list) return;
  list.innerHTML = marketItems.map(i => `
    <div style="border:1px solid #ccc; padding:10px; border-radius:6px; background:#fafafa;">
      <b>📦 ${i.name}</b> - ₹${i.price}/kg (${i.qty} kg) <br>
      <small>Location: ${i.loc}</small>
    </div>
  `).join('');
}

// 4. Crop Disease Diagnostic Mock Function
function analyzeCropDisease() {
  const fileInput = document.getElementById('cropImg');
  const resultDiv = document.getElementById('diseaseResult');
  
  if (fileInput.files.length === 0) {
    alert('Please select a leaf image first!');
    return;
  }
  resultDiv.style.display = 'block';
}

// 5. Floating Chatbot Logic
function toggleChatWin() {
  const w = document.getElementById('chatWin');
  w.style.display = w.style.display === 'none' ? 'flex' : 'none';
}

function sendChat() {
  const inp = document.getElementById('chatInp');
  const txt = inp.value.trim();
  if (!txt) return;

  const box = document.getElementById('chatMsgs');
  box.innerHTML += `<div class="msg user"><b>You:</b> ${txt}</div>`;
  inp.value = '';

  setTimeout(() => {
    let reply = "I suggest checking soil moisture and local weather conditions.";
    const lower = txt.toLowerCase();
    if (lower.includes('disease') || lower.includes('bimari')) reply = "For leaf spots, spray Neem oil or Copper Oxychloride spray.";
    if (lower.includes('weather') || lower.includes('mausam')) reply = "Rain expected soon; delay irrigation.";
    box.innerHTML += `<div class="msg ai"><b>AI:</b> ${reply}</div>`;
    box.scrollTop = box.scrollHeight;
  }, 400);
}