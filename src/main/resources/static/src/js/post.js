document.addEventListener('DOMContentLoaded', async () => {
    // 로그인, 회원가입, 프로필 아이콘 요소를 선택
    const loginButton = document.querySelector('.auth-buttons a[href="login.html"]');
    const signupButton = document.querySelector('.auth-buttons a[href="signup.html"]');
    const profileIcon = document.querySelector('.auth-buttons .profile-icon');

    // 로그인 상태를 확인하는 함수 (로그인 여부에 따라 헤더 요소를 변경)
    const checkLoginStatus = () => {
        // 서버에 로그인 상태를 확인하기 위한 GET 요청을 보냄
        fetch('/board', {
            method: 'GET',
            credentials: 'include' // 쿠키를 포함하여 요청을 보냄
        })
            .then(response => response.json()) // 응답을 JSON 형태로 파싱
            .then(data => {
                if (data.loggedIn) { // 로그인 상태인 경우
                    loginButton.style.display = 'none'; // 로그인 버튼 숨김
                    signupButton.style.display = 'none'; // 회원가입 버튼 숨김
                    profileIcon.style.display = 'inline-block'; // 프로필 아이콘 표시
                } else { // 로그아웃 상태인 경우
                    loginButton.style.display = 'inline-block'; // 로그인 버튼 표시
                    signupButton.style.display = 'inline-block'; // 회원가입 버튼 표시
                    profileIcon.style.display = 'none'; // 프로필 아이콘 숨김
                }
            })
            .catch(error => console.error('Error:', error)); // 오류가 발생한 경우 콘솔에 출력
    };

    // DOMContentLoaded 이벤트가 발생하면 로그인 상태 확인 함수 호출
    checkLoginStatus();
});


function removeCheck() {
    if (confirm("정말 삭제하시겠습니까??") == true) {    //확인
        // 삭제 시 이벤트.
    } else {   //취소
        return false;
    }
}