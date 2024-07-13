document.addEventListener('DOMContentLoaded', () => {
    const emailChangeForm = document.getElementById('email-change-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    emailChangeForm.addEventListener('submit', (e) => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // 이메일 유효성 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            e.preventDefault();
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }
        
        // 비밀번호 유효성 검사
        if (password !== 'qwer1234') {
            e.preventDefault();
            alert('올바른 비밀번호를 입력해주세요.');
            return;
        }
    });
});
