document.addEventListener('DOMContentLoaded', () => {
    // 1. Load User Name dynamically from localStorage if present
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        try {
            const userData = JSON.parse(savedUser);
            if (userData.name) {
                document.getElementById('userNameDisplay').innerText = userData.name;
            }
        } catch (e) {
            document.getElementById('userNameDisplay').innerText = savedUser;
        }
    }

    // 2. Image Upload Box Click Handler
    const uploadBox = document.getElementById('uploadBoxTrigger');
    const fileInput = document.getElementById('cropImageInput');
    const uploadText = document.getElementById('uploadText');
    const analyzeBtn = document.getElementById('analyzeBtn');

    uploadBox.addEventListener('click', () => {
        fileInput.click();
    });

    // Track if an image is actually selected
    let selectedImageFile = null;

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            selectedImageFile = e.target.files[0];
            uploadText.innerHTML = `📁 Selected: <b>${selectedImageFile.name}</b>`;
            analyzeBtn.removeAttribute('disabled'); // Enable button only after image selection
        }
    });

    // 3. AI Analysis Report Popup Logic (Only runs if an image is uploaded)
    const analysisModal = document.getElementById('analysisModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const reportContent = document.getElementById('reportContent');

    analyzeBtn.addEventListener('click', () => {
        // Double check safety: do not open if no image is chosen
        if (!selectedImageFile) {
            alert('Pehle kripya crop ki image upload karein!');
            return;
        }

        // Show modal
        analysisModal.removeAttribute('hidden');
        
        // Show loading state, then simulate AI report generation based on uploaded image
        reportContent.innerHTML = `
            <div class="loading-spinner"></div>
            <p style="text-align: center; color: var(--text-muted); margin-top: 10px;">Scanning "${selectedImageFile.name}" for diseases...</p>
        `;

        setTimeout(() => {
            reportContent.innerHTML = `
                <div style="background: rgba(0, 255, 102, 0.05); border: 1px solid var(--accent-green); padding: 15px; border-radius: 8px;">
                    <h4 style="color: var(--accent-green); margin-bottom: 8px;"><i class="ri-checkbox-circle-line"></i> Analysis Complete</h4>
                    <p><b>File Analyzed:</b> ${selectedImageFile.name}</p>
                    <p style="margin-top: 5px;"><b>Detected Status:</b> Mild Nitrogen Deficiency & Early Blight Risk</p>
                    <p style="margin-top: 8px;"><b>Recommended Action:</b> Apply organic liquid fertilizer and maintain optimal soil moisture levels over the next 48 hours.</p>
                </div>
            `;
        }, 2000);
    });

    closeModalBtn.addEventListener('click', () => {
        analysisModal.setAttribute('hidden', true);
    });

    window.addEventListener('click', (e) => {
        if (e.target === analysisModal) {
            analysisModal.setAttribute('hidden', true);
        }
    });

    // 4. Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }
});