// Simulating a click action for navigation
document.querySelectorAll('.btn.primary').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = button.getAttribute('href');
      if (targetPage) {
        window.location.href = targetPage; // Navigate to the clicked game page
      }
    });
  });
  