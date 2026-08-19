function saveSettings() {
    const name = document.getElementById('settingsName').value;
    const location = document.getElementById('settingsLocation').value;
    const language = document.getElementById('settingsLanguage').value;
    const parentalEnabled = document.getElementById('parentalToggle').checked;
    const pin = document.getElementById('pinInput').value;

    const userSettings = {
        name,
        location,
        language,
        parentalEnabled,
        pin: parentalEnabled ? pin : ""
    };

    localStorage.setItem('agriTwinSettings', JSON.stringify(userSettings));
    alert('✅ Settings saved successfully!');
}

document.getElementById('darkModeToggle').addEventListener('change', function() {
    if(this.checked) {
        document.body.style.background = "#070c09";
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.style.background = "#f0f4f1";
        localStorage.setItem('theme', 'light');
    }
});

document.getElementById('parentalToggle').addEventListener('change', function() {
    const pinBox = document.getElementById('pinBox');
    if(this.checked) {
        pinBox.style.display = 'block';
    } else {
        pinBox.style.display = 'none';
    }
});

document.getElementById('profilePicInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('profilePreview').src = event.target.result;
            localStorage.setItem('profilePic', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function savePin() {
    const pinInput = document.getElementById('pinInput');
    const pin = pinInput.value.trim();

    if (pin.length === 4 && !isNaN(pin)) {
        localStorage.setItem('parentalPin', pin);
        alert('🔒 Security PIN saved successfully!');
    } else {
        alert('❌ Please enter a valid 4-digit numeric PIN.');
    }
}