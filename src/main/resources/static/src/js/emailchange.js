document.addEventListener('DOMContentLoaded', () => {
    const emailChangeForm = document.getElementById('email-change-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    emailChangeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // 이메일 유효성 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }

        const emailChangeData = { email, password };

        fetch('/update-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailChangeData),
            credentials: 'include'  // 쿠키를 포함하여 요청
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('이메일 변경이 완료되었습니다.');
                window.location.href = 'profile.html';
            } else {
                alert('이메일 변경에 실패하였습니다.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('이메일 변경 중 오류가 발생했습니다.');
        });
    });
});
