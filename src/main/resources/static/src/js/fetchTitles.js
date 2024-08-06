document.addEventListener("DOMContentLoaded", function () {
    // 정보글 타이틀 출력
    const infoList = document.querySelector('.board-content-info');

    fetch('/infolist')
    .then(response => response.json())
    .then(data => {
        data.forEach(infodata => {
            const row = document.createElement('li');
            row.innerHTML = `<li><a href="${infodata.url}" target="_blank">${infodata.title}</a></li>`;
            infoList.appendChild(row);
        })
    })
    .catch(error => {
        console.error('정보글 불러오기 오류:', error);
        boardContent.innerHTML = '<li>정보글 정보를 불러올 수 없습니다.</li>';
    });
    

});

document.addEventListener("DOMContentLoaded", function() {
  const apiEndpoint = 'http://knutlion-networker.store/post/list';
  const boardContent = document.querySelector('.board-content');

  fetch(apiEndpoint)
      .then(response => {
          if (!response.ok) {
              throw new Error('네트워크 응답에 문제가 있습니다.');
          }
          return response.text();
      })
      .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          const posts = [];
          const rows = doc.querySelectorAll('tr'); // 예: <tr> 요소로 게시물 목록이 구성된 경우

          rows.forEach(row => {
              const post = {};
              const cells = row.querySelectorAll('td'); // 예: <td> 요소로 게시물 정보가 구성된 경우

              if (cells.length > 0) {
                  post.title = cells[1].innerText; // 두 번째 <td>에 게시물 제목이 있다고 가정
                  post.date = cells[2].innerText;  // 세 번째 <td>에 작성일이 있다고 가정
                  posts.push(post);
              }
          });

          boardContent.innerHTML = '';

          posts.slice(0, 7).forEach(post => {
              const listItem = document.createElement('li');
              listItem.textContent = `${post.title} - ${post.date}`;
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

