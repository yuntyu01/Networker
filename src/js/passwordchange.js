document.addEventListener('DOMContentLoaded', () => {
    const passwordForm = document.getElementById('password-form');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordCriteriaError = document.getElementById('password-criteria-error');
    const passwordMatchError = document.getElementById('password-match-error');

    function validatePasswordCriteria(password) {
        const lengthValid = password.length >= 8 && password.length <= 20;
        const criteriaValid = /(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[!@#$%^&*])|(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password);
        return lengthValid && criteriaValid;
    }

    newPassword.addEventListener('input', () => {
        const password = newPassword.value;
        if (password.length < 8 || password.length > 20) {
            passwordCriteriaError.textContent = '8~20자 내로 입력해주세요.';
            passwordCriteriaError.style.display = 'block';
        } else if (!validatePasswordCriteria(password)) {
            passwordCriteriaError.textContent = '영문/숫자/특수문자 중 두 가지 이상을 조합해주세요.';
            passwordCriteriaError.style.display = 'block';
        } else {
            passwordCriteriaError.textContent = '';
            passwordCriteriaError.style.display = 'none';
        }

        if (newPassword.value !== confirmPassword.value) {
            passwordMatchError.textContent = '비밀번호가 다릅니다.';
            passwordMatchError.style.display = 'block';
        } else {
            passwordMatchError.textContent = '';
            passwordMatchError.style.display = 'none';
        }
    });

    confirmPassword.addEventListener('input', () => {
        if (newPassword.value !== confirmPassword.value) {
            passwordMatchError.textContent = '비밀번호가 다릅니다.';
            passwordMatchError.style.display = 'block';
        } else {
            passwordMatchError.textContent = '';
            passwordMatchError.style.display = 'none';
        }
    });

    passwordForm.addEventListener('submit', (e) => {
        const password = newPassword.value;
        if (!validatePasswordCriteria(password)) {
            e.preventDefault();
            if (password.length < 8 || password.length > 20) {
                passwordCriteriaError.textContent = '8~20자 내로 입력해주세요.';
                passwordCriteriaError.style.display = 'block';
            } else {
                passwordCriteriaError.textContent = '영문/숫자/특수문자 중 두 가지 이상을 조합해주세요.';
                passwordCriteriaError.style.display = 'block';
            }
        }

        if (newPassword.value !== confirmPassword.value) {
            e.preventDefault();
            passwordMatchError.textContent = '비밀번호가 다릅니다.';
            passwordMatchError.style.display = 'block';
        }
    });
});
