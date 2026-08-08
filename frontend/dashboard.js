// 1. Switch View between Dashboard & AI Chat
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

// 2. Fetch Weather with Fallback Values
const CITY_NAME = "Bhimtal";
const WEATHER_API = "bd5e378503939ddaee76f12ad7a97608";

async function loadDashboardWeather() {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${WEATHER_API}`);
    const data = await res.json();
    
    if (data.main) {
      document.getElementById('dash-temp').innerText = `${Math.round(data.main.temp)}°C`;
      document.getElementById('dash-condition').innerText = data.weather[0].description;
      document.getElementById('dash-humidity').innerText = `${data.main.humidity}%`;
      document.getElementById('dash-wind').innerText = `${data.wind.speed} km/h`;
    }
  } catch (err) {
    console.log("Using default fallback weather values.");
    document.getElementById('dash-temp').innerText = "22°C";
    document.getElementById('dash-condition').innerText = "Clear Sky";
    document.getElementById('dash-humidity').innerText = "65%";
    document.getElementById('dash-wind').innerText = "5.2 km/h";
  }
}
loadDashboardWeather();

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
          borderColor: '#00ff66',
          backgroundColor: 'rgba(0, 255, 102, 0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: '#a3b8b0' }, grid: { color: '#22382b' } },
          y: { ticks: { color: '#a3b8b0' }, grid: { color: '#22382b' } }
        }
      }
    });
  }
});

// 4. Image Preview & Crop Disease Diagnostic
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

// 5. Full-Page AI Advisor Chat Logic
function sendFullChat() {
  const inp = document.getElementById('fullChatInp');
  const txt = inp.value.trim();
  if (!txt) return;

  const box = document.getElementById('fullChatMsgs');
  box.innerHTML += `<div style="background: rgba(0,120,255,0.1); border: 1px solid #22382b; padding: 12px 16px; border-radius: 8px; max-width: 75%; align-self: flex-end; color: #fff;"><b>You:</b> ${txt}</div>`;
  inp.value = '';
  box.scrollTop = box.scrollHeight;

  setTimeout(() => {
    let reply = "Based on standard agricultural practices, ensure proper soil moisture and nutrient levels.";
    const lower = txt.toLowerCase();
    if (lower.includes('wheat') || lower.includes('gehu')) reply = "For wheat crops, maintain regular light irrigation during the crown root initiation stage.";
    if (lower.includes('price') || lower.includes('bhav')) reply = "Current market trends are stable with a potential upward shift expected next week.";

    box.innerHTML += `<div style="background: rgba(0,255,102,0.1); border: 1px solid #22382b; padding: 12px 16px; border-radius: 8px; max-width: 75%; align-self: flex-start; color: #fff;"><b>AgriTwin AI:</b> ${reply}</div>`;
    box.scrollTop = box.scrollHeight;
  }, 600);
}

function clearChat() {
  document.getElementById('fullChatMsgs').innerHTML = `
    <div style="background: rgba(0,255,102,0.1); border: 1px solid #22382b; padding: 12px 16px; border-radius: 8px; max-width: 75%; align-self: flex-start; color: #fff;">
      <b>Chat cleared!</b> How else can I help you today?
    </div>`;
}