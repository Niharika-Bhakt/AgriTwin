document.getElementById('serviceBookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('farmerName').value.trim();
  const place = document.getElementById('farmerPlace').value.trim();
  const service = document.getElementById('serviceType').value;
  const phone = document.getElementById('contactNumber').value.trim();

  // Simulated Agent Assignment
  const agentName = "Ramesh Kumar (District Expert)";
  const agentPhone = "+91 9876543210";

  // Set popup text dynamically with agent info
  const detailsText = `Thank you <b>${name}</b> from <b>${place}</b>.<br>Your request for <b>${service}</b> is confirmed!<br><br><b>Assigned Agent:</b> ${agentName}<br><b>Agent Contact:</b> ${agentPhone}`;
  
  document.getElementById('agentDetailsText').innerHTML = detailsText;
  
  // Show modal popup
  document.getElementById('successModal').style.display = 'flex';
});

function closeModal() {
  document.getElementById('successModal').style.display = 'none';
  document.getElementById('serviceBookingForm').reset();
  window.location.href = 'index.html'; // Redirect back to home after closing
}