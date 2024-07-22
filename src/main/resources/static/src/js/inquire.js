document.addEventListener('DOMContentLoaded', () => {
    const inquiryForm = document.getElementById('inquiry-form');
    const contentInput = document.getElementById('content');
    const privacyConsentInput = document.getElementById('privacy-consent');
    
    // 로그인, 회원가입, 프로필
    const loginButton = document.querySelector('.auth-buttons a[href="login.html"]');
    const signupButton = document.querySelector('.auth-buttons a[href="signup.html"]');
    const profileIcon = document.querySelector('.auth-buttons .profile-icon');

    // 로그인 상태 확인 함수(로그인 여부에 따라 헤더 요소 변경)
    const checkLoginStatus = () => {
        fetch('/board', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    loginButton.style.display = 'none';
                    signupButton.style.display = 'none';
                    profileIcon.style.display = 'inline-block';
                } else {
                    loginButton.style.display = 'inline-block';
                    signupButton.style.display = 'inline-block';
                    profileIcon.style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // 요구 사항 만족 여부 확인
    inquiryForm.addEventListener('submit', (e) => {
        const content = contentInput.value.trim();
        const privacyConsent = privacyConsentInput.checked;
        
        if (content === '') {
            e.preventDefault();
            alert('문의 내용을 입력해주세요.');
            return;
        }
        
        if (!privacyConsent) {
            e.preventDefault();
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }
    });

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();
});
