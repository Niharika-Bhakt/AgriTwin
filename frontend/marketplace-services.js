// AI Fair Price & Match Simulator
function calculateAIFAirPrice() {
  const crop = document.getElementById("cropType").value;
  const qty = document.getElementById("cropQty").value;
  const price = document.getElementById("expectedPrice").value;
  
  if(!qty || !price) {
    alert("Please enter both quantity and expected price!");
    return;
  }
  
  // Show the AI analysis box dynamically
  const resultBox = document.getElementById("aiAnalysisResult");
  resultBox.style.display = "block";
  
  // Dynamic feedback simulation
  console.log(`Analyzing market data for ${qty}kg of ${crop}...`);
}

// Farm Service Booking Alert Mockup
function bookService(serviceName) {
  alert(`✅ Booking Confirmed for ${serviceName}!\nService partner has been assigned. You can track progress on your AgriTwin dashboard.`);
}