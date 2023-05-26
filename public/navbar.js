function updateInterface(isLoggedIn, user) {
    if (isLoggedIn) {
        document.getElementById('username').textContent = user.username;
        document.getElementById('logout-form').style.display = 'block';
        document.getElementById('login-button').style.display = 'none';
    } else {
        document.getElementById('username').textContent = '';
        document.getElementById('logout-form').style.display = 'none';
        document.getElementById('login-button').style.display = 'block';
    }
}

function checkLoginStatus() {
    fetch('/api/users/check-login')
        .then(response => response.json())
        .then(data => {
            updateInterface(data.isLoggedIn, data.user);
        });
}

window.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});