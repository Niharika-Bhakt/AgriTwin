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

    // 2. Image Upload Box Click Handler (Fixing upload issue)
    const uploadBox = document.getElementById('uploadBoxTrigger');
    const fileInput = document.getElementById('cropImageInput');
    const uploadText = document.getElementById('uploadText');
    const analyzeBtn = document.getElementById('analyzeBtn');

    uploadBox.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            uploadText.innerHTML = `📁 Selected: <b>${file.name}</b>`;
            analyzeBtn.removeAttribute('disabled'); // Enable analyze button once image is selected
        }
    });

    // 3. AI Analysis Report Popup Logic
    const analysisModal = document.getElementById('analysisModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const reportContent = document.getElementById('reportContent');

    analyzeBtn.addEventListener('click', () => {
        // Show modal
        analysisModal.removeAttribute('hidden');
        
        // Show loading state first, then simulate AI report generation
        reportContent.innerHTML = `
            <div class="loading-spinner"></div>
            <p style="text-align: center; color: var(--text-muted); margin-top: 10px;">AI is scanning leaf structure for diseases...</p>
        `;

        setTimeout(() => {
            reportContent.innerHTML = `
                <div style="background: rgba(0, 255, 102, 0.05); border: 1px solid var(--accent-green); padding: 15px; border-radius: 8px;">
                    <h4 style="color: var(--accent-green); margin-bottom: 8px;"><i class="ri-checkbox-circle-line"></i> Analysis Complete</h4>
                    <p><b>Detected Status:</b> Mild Nitrogen Deficiency & Early Blight Risk</p>
                    <p style="margin-top: 8px;"><b>Recommended Action:</b> Apply organic liquid fertilizer and maintain optimal soil moisture levels over the next 48 hours.</p>
                </div>
            `;
        }, 2000); // 2 seconds delay to simulate AI processing
    });

    closeModalBtn.addEventListener('click', () => {
        analysisModal.setAttribute('hidden', true);
    });

    // Close modal when clicking outside content
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