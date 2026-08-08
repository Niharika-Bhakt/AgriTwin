let currentAnalysis = null;

function runProduceAnalysis() {
  const cropName = document.getElementById("cropName").value.trim();
  const qty = parseFloat(document.getElementById("cropQty").value);
  const unit = document.getElementById("cropUnit").value;
  const state = document.getElementById("cropState").value.trim();
  const district = document.getElementById("cropDistrict").value.trim();
  const expectedPrice = parseFloat(document.getElementById("expectedPrice").value) || 60;

  if (!cropName || !qty || !state || !district) {
    alert("Please fill in all required fields (Crop Name, Quantity, State, District)!");
    return;
  }

  const basePrice = expectedPrice > 0 ? expectedPrice : 55;
  const recMin = Math.round(basePrice * 0.95);
  const recMax = Math.round(basePrice * 1.10);
  const recPrice = Math.round((recMin + recMax) / 2);

  const revenue = qty * recPrice;
  const expense = Math.round(revenue * 0.1); 
  const netProfit = revenue - expense;

  currentAnalysis = {
    cropName,
    qty,
    unit,
    state,
    district,
    recPriceRange: `₹${recMin} – ₹${recMax}/${unit}`,
    recPrice,
    revenue,
    expense,
    netProfit
  };

  document.getElementById("placeholderAnalysis").style.display = "none";
  document.getElementById("activeAnalysis").style.display = "block";

  document.getElementById("resPriceRange").innerText = `₹${recMin} – ₹${recMax} / ${unit}`;
  document.getElementById("resPriceStatus").innerHTML = `Your expected price: ₹${expectedPrice}/${unit} | Status: <span class="badge-green">🟢 Good Price</span>`;
  
  document.getElementById("calcQty").innerText = `${qty} ${unit}`;
  document.getElementById("calcRecPrice").innerText = `₹${recPrice}/${unit}`;
  document.getElementById("calcRevenue").innerText = `₹${revenue.toLocaleString()}`;
  document.getElementById("calcExpense").innerText = `- ₹${expense.toLocaleString()}`;
  document.getElementById("calcNetProfit").innerText = `₹${netProfit.toLocaleString()}`;

  window.scrollTo({ top: 400, behavior: 'smooth' });
}

function listProduceToMarket() {
  if (!currentAnalysis) return;

  const container = document.getElementById("myListingsContainer");
  
  if (container.querySelector(".placeholder-msg")) {
    container.innerHTML = "";
  }

  const listingId = 'listing_' + Date.now();
  const itemHTML = `
    <div class="listing-item" id="${listingId}">
      <p><strong>🌱 ${currentAnalysis.cropName}</strong> — ${currentAnalysis.qty} ${currentAnalysis.unit} — <strong style="color: #4ade80;">₹${currentAnalysis.recPrice}/${currentAnalysis.unit}</strong> — <span style="color: #4ade80;">🟢 Active</span></p>
      <p style="color: #94a3b8; font-size: 11px;">📍 ${currentAnalysis.district}, ${currentAnalysis.state} | AI Suggested: ${currentAnalysis.recPriceRange}</p>
      <div style="margin-top: 8px;">
        <button class="btn-small" style="background: #1e3a8a; color: #fff;" onclick="alert('Viewing detailed analysis report...')">View Analysis</button>
        <button class="btn-small" style="background: #f87171; color: #fff;" onclick="removeListing('${listingId}')">Remove</button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('afterbegin', itemHTML);
  alert("🌾 Produce listed successfully on AgriTwin Marketplace!");
}

function removeListing(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function handleOffer(btn, status) {
  const card = btn.closest('.offer-card');
  const actions = card.querySelector('.offer-actions');
  actions.innerHTML = `<span style="font-weight: bold; color: ${status === 'Accepted' ? '#4ade80' : '#f87171'};">Status: ${status}</span>`;
}

function openCounterModal() {
  const newPrice = prompt("Enter your counter-offer price (₹/kg):");
  if (newPrice) {
    alert(`✅ Counter-offer of ₹${newPrice}/kg sent successfully to the buyer!`);
  }
}