document.addEventListener('DOMContentLoaded', async () => {
    const postId = new URLSearchParams(window.location.search).get('postId');
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');
    const commentList = document.getElementById('comment-list');
    const commentContent = document.getElementById('comment-content');
    const submitComment = document.getElementById('submit-comment');

    // 로그인, 회원가입, 프로필 아이콘
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


    // 게시글 내용 불러오기
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await response.json();
    postTitle.textContent = post.title;
    postContent.textContent = post.body;

    // 댓글 불러오기
    const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const comments = await commentResponse.json();
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p><strong>${comment.email}</strong></p>
            <p>${comment.body}</p>
        `;
        commentList.appendChild(commentElement);
    });

    // 댓글 작성
    submitComment.addEventListener('click', async () => {
        const content = commentContent.value.trim();
        if (content === '') {
            alert('댓글을 입력해주세요.');
            return;
        }

        // 여기에 실제 댓글 작성 API 호출 코드를 추가하세요.
        const newComment = {
            postId: postId,
            id: new Date().getTime(),
            email: 'user@example.com',
            body: content,
        };

        // 댓글 리스트에 추가
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p><strong>${newComment.email}</strong></p>
            <p>${newComment.body}</p>
        `;
        commentList.appendChild(commentElement);

        // 입력란 초기화
        commentContent.value = '';
    });


    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

});
