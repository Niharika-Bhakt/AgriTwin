function runMarketAI() {
  const qty = document.getElementById("produceQty").value;
  const price = document.getElementById("expectedPrice").value;

  if(!qty || !price) {
    alert("Please enter both harvest quantity and your expected price!");
    return;
  }

  // Hide placeholder and show AI analysis box smoothly
  document.getElementById("placeholderText").style.display = "none";
  document.getElementById("aiResults").style.display = "block";
}