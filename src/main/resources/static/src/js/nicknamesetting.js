document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.querySelector('.profile-icon');
    // 로그인 상태 확인 함수(로그인 여부에 따라 헤더 요소 변경)
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
                        profileIcon.style.display = 'inline-block';
                    } else {
                        profileIcon.style.display = 'inline-block';
                    }
                } else { //로그인안했을때
                    // 비 로그인 상태
                    window.alert("로그인이 필요합니다.");
                    window.location.href = 'login.html';
                }
            })
            .catch(error => console.error('Error:', error));
    };
    // 윈도우 크기 변경 시 요소 가시성 조정
    window.addEventListener('resize', checkLoginStatus);

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 닉네임 변경
    const nicknameForm = document.getElementById('nickname-form');
    const nicknameInput = document.getElementById('nickname');

    nicknameForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nickname = nicknameInput.value.trim();
        
        if (nickname === '') {
            alert('닉네임을 입력해주세요.');
            return;
        }

        const nicknameData = { nickname: nickname };

        fetch('/update-nickname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nicknameData),
            credentials: 'include'  // 쿠키를 포함하여 요청
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.href = 'networker.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('닉네임 변경 중 오류가 발생했습니다.');
        });
    });
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
