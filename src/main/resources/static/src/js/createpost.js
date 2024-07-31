document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.auth-buttons a[href="login.html"]');
    const signupButton = document.querySelector('.auth-buttons a[href="signup.html"]');
    const profileIcon = document.querySelector('.auth-buttons .profile-icon');
    const contentTextarea = document.querySelector('.post-body');

    // 취소 버튼 누를 때 돌아감 기능
    document.getElementById('cancel-button').onclick = function() {
        window.location.href = '/post/list';
    };

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

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 파일 업로드 처리
    document.querySelector('.create-post').addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 제출 동작을 막습니다.

        const formData = new FormData(this);
        const file = formData.get('file'); // 파일을 가져옵니다.
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB

        if (file && file.size > MAX_SIZE) {
            alert('파일 크기는 5MB를 초과할 수 없습니다.');
            return;
        }

        // 파일 업로드를 처리합니다.
        fetch('/post/uploadImage', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.fileUrl) {
                // 마크다운 콘텐츠에 이미지 URL을 삽입합니다.
                const imageMarkdown = `![Image](${data.fileUrl})\n`;
                contentTextarea.value += imageMarkdown; // 현재 내용에 추가
            } else {
                console.error('파일 업로드 실패:', data);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
