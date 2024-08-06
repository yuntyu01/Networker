document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');

    // 로그인 상태 확인 함수
    const checkLoginStatus = () => {
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
                } else { //로그인안했을때
                    if( window.innerWidth > 1090){
                        loginButton.style.display = 'inline-block';
                        signupButton.style.display = 'inline-block';
                        profileIcon.style.display = 'none';
                    }
                    else{
                        loginButton.style.display = 'none';
                        signupButton.style.display = 'none';
                        profileIcon.style.display = 'inline-block';
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // 윈도우 크기 변경 시 요소 가시성 조정
    window.addEventListener('resize', checkLoginStatus);

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();
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
