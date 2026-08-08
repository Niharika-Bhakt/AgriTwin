let chosenService = "";

function selectService(serviceName, cardElement) {
  chosenService = serviceName;
  document.getElementById('selectedServiceInput').value = serviceName;

  // Remove 'selected' class from all cards
  const cards = document.querySelectorAll('.service-option-card');
  cards.forEach(card => card.classList.remove('selected'));

  // Add 'selected' class to the clicked card
  cardElement.classList.add('selected');
}

document.getElementById('serviceBookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('farmerName').value.trim();
  const place = document.getElementById('farmerPlace').value.trim();
  const service = document.getElementById('selectedServiceInput').value;
  const phone = document.getElementById('contactNumber').value.trim();

  if (!service) {
    alert('Please click and select a service card above first!');
    return;
  }

  // Simulated Agent Assignment details
  const agentName = "Ramesh Kumar (District Expert)";
  const agentPhone = "+91 9876543210";

  // Set popup text dynamically
  const detailsText = `Thank you <b>${name}</b> from <b>${place}</b>.<br>Your booking for <b>${service}</b> is confirmed!<br><br><b>Assigned Agent:</b> ${agentName}<br><b>Agent Contact:</b> ${agentPhone}`;
  
  document.getElementById('agentDetailsText').innerHTML = detailsText;
  
  // Show modal popup
  document.getElementById('successModal').style.display = 'flex';
});

function closeModal() {
  document.getElementById('successModal').style.display = 'none';
  document.getElementById('serviceBookingForm').reset();
  document.querySelectorAll('.service-option-card').forEach(card => card.classList.remove('selected'));
  chosenService = "";
  window.location.href = 'index.html'; // Redirect back to home after closing
}