document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById("userNameDisplay");

    const savedUser = localStorage.getItem("user");

    if (savedUser && userNameDisplay) {
        try {
            const userData = JSON.parse(savedUser);

            if (userData.name) {
                userNameDisplay.textContent = userData.name;
            }
        } catch (error) {
            userNameDisplay.textContent = savedUser;
        }
    }

    const uploadBox = document.getElementById("uploadBoxTrigger");
    const fileInput = document.getElementById("cropImageInput");
    const uploadText = document.getElementById("uploadText");
    const analyzeBtn = document.getElementById("analyzeBtn");

    let selectedImageFile = null;
    if (!uploadBox || !fileInput || !uploadText || !analyzeBtn) {
        console.warn("Crop upload elements not found.");
        return;
    }

    uploadBox.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {

            alert("Please select a valid crop image.");

            fileInput.value = "";
            selectedImageFile = null;

            analyzeBtn.disabled = true;

            uploadText.textContent =
                "Click to upload crop image";

            return;
        }

        if (file.size > 5 * 1024 * 1024) {

            alert("Image size should be less than 5 MB.");

            fileInput.value = "";
            selectedImageFile = null;

            analyzeBtn.disabled = true;

            uploadText.textContent =
                "Click to upload crop image";

            return;
        }

        selectedImageFile = file;
        uploadText.innerHTML = `
            📷 <b>${escapeHTML(file.name)}</b>
            <br>
            <small style="color:#7f8c85;">
                Image selected successfully
            </small>
        `;

        analyzeBtn.disabled = false;
        uploadBox.style.borderColor = "#00e676";
        uploadBox.style.background =
            "rgba(0, 230, 118, 0.06)";
    });

    const analysisModal =
        document.getElementById("analysisModal");

    const closeModalBtn =
        document.getElementById("closeModalBtn");

    const reportContent =
        document.getElementById("reportContent");

    if (analysisModal) {
        analysisModal.setAttribute("hidden", "");
        analysisModal.style.display = "none";
    }

    analyzeBtn.addEventListener("click", () => {

        if (!selectedImageFile) {

            alert("Please upload a crop image first.");

            return;
        }

        openAnalysisModal();

        reportContent.innerHTML = `
            <div class="loading-spinner"></div>

            <p style="
                text-align:center;
                color:#7f8c85;
                margin-top:12px;
            ">
                AI is analyzing your crop...
            </p>

            <p style="
                text-align:center;
                color:#5cff9b;
                font-size:12px;
                margin-top:5px;
            ">
                Scanning ${escapeHTML(selectedImageFile.name)}
            </p>
        `;
        analyzeBtn.disabled = true;
        setTimeout(() => {

            showAIReport();

            analyzeBtn.disabled = false;

        }, 2000);

    });

    function openAnalysisModal() {

        if (!analysisModal) {
            return;
        }

        analysisModal.removeAttribute("hidden");

        analysisModal.style.display = "flex";

        document.body.style.overflow = "hidden";
    }

    function closeAnalysisModal() {

        if (!analysisModal) {
            return;
        }

        analysisModal.setAttribute("hidden", "");

        analysisModal.style.display = "none";

        document.body.style.overflow = "";
    }

    if (closeModalBtn) {

        closeModalBtn.addEventListener(
            "click",
            closeAnalysisModal
        );
    }

    if (analysisModal) {

        analysisModal.addEventListener("click", (event) => {

            if (event.target === analysisModal) {

                closeAnalysisModal();

            }

        });
    }

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeAnalysisModal();

        }

    });

    function showAIReport() {

        if (!reportContent || !selectedImageFile) {
            return;
        }


        reportContent.innerHTML = `

            <div style="
                background:rgba(0,230,118,0.05);
                border:1px solid rgba(0,230,118,0.3);
                padding:18px;
                border-radius:12px;
            ">

                <div style="
                    display:flex;
                    align-items:center;
                    gap:10px;
                    margin-bottom:15px;
                ">

                    <i
                        class="ri-checkbox-circle-line"
                        style="
                            color:#00e676;
                            font-size:25px;
                        "
                    ></i>

                    <h4 style="
                        color:#00e676;
                        font-size:17px;
                    ">
                        Analysis Complete
                    </h4>

                </div>


                <div style="
                    display:grid;
                    gap:10px;
                ">

                    <p>
                        <strong>Image:</strong>
                        ${escapeHTML(selectedImageFile.name)}
                    </p>


                    <p>
                        <strong>Crop Health:</strong>
                        <span style="color:#38d978;">
                            86% — Good
                        </span>
                    </p>


                    <p>
                        <strong>Detected Risk:</strong>
                        <span style="color:#ffb74d;">
                            Early Blight Risk
                        </span>
                    </p>


                    <p>
                        <strong>Nutrition Status:</strong>
                        Mild Nitrogen Deficiency
                    </p>


                    <p>
                        <strong>Farm Risk:</strong>
                        <span style="color:#38d978;">
                            Low
                        </span>
                    </p>

                </div>


                <div style="
                    margin-top:16px;
                    padding:14px;
                    background:rgba(255,183,77,0.06);
                    border:1px solid rgba(255,183,77,0.2);
                    border-radius:9px;
                ">

                    <strong style="color:#ffb74d;">
                        Recommended Action
                    </strong>

                    <p style="
                        margin-top:6px;
                        font-size:13px;
                    ">
                        Maintain optimal soil moisture,
                        monitor the crop for the next
                        48 hours, and consider suitable
                        organic nutrient support.
                    </p>

                </div>


                <div style="
                    margin-top:15px;
                    padding:12px;
                    background:rgba(77,166,255,0.06);
                    border:1px solid rgba(77,166,255,0.18);
                    border-radius:9px;
                ">

                    <p style="
                        color:#4da6ff;
                        font-size:12px;
                    ">
                        <i class="ri-information-line"></i>
                        This is a prototype AI analysis
                        for demonstration purposes.
                    </p>

                </div>

            </div>
        `;
    }

    const printReportBtn =
        document.getElementById("printReportBtn");

    if (printReportBtn) {

        printReportBtn.addEventListener("click", () => {

            if (!reportContent) {
                return;
            }


            const reportWindow =
                window.open(
                    "",
                    "_blank",
                    "width=800,height=700"
                );


            reportWindow.document.write(`

                <!DOCTYPE html>

                <html>

                <head>

                    <title>AgriTwin AI - Crop Report</title>

                    <style>

                        body {
                            font-family: Arial, sans-serif;
                            padding: 40px;
                            color: #222;
                        }

                        h1 {
                            color: #0a8f45;
                        }

                        .report {
                            margin-top: 25px;
                            padding: 20px;
                            border: 1px solid #ddd;
                            border-radius: 10px;
                        }

                        p {
                            line-height: 1.7;
                        }

                    </style>

                </head>

                <body>

                    <h1>
                        🌱 AgriTwin AI
                    </h1>

                    <h2>
                        AI Crop Diagnostic Report
                    </h2>

                    <div class="report">

                        ${reportContent.innerHTML}

                    </div>

                    <p>
                        Generated by AgriTwin AI
                    </p>

                </body>

                </html>

            `);


            reportWindow.document.close();

            reportWindow.focus();

            reportWindow.print();

        });

    }

    const consultExpertBtn =
        document.getElementById("consultExpertBtn");

    if (consultExpertBtn) {

        consultExpertBtn.addEventListener("click", () => {

            alert(
                "Expert consultation feature will be available soon."
            );

        });

    }

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {
                return;
            }


            localStorage.removeItem("user");
            window.location.href = "login.html";

        });

    }

    function escapeHTML(value) {

        const div = document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }

    const cards = document.querySelectorAll(
        ".card, .stat-card, .market-card"
    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform = "translateY(10px)";

        card.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";


        setTimeout(() => {

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";

        }, 80 * index);

    });

    console.log(
        "🌱 AgriTwin AI Dashboard loaded successfully."
    );

});

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-toggle-btn');
    const sidebar = document.querySelector('.sidebar');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
});