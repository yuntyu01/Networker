document.addEventListener("DOMContentLoaded", function () {
    const infoList = document.querySelector('.board-content-info');
  
    // 로컬 스토리지에서 제목과 링크를 가져옴
    const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
  
    // 제목을 <li> 요소로 변환하여 삽입
    infoList.innerHTML = newsItems.map(item => `<li><a href="${item.url}" target="_blank">${item.title}</a></li>`).join('');
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    // 최근 게시글을 가져와서 표시
    const fetchRecentPosts = () => {
        fetch('/api/recent-posts')
            .then(response => response.json())
            .then(posts => {
                const boardContent = document.querySelector('.board-content');
                boardContent.innerHTML = '';
                posts.forEach(post => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = `/post/detail/${post.id}`;
                    a.textContent = post.title;
                    li.appendChild(a);
                    boardContent.appendChild(li);
                });
            })
            .catch(error => console.error('Error:', error));
    };

    fetchRecentPosts();
});
