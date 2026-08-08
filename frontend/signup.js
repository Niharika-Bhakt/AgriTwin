document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('form') || document.getElementById('signupForm');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.querySelector('input[type="text"]').value.trim();
      const email = document.querySelector('input[type="email"]').value.trim();
      const phone = document.querySelectorAll('input[type="text"]')[1]?.value.trim() || "0000000000";
      const password = document.querySelector('input[type="password"]').value.trim();

      if (!name || !email || !password) {
        alert('Please fill in all required fields!');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('✅ Signup Successful! Redirecting to Login page...');
          window.location.href = 'login.html';
        } else {
          alert(data.message || 'Signup failed!');
        }
      } catch (err) {
        console.error('Signup Error:', err);
        alert('Server is offline! Make sure node server.js is running.');
      }
    });
  }
});