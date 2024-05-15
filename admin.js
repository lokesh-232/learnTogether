document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageContainer = document.getElementById('messageContainer');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Create FormData object to collect form data
        const formData = new FormData(contactForm);

        // Send form data to admin.php using Fetch API
        fetch('admin.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            // Display response message in message container
            messageContainer.innerHTML = '<p>Message Successfully sent . Sorry for your inconvinience</p>';
            // Clear form fields if submission was successful
            if (data.status === 'success') {
                contactForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Display error message in message container
            messageContainer.innerHTML = '<p>An error occurred. Please try again later.</p>';
        });
    });
});
