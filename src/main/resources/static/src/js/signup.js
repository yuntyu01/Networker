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

        fetch('/signup', {  // 상대 경로를 사용하여 서버의 /data 엔드포인트로 요청을 보냅니다.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        })
            .then(response => {
                if (response.ok) {
                    return response.text(); // ResponseEntity<String> 타입을 반환하므로 text() 사용
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                alert('회원가입이 성공적으로 완료되었습니다.');
                window.location.href = 'login.html';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('회원가입 중 오류가 발생했습니다.');
            });
    });
});
