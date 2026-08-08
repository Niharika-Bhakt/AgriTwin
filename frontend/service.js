const serviceForm = document.getElementById('serviceForm');

if (serviceForm) {
  serviceForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user')) || {};
    const serviceType = document.getElementById('serviceType')?.value || 'General';
    const details = document.getElementById('details')?.value || document.getElementById('message')?.value || '';

    try {
      const response = await fetch('http://127.0.0.1:5000/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id || 'Guest',
          userName: user.name || document.getElementById('name')?.value || 'Guest User',
          userEmail: user.email || document.getElementById('email')?.value || 'guest@example.com',
          serviceType,
          details
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        serviceForm.reset();
      } else {
        alert(data.message || 'Failed to submit service request.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server connection error!');
    }
  });
}