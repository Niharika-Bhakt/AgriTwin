function openSellModal() { document.getElementById('sellModal').style.display = 'flex'; }
function closeSellModal() { document.getElementById('sellModal').style.display = 'none'; }

function listProduceToMarket(e) {
  e.preventDefault();
  const name = document.getElementById('cropName').value;
  const qty = document.getElementById('cropQty').value;
  const price = document.getElementById('expectedPrice').value;

  const container = document.getElementById('myListingsContainer');
  container.innerHTML += `
    <div class="listing-item">
      <h4>${name}</h4>
      <p>Qty: ${qty} Kg | Asking: ₹${price}/Kg</p>
      <span class="status">🟢 Active</span>
    </div>
  `;
  alert("Listing Published Successfully!");
  closeSellModal();
}

function handleOffer(btn, status) {
  btn.closest('.actions').innerHTML = `<span style="color:#4ade80; font-weight:bold;">Status: ${status}</span>`;
}

function openCounterModal() {
  const price = prompt("Enter your counter-offer price:");
  if (price) alert("Counter-offer sent!");
}

function scrollToOffers() {
  document.getElementById('offersSection').scrollIntoView({ behavior: 'smooth' });
}