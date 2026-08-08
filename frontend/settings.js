// Settings Page Logic
document.addEventListener('DOMContentLoaded', () => {
  console.log("Settings page loaded successfully with dark glassmorphism theme.");
});

function saveSettings() {
  const farmerName = document.getElementById('settingsName').value;
  const farmLocation = document.getElementById('settingsLocation').value;
  
  if (!farmerName || !farmLocation) {
    alert('Please fill in all fields before saving.');
    return;
  }
  
  alert(`Settings saved successfully for ${farmerName} at ${farmLocation}!`);
}