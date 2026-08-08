document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.id) {
    alert('Please login first!');
    window.location.href = 'login.html';
    return;
  }

  // Update Welcome Name
  const welcomeText = document.getElementById('welcomeUser');
  if (welcomeText && user.name) {
    welcomeText.innerText = `Welcome, ${user.name} 🌾`;
  }

  const modal = document.getElementById('serviceModal');
  const openBtn = document.getElementById('bookServiceBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const serviceForm = document.getElementById('dashboardServiceForm');
  const modalName = document.getElementById('modalName');
  const modalServiceSelect = document.getElementById('modalServiceType');
  const logoutBtn = document.getElementById('logoutBtn');

  if (modalName && user.name) {
    modalName.value = user.name;
  }

  // Open modal from Hero button
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  // Open modal directly from Service Cards
  document.querySelectorAll('.select-service-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const selectedService = e.target.getAttribute('data-service');
      if (modalServiceSelect) {
        modalServiceSelect.value = selectedService;
      }
      modal.style.display = 'flex';
    });
  });

  // Close Modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Submit Form
  if (serviceForm) {
    serviceForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const userName = modalName.value;
      const serviceType = modalServiceSelect.value;
      const details = document.getElementById('modalDetails').value;

      try {
        const response = await fetch('http://127.0.0.1:5000/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            userName,
            userEmail: user.email,
            serviceType,
            details
          })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Service booked successfully! 🌾 Our specialist will contact you.');
          modal.style.display = 'none';
          document.getElementById('modalDetails').value = '';
        } else {
          alert(data.message || 'Failed to book service.');
        }
      } catch (err) {
        console.error(err);
        alert('Server error! Check if node server.js is running.');
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = 'login.html';
    });
  }
});