// 게시물의 날짜를 형식화하는 함수
const formatDate = (dateString) => {
    const now = new Date(); // 현재 날짜와 시간
    const postDate = new Date(dateString); // 게시물의 날짜와 시간
    const timeDifference = now - postDate; // 시간 차이 (밀리초 단위)

    // 1일(24시간) 이하인 경우: 시간 표시
    if (timeDifference < 24 * 60 * 60 * 1000) {
        const hours = postDate.getHours().toString().padStart(2, '0'); // 시간 (두 자리로 맞춤)
        const minutes = postDate.getMinutes().toString().padStart(2, '0'); // 분 (두 자리로 맞춤)
        return `${hours}:${minutes}`; // "HH:MM" 형식으로 반환
    }

    // 1일 이상인 경우: 날짜 표시
    const day = postDate.getDate().toString().padStart(2, '0'); // 일 (두 자리로 맞춤)
    const month = (postDate.getMonth() + 1).toString().padStart(2, '0'); // 월 (두 자리로 맞춤, 0부터 시작하므로 +1)
    const year = postDate.getFullYear() % 100; // 두 자리 연도

    // 연도가 현재 연도와 다를 경우 'yy/mm/dd' 형식, 같은 연도일 경우 'mm/dd' 형식
    return (now.getFullYear() === postDate.getFullYear()) ? `${month}/${day}` : `${year}/${month}/${day}`;
};

document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list'); // 게시물을 표시할 테이블 본문 요소
    const pagination = document.getElementById('pagination'); // 페이지네이션 요소
    const limit = 50; // 한 번에 요청할 게시물 수
    let currentPage = 1; // 현재 페이지 번호

    // 임의의 날짜, 추천수, 조회수를 생성하는 함수
    const generateAdditionalData = () => {
        // 현재 시간을 기준으로 임의의 날짜, 추천수, 조회수 생성
        const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(); // 임의의 과거 날짜 생성
        const randomLikes = Math.floor(Math.random() * 1000); // 0에서 999 사이의 임의의 추천수
        const randomViews = Math.floor(Math.random() * 5000); // 0에서 4999 사이의 임의의 조회수
        return { date: formatDate(randomDate), likes: randomLikes, views: randomViews }; // 형식화된 날짜와 임의의 추천수, 조회수를 반환
    };

    // 게시물을 로드하는 함수
    const loadPosts = async (page, limit) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`); // API를 통해 게시물 요청
            if (!response.ok) throw new Error('Network response was not ok'); // 네트워크 응답이 정상적이지 않을 경우 오류 발생
            const posts = await response.json(); // 응답을 JSON 형식으로 변환
            postList.innerHTML = ''; // 기존 게시물 지우기

            posts.forEach(post => {
                const additionalData = generateAdditionalData(); // 추가 데이터 생성
                const postElement = document.createElement('tr'); // 새로운 행 요소 생성
                postElement.classList.add('post'); // 'post' 클래스 추가
                postElement.innerHTML = `
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.userId}</td>
                    <td>${additionalData.date}</td>
                    <td>${additionalData.views}</td>
                    <td>${additionalData.likes}</td>
                `; // 게시물 데이터를 행 요소에 추가
                postList.appendChild(postElement); // 행 요소를 테이블 본문에 추가
            });
        } catch (error) {
            console.error('Error fetching posts:', error); // 게시물 요청 중 오류 발생 시 콘솔에 로그
        }
    };

    // 페이지 번호를 생성하는 함수
    const createPagination = (totalPages) => {
        pagination.innerHTML = ''; // 기존 페이지 번호 지우기
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li'); // 새로운 페이지 번호 요소 생성
            pageItem.textContent = i; // 페이지 번호 설정
            pageItem.classList.add('page-item'); // 'page-item' 클래스 추가
            if (i === currentPage) {
                pageItem.classList.add('active'); // 현재 페이지에 'active' 클래스 추가
            }
            pageItem.addEventListener('click', () => {
                currentPage = i; // 클릭한 페이지 번호로 현재 페이지 설정
                loadPosts(currentPage, limit); // 해당 페이지의 게시물 로드
                updatePagination(totalPages); // 페이지네이션 업데이트
            });
            pagination.appendChild(pageItem); // 페이지 번호 요소를 페이지네이션에 추가
        }
    };

    // 페이지네이션 업데이트 함수
    const updatePagination = (totalPages) => {
        const pageItems = pagination.querySelectorAll('.page-item'); // 모든 페이지 번호 요소 선택
        pageItems.forEach(item => {
            item.classList.remove('active'); // 'active' 클래스 제거
            if (parseInt(item.textContent) === currentPage) {
                item.classList.add('active'); // 현재 페이지에 'active' 클래스 추가
            }
        });
    };

    // 초기 게시물 로드 및 페이지네이션 생성
    loadPosts(currentPage, limit); // 첫 페이지의 게시물 로드
    createPagination(15); // 예시로 총 20페이지라고 가정하여 페이지네이션 생성
});
