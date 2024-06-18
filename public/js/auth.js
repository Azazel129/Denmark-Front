document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('loginName').value;
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.message === 'Login successful') {
                    alert('Login successful');
                    localStorage.setItem('user_id', data.user_id);
                    localStorage.setItem('token', data.token);
                    window.location.href = 'http://127.0.0.1:8000/admin/login';
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                document.getElementById('loginError').innerText = 'Login failed!';
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    
            if (password !== passwordConfirm) {
                alert('Passwords do not match');
                return;
            }
    
            fetch('http://127.0.0.1:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    role_id: 1,  // Setting default role_id to 1
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirm
                }),
            })
            .then(response => response.json().then(data => ({
                status: response.status,
                body: data
            })))
            .then(({ status, body }) => {
                if (status === 201) {
                    alert('Registration successful');
                    window.location.href = 'http://127.0.0.1:8000/admin/login';
                } else {
                    throw new Error(body.message || 'Registration failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Registration failed: ' + error.message);
            });
        });
    }
    
    
});
