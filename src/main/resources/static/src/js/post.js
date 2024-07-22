document.addEventListener('DOMContentLoaded', async () => {
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

    // 로그인 상태 확인 호출
    checkLoginStatus();

    // jsonplaceholder에서 postId가 1인 posts와 comments 출력 함수
    const fetchPostsAndComments = async () => {
        try {
            const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
            const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');

            const posts = await postsResponse.json();
            const comments = await commentsResponse.json();

            const filteredPost = posts.find(post => post.id === 1);
            const filteredComments = comments.filter(comment => comment.postId === 1);

            const postInfoElement = document.getElementById('post-info');
            const commentsInfoElement = document.getElementById('comments-info');

            if (filteredPost) {
                postInfoElement.innerHTML = `
                    <p><strong>ID:</strong> ${filteredPost.userId}</p>
                    <p><strong>Title:</strong> ${filteredPost.title}</p>
                    <p><strong>Body:</strong> ${filteredPost.body}</p>
                `;
            } else {
                postInfoElement.innerHTML = '<p>No post found with ID 1.</p>';
            }

            if (filteredComments.length > 0) {
                commentsInfoElement.innerHTML = filteredComments.map(comment => `
                    <div>
                        <p><strong>Comment ID:</strong> ${comment.id}</p>
                        <p><strong>Name:</strong> ${comment.name}</p>
                        <p><strong>Email:</strong> ${comment.email}</p>
                        <p><strong>Body:</strong> ${comment.body}</p>
                    </div>
                    <hr>
                `).join('');
            } else {
                commentsInfoElement.innerHTML = '<p>No comments found for this post.</p>';
            }
        } catch (error) {
            console.error('Error fetching posts and comments:', error);
        }
    };

    // 함수 호출
    fetchPostsAndComments();
});
