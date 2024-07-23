document.addEventListener('DOMContentLoaded', () => {
    const inquiryForm = document.getElementById('inquiry-form');
    const contentInput = document.getElementById('content');
    const privacyConsentInput = document.getElementById('privacy-consent');
    const inquiryTypeSelect = document.getElementById('inquiry-type');
    const emailInput = document.getElementById('email');

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

    // 문의 종류별 내용 변화
    inquiryTypeSelect.addEventListener('change', () => {
        if (inquiryTypeSelect.value === 'advertisement') {
            contentInput.value = "1. 캠페인 내용\n2. 기간\n3. 예산";
        } else {
            contentInput.value = "";
        }
    });


    // 문의 내용 백엔드로 전달
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inquiryType = inquiryTypeSelect.value;
        const content = contentInput.value.trim();
        const email = emailInput.value.trim();
        const privacyConsent = privacyConsentInput.checked;

        if (content === '') {
            alert('문의 내용을 입력해주세요.');
            return;
        }

        if (!privacyConsent) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }

        const data = {
            inquiryType: inquiryType,
            content: content,
            email: email
        };

        console.log('Sending data:', data);

        fetch('웹서버주소', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        })
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(response => {
            console.log('Response:', response);
            alert('문의가 성공적으로 접수되었습니다.');
            inquiryForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('문의 접수 중 오류가 발생했습니다.');
        });
    });

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus()
});
