// script.js
// script.js

const container = document.querySelector('.container');

// Add a class to trigger animation
container.classList.add('slide-in');

// Smooth hover effect for buttons with CSS transition
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#0056b3';
    });
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#007bff';
    });
});

// Smooth hover effect for links with CSS transition
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.classList.add('underline-animation');
    });
    link.addEventListener('mouseleave', () => {
        link.classList.remove('underline-animation');
    });
});

// Smooth transition for input fields with CSS transition
const inputFields = document.querySelectorAll('input[type="text"], input[type="password"]');
inputFields.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#007bff';
    });
    input.addEventListener('blur', () => {
        input.style.borderColor = '#ccc';
    });
});
// script.js

// Toggle password visibility
const showPasswordCheckbox = document.getElementById('showPassword');
const passwordInput = document.getElementById('password');


