// 취소 버튼 누를 때 돌아감 기능
document.querySelector('.cancel-button').onclick = function() {
    window.location.href = '/lawsupport/main';
};

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');

    // 로그인 상태 확인 함수(로그인 여부에 따라 헤더 요소 변경)
    const checkLoginStatus = () => {
        // 현재 페이지의 전체 URL을 가져옴
        const currentUrl = window.location.href;

        // /lawsupport의 위치를 찾음
        const lawSupportIndex = currentUrl.indexOf('/lawsupport');

        // /lawsupport 이전의 부분을 추출
        const baseUrl = lawSupportIndex !== -1 ? currentUrl.substring(0, lawSupportIndex) : currentUrl;
        
        fetch('/board', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    // 로그인 했을때
                    if (window.innerWidth > 1090) {
                        loginButton.style.display = 'none';
                        signupButton.style.display = 'none';
                        profileIcon.style.display = 'inline-block';
                    } else {
                        loginButton.style.display = 'none';
                        signupButton.style.display = 'none';
                        profileIcon.style.display = 'inline-block';
                    }
                } else {
                    // 비 로그인 상태
                    window.alert("로그인이 필요합니다.");
                    window.location.href = baseUrl+'/views/login.html';

                    loginButton.style.display = 'inline-block';
                    signupButton.style.display = 'inline-block';
                    profileIcon.style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 윈도우 크기 변경 시 요소 가시성 조정
    window.addEventListener('resize', checkLoginStatus);
});



document.addEventListener('DOMContentLoaded', () => {
      
    // 헤더 로고 반응형 스타일 적용 및 드롭다운 기능 활성화
    const logo = document.querySelector('.logo');
    const menu = document.querySelector('.menu');

    logo.addEventListener('click', (event) => {
        if (window.innerWidth <= 745) {
        event.preventDefault(); // 745px 이하에서는 기본 동작 막기
        menu.classList.toggle('active');
        }
    });

    // 윈도우 크기 변경 시 메뉴 상태 초기화
    window.addEventListener('resize', () => {
        if ( window.innerWidth > 745 ) {
            menu.classList.remove('active');
        }
    });

});
