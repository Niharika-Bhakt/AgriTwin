const modal = document.getElementById("sellModal");

function openSellModal() {
  modal.style.display = "flex";
}

function closeSellModal() {
  modal.style.display = "none";
}


// AI PRICE ESTIMATION

document.getElementById("price").addEventListener("input", updatePrice);

function updatePrice() {

  const price = Number(document.getElementById("price").value);

  if (!price) return;

  const min = Math.round(price * 0.95);
  const max = Math.round(price * 1.10);

  document.getElementById("priceResult").innerHTML =
    `🤖 AI Suggested Price: <b>₹${min} – ₹${max}</b><br>
     Your expected price: ₹${price}`;
}


// CREATE LISTING

function createListing(e) {

  e.preventDefault();

  const crop = document.getElementById("cropName").value;
  const quantity = document.getElementById("quantity").value;
  const unit = document.getElementById("unit").value;
  const price = Number(document.getElementById("price").value);
  const district = document.getElementById("district").value;

  const aiPrice = Math.round(price * 1.05);

  const listing = document.createElement("div");

  listing.className = "listing";

  listing.innerHTML = `
    <span class="status">● Active</span>

    <h3>${crop}</h3>

    <p>
      ${quantity} ${unit} • ₹${price}/${unit}
    </p>

    <p>
      📍 ${district}
    </p>

    <div class="listing-bottom">
      <span>AI Price ₹${aiPrice}</span>
      <b>Finding Buyers...</b>
    </div>
  `;

  document.getElementById("listings")
    .prepend(listing);

  alert("🌾 Your produce has been listed successfully!");

  closeSellModal();

  e.target.reset();

  document.getElementById("priceResult").innerText =
    "Enter details to see AI estimate.";
}


// ACCEPT OFFER

function acceptOffer(button) {

  button.parentElement.innerHTML =
    `<strong style="color:#4ade80">
      ✓ Deal Accepted
    </strong>`;

}


// NEGOTIATE

function negotiate() {

  const price = prompt(
    "Enter your counter-offer price:"
  );

  if (price) {

    alert(
      `₹${price} counter-offer sent to buyer!`
    );

  }
}


// CLOSE MODAL OUTSIDE CLICK

window.onclick = function(e) {

  if (e.target === modal) {
    closeSellModal();
  }

};