document.addEventListener('DOMContentLoaded', async () => {
    // 로그인, 회원가입, 프로필 아이콘 요소를 선택합니다.
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');
    const editButtonForm = document.querySelector('#edit-button-form');
    const deleteButtonForm = document.querySelector('#delete-button-form');

    // 로그인 상태 및 작성자를 확인하는 함수 정의
    const checkStatus = () => {
        // 서버에 로그인 상태를 확인하기 위한 GET 요청을 보냅니다.
        fetch('/board', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(async data => {
            if (data.loggedIn) {
                // 로그인 상태인 경우
                loginButton.style.display = 'none';
                signupButton.style.display = 'none';
                profileIcon.style.display = 'inline-block';

                const postUserId = document.querySelector('.postuserId').textContent;
                const userId = data.userEmail;

                if (postUserId === userId) {
                    // 로그인된 사용자와 작성자가 동일한 경우
                    editButtonForm.style.display = 'inline-block';
                    deleteButtonForm.style.display = 'inline-block';
                } else {
                    // 로그인된 사용자와 작성자가 다른 경우
                    editButtonForm.style.display = 'none';
                    deleteButtonForm.style.display = 'none';
                }
            } else {
                // 로그아웃 상태인 경우
                loginButton.style.display = 'inline-block';
                signupButton.style.display = 'inline-block';
                profileIcon.style.display = 'none';

                // 로그아웃 상태에서 버튼을 숨깁니다.
                editButtonForm.style.display = 'none';
                deleteButtonForm.style.display = 'none';
            }
        })
        .catch(error => console.error('Error:', error));
    };

    // DOMContentLoaded 이벤트가 발생하면 로그인 상태를 확인하는 함수 호출
    checkStatus();
});
