document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

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

        fetch('웹서버주소', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('회원가입이 성공적으로 완료되었습니다.');
                window.location.href = 'login.html';
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        });
    });
});
