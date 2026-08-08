// 1. GLOBAL FIX: Prevent 'Learn More' href="#" from jumping to top
document.addEventListener('click', (e) => {
  const target = e.target.closest('a') || e.target.closest('button');
  
  if (target && target.innerText && target.innerText.includes('Learn More')) {
    e.preventDefault();
    e.stopPropagation();

    const user = localStorage.getItem('user');
    if (user) {
      window.location.href = 'dashboard.html';
    } else {
      alert('🔒 Please login first to access full AI Features!');
      window.location.href = 'login.html';
    }
  }
}, true);

// 2. NAVBAR SCROLL EFFECT
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 3. SMOOTH SCROLL FOR NAV LINKS
navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId.startsWith("#") && targetId.length > 1) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});

// 4. ACTIVE LINK HIGHLIGHT ON SCROLL
window.addEventListener("scroll", () => {
  let currentSection = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

// 5. BUTTONS REDIRECTION LOGIC (Book Service, Start Monitoring, & Start AI Monitoring)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button, a");
  if (!btn) return;

  const btnText = btn.innerText ? btn.innerText.trim() : "";

  // Book Agriculture Service
  if (btnText.includes("Book Agriculture Service") || btn.classList.contains("service-btn")) {
    e.preventDefault();
    const user = localStorage.getItem("user");
    if (user) {
      window.location.href = "dashboard.html";
    } else {
      window.location.href = "login.html";
    }
  }

  // Start Monitoring & Start AI Monitoring (Handles Digital Twin Section)
  if (btnText.includes("Start Monitoring") || btnText.includes("Start AI Monitoring") || btn.classList.contains("start-btn")) {
    if (!btn.classList.contains("secondary-btn")) {
      e.preventDefault();
      const user = localStorage.getItem("user");
      if (user) {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "login.html";
      }
    }
  }
});

// 6. SCROLL REVEAL ANIMATIONS
const revealItems = document.querySelectorAll(
  ".feature-card, .service-card, .digital-twin, .cta-box, .section-heading"
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealItems.forEach(item => {
  item.classList.add("hidden");
  revealObserver.observe(item);
});

// 7. STATS COUNTER ANIMATION
const counterSection = document.querySelector(".hero-stats");
const counters = document.querySelectorAll(".stat-card h3");
let counterStarted = false;

function runCounter() {
  if (counterStarted) return;
  counterStarted = true;

  counters.forEach(counter => {
    const original = counter.innerText;
    const number = parseInt(original.replace(/\D/g, ""));
    if (isNaN(number)) return;

    let count = 0;
    const speed = Math.ceil(number / 80);
    const timer = setInterval(() => {
      count += speed;
      if (count >= number) {
        counter.innerText = original;
        clearInterval(timer);
      } else {
        if (original.includes("%")) {
          counter.innerText = count + "%";
        } else if (original.includes("K")) {
          counter.innerText = count + "K+";
        } else {
          counter.innerText = count;
        }
      }
    }, 20);
  });
}

window.addEventListener("scroll", () => {
  if (!counterSection) return;
  const top = counterSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    runCounter();
  }
});

// 8. DYNAMIC TICKERS
const aiStatus = document.querySelector(".ai-card p");
if (aiStatus) {
  const statusList = ["Monitoring", "Scanning Crops", "Analyzing Soil", "Checking Weather", "Predicting Yield", "AI Online"];
  let index = 0;
  setInterval(() => {
    aiStatus.style.opacity = "0";
    setTimeout(() => {
      index = (index + 1) % statusList.length;
      aiStatus.innerText = statusList[index];
      aiStatus.style.opacity = "1";
    }, 300);
  }, 3000);
}

// 9. BACK TO TOP BUTTON
const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.innerHTML = '<i class="ri-arrow-up-line"></i>';
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Click-based Menu Dropdown Toggle Fix
document.addEventListener("click", (e) => {
  const menuDropdown = document.querySelector(".menu-dropdown");
  const menuBtn = document.querySelector(".menu-btn");
  
  if (!menuDropdown) return;

  // Agar user ne Menu button par click kiya hai
  if (menuBtn && menuBtn.contains(e.target)) {
    e.stopPropagation();
    menuDropdown.classList.toggle("active");
  } 
  // Agar user ne dropdown ke andar ya baahar click kiya hai toh band kar do
  else {
    menuDropdown.classList.remove("active");
  }
});