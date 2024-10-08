document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.querySelector('.profile-icon');
    // 메뉴 요소 클릭 시 data-url 값으로 이동
    const profileLinks = document.querySelectorAll('.profile-link');
    profileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const url = link.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });

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

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 윈도우 크기 변경 시 요소 가시성 조정
    window.addEventListener('resize', checkLoginStatus);
    

    // 유저 정보 가져오기
    const fetchUserInfo = async () => {
        try {
            const response = await fetch('/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const userInfo = await response.json();
                updateProfileInfo(userInfo);
            } else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    // 프로필 정보 업데이트
    const updateProfileInfo = (userInfo) => {
        const profileInfoContainer = document.querySelector('.profile-info');
        const nameElement = profileInfoContainer.querySelector('h2');
        const nationalityElement = profileInfoContainer.querySelector('.flag');
        const userEmail = document.getElementById('user-email');

        nameElement.textContent = `${userInfo.nickname}`;
        nationalityElement.innerHTML += `<img src="../src/assets/flags/${userInfo.nationality}.svg" id="flag">`;
        userEmail.textContent = `아이디 : ${userInfo.email}`;
    };

    // 로그아웃 버튼 클릭 이벤트 처리
    const logoutButton = document.querySelector('.logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    // 로그아웃 성공 시 쿠키 삭제 및 로그인 페이지로 리디렉션
                    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    alert('로그아웃 되었습니다.');
                    window.location.href = 'networker.html';
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || '로그아웃에 실패했습니다.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('로그아웃 중 오류가 발생했습니다.');
            }
        });
    }

    // 페이지 로드 시 유저 정보 가져오기
    fetchUserInfo();
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
