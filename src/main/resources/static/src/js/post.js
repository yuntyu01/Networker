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

    // jsonplaceholder에서 postId가 1인 posts와 comments를 출력하는 함수
    const fetchPostsAndComments = async () => {
        try {
            // posts와 comments 데이터를 가져오기 위한 두 개의 fetch 요청
            const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
            const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');

            // 응답을 JSON 형태로 파싱
            const posts = await postsResponse.json();
            const comments = await commentsResponse.json();

            // postId가 1인 포스트 필터링
            const filteredPost = posts.find(post => post.id === 1);
            // postId가 1인 코멘트 필터링
            const filteredComments = comments.filter(comment => comment.postId === 1);

            // post와 comments를 출력할 요소 선택
            const postInfoElement = document.getElementById('post-info');
            const commentsInfoElement = document.getElementById('comments-info');

            // 필터링된 포스트가 있는 경우 HTML에 추가
            if (filteredPost) {
                postInfoElement.innerHTML = `
                    <div>
                        <p class="post-title">${filteredPost.title}</p>    
                        <p>${filteredPost.userId}</p>
                    </div>
                    <div>
                        <p>${filteredPost.body}</p>
                    </div>
                `; // 작성일 p 태그 추가 해야함.
            } else {
                // 필터링된 포스트가 없는 경우
                postInfoElement.innerHTML = '<p>No post found with ID 1.</p>';
            }

            // 필터링된 코멘트가 있는 경우 HTML에 추가
            if (filteredComments.length > 0) {
                commentsInfoElement.innerHTML = filteredComments.map(comment => `
                    <div>
                        <p class="comment-id">${comment.id}</p>
                        <p class="comment-body">${comment.body}</p>
                    </div>
                    <hr>
                `).join(''); // 작성일 p 태그 추가 해야함.
            } else {
                // 필터링된 코멘트가 없는 경우
                commentsInfoElement.innerHTML = '<p>No comments found for this post.</p>';
            }
        } catch (error) {
            // 오류가 발생한 경우 콘솔에 출력
            console.error('Error fetching posts and comments:', error);
        }
    };

    // DOMContentLoaded 이벤트가 발생하면 포스트와 코멘트를 가져오는 함수 호출
    fetchPostsAndComments();
});
