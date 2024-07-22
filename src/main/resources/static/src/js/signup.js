document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
//
        const email = document.getElementById('email').value;
        const nationality = document.getElementById('nationality').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const signupData = {
            email: email,
            nationality: nationality,
            password: password
        };

        console.log('Sending signup request', signupData);

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        })
            .then(response => response.text().then(text => ({ status: response.status, body: text })))
            .then(({ status, body }) => {
                console.log('Response status:', status);
                console.log('Response body:', body);

                if (status === 200) {
                    alert(body);
                    window.location.href = 'login.html';
                } else if (status === 409) {
                    alert(body);
                } else if (status === 400) {
                    alert(body);
                } else {
                    alert(body);
                }
            })
            .catch(error => {
                console.error('Network Error:', error);
                alert('회원가입 중 네트워크 오류가 발생했습니다. 다시 시도해주세요.');
            });
    });
});
