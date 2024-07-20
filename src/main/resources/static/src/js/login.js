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
            .then(response => {
                console.log('HTTP Status:', response.status);
                return response.json().then(data => ({ status: response.status, body: data }));
            })
            .then(({ status, body }) => {
                console.log('Response:', body);
                if (status === 200) {
                    console.log('로그인 성공(테스트용 코드)')
                    alert(body.message);
                    //로그인 성공 시 프로필 페이지로 이동
                    window.location.href = 'profile.html';
                } else {
                    console.log('로그인 실패(테스트용 코드)')
                    alert(body.message);
                }
            })
            .catch(error => {
                console.log('로그인 에러 발생 (테스트용 코드)')
                console.error('Error:', error);
                alert('로그인 중 오류가 발생했습니다.');
            });
    });
});
