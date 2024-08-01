document.addEventListener("DOMContentLoaded", function () {
    // 정보 게시판의 뉴스 제목을 로드
    const infoList = document.querySelector('.board-content-info');

    // 로컬 스토리지에서 제목과 링크를 가져옴
    const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];

    // 제목을 <li> 요소로 변환하여 삽입
    infoList.innerHTML = newsItems.map(item => `<li><a href="${item.url}" target="_blank">${item.title}</a></li>`).join('');

    // 최근 게시글을 가져와서 표시
    fetchRecentPosts();
});

// 최근 게시글을 가져와서 표시
const fetchRecentPosts = () => {
    fetch('/api/recent-posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            const boardContent = document.querySelector('.board-content');  // 'board-content'로 지정된 <ul>을 찾음
            boardContent.innerHTML = '';  // 기존 내용을 비움

            posts.forEach(post => {  // 최근 6개의 게시글을 가져옴
                const li = document.createElement('li');  // <li> 요소 생성
                const a = document.createElement('a');  // <a> 요소 생성
                a.href = `/post/detail/${post.id}`;  // 게시글 상세 페이지 링크
                a.textContent = post.title;  // 게시글 제목
                li.appendChild(a);  // <a> 요소를 <li>에 추가
                boardContent.appendChild(li);  // <li> 요소를 <ul>에 추가
            });
        })
        .catch(error => console.error('Error fetching recent posts:', error));
};
