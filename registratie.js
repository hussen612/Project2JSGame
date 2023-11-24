const sendbutton = document.getElementById('sendbutton');
    sendbutton.addEventListener('click', function() {
      // Display a confirmation dialog
      const confirmed = window.confirm('Formulier verzonden!');

      // Check if the user clicked OK
      if (confirmed) {
        // Refresh the page
        window.location.reload();
      }
    });
