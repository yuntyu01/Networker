document.addEventListener('DOMContentLoaded', async () => {
    const postId = new URLSearchParams(window.location.search).get('postId');
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');
    const commentList = document.getElementById('comment-list');
    const commentContent = document.getElementById('comment-content');
    const submitComment = document.getElementById('submit-comment');

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
});
