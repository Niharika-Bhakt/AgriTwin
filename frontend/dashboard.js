// 1. View Switcher between Dashboard & Full-Page AI Advisor
function switchView(viewName) {
  const dashView = document.getElementById('mainDashboardView');
  const aiView = document.getElementById('aiAdvisorSection');
  const navDash = document.getElementById('navDash');
  const navAI = document.getElementById('navAI');

  if (viewName === 'ai') {
    dashView.style.display = 'none';
    aiView.style.display = 'block';
    navAI.classList.add('active');
    navDash.classList.remove('active');
  } else {
    dashView.style.display = 'block';
    aiView.style.display = 'none';
    navDash.classList.add('active');
    navAI.classList.remove('active');
  }
}

// 2. Fetch Live Weather Data
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

// 3. Profit Chart Rendering
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

// 4. AI Price Suggestion & Marketplace
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

// 5. Image Preview & Crop Disease Diagnostic
function previewImage(event) {
  const reader = new FileReader();
  const imageField = document.getElementById("imagePreview");
  const uploadContent = document.getElementById("uploadContent");
  const uploadZone = document.getElementById("uploadZone");

  reader.onload = function() {
    if (reader.readyState === 2) {
      imageField.src = reader.result;
      imageField.style.display = "block";
      uploadContent.style.display = "none";
      uploadZone.style.padding = "0";
      uploadZone.style.border = "none";
    }
  }
  if (event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0]);
  }
}

function analyzeCropDisease() {
  const fileInput = document.getElementById('cropImg');
  const resultDiv = document.getElementById('diseaseResult');
  
  if (fileInput.files.length === 0) {
    alert('Please select a leaf image first!');
    return;
  }
  resultDiv.style.display = 'block';
}

// 6. Full-Page AI Advisor Chat Logic
function sendFullChat() {
  const inp = document.getElementById('fullChatInp');
  const txt = inp.value.trim();
  if (!txt) return;

  const box = document.getElementById('fullChatMsgs');
  box.innerHTML += `<div style="background: #e3f2fd; padding: 12px 16px; border-radius: 8px; max-width: 75%; align-self: flex-end; color: #0d47a1;"><b>You:</b> ${txt}</div>`;
  inp.value = '';
  box.scrollTop = box.scrollHeight;

  setTimeout(() => {
    let reply = "Based on standard agricultural best practices, ensure proper soil moisture and nutrient balance.";
    const lower = txt.toLowerCase();
    if (lower.includes('wheat') || lower.includes('gehu')) reply = "For wheat crops, maintain regular light irrigation during crown root initiation and monitor for rust.";
    if (lower.includes('price') || lower.includes('bhav')) reply = "Current market trends are stable with a potential upward shift next week.";
    if (lower.includes('disease') || lower.includes('bimari')) reply = "Please upload an image of the affected leaf in the leaf diagnostic section for computer-vision analysis.";

    box.innerHTML += `<div style="background: #e8f5e9; padding: 12px 16px; border-radius: 8px; max-width: 75%; align-self: flex-start; color: #1b5e20;"><b>AgriTwin AI:</b> ${reply}</div>`;
    box.scrollTop = box.scrollHeight;
  }, 600);
}

function clearChat() {
  document.getElementById('fullChatMsgs').innerHTML = `
    <div style="background: #e8f5e9; padding: 12px 16px; border-radius: 8px; max-width: 75%; align-self: flex-start; color: #1b5e20;">
      <b>Chat cleared!</b> How else can I help you with your farm management today?
    </div>`;
}