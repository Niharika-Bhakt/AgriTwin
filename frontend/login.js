document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form') || document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.querySelector('input[type="email"]').value.trim();
      const password = document.querySelector('input[type="password"]').value.trim();

      if (!email || !password) {
        alert('Please enter both Email and Password!');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
          alert(`✅ Welcome back, ${data.user.name}!`);
          window.location.href = 'dashboard.html';
        } else {
          alert(data.message || 'Invalid email or password!');
        }
      } catch (err) {
        console.error('Login Error:', err);
        alert('Server is offline! Make sure node server.js is running in terminal.');
      }
    });
  }
});