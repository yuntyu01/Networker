document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginData = {
            email: email,
            password: password
        };

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData),
            credentials: 'include'  // 이 설정을 추가하면 쿠키가 자동으로 전송됩니다.
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                if (data.message === "로그인이 성공적으로 완료되었습니다.") {
                    window.location.href = 'profile.html'; // 로그인 후 리다이렉트
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('로그인 중 오류가 발생했습니다.');
            });
    });

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            fetch('/logout', {
                method: 'POST',
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    window.location.href = 'login.html'; // 로그아웃 후 리다이렉트
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('로그아웃 중 오류가 발생했습니다.');
                });
        });
    }
});
