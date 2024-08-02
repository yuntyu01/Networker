document.addEventListener("DOMContentLoaded", function () {
    // 정보 게시판의 뉴스 제목을 로드
    const infoList = document.querySelector('.board-content-info');

    // 로컬 스토리지에서 제목과 링크를 가져옴
    const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];

    // 제목을 <li> 요소로 변환하여 삽입
    infoList.innerHTML = newsItems.map(item => `<li><a href="${item.url}" target="_blank">${item.title}</a></li>`).join('');

});

document.addEventListener("DOMContentLoaded", function () {
    const apiEndpoint = 'http://localhost:3000/api/posts/latest'; // Node.js 서버의 API 엔드포인트
    const boardContent = document.querySelector('.board-content');

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답에 문제가 있습니다.');
            }
            return response.json();
        })
        .then(posts => {
            // 기존 내용을 초기화
            boardContent.innerHTML = '';

            // 게시물 리스트를 생성하여 DOM에 추가
            posts.forEach(post => {
                const listItem = document.createElement('li');
                const postLink = document.createElement('a');

                // 링크 및 텍스트 설정
                postLink.href = `/post/detail/${post.id}`;
                postLink.textContent = `${post.subject} - ${formatDate(post.createDate)}`;

                listItem.appendChild(postLink);
                boardContent.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('게시물 불러오기 오류:', error);
            boardContent.innerHTML = '<li>게시물을 불러올 수 없습니다.</li>';
        });
});

// 날짜 형식을 포맷하는 함수
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
}
