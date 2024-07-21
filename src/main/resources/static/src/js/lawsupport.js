// 지난 날짜에 따른 작성을 다르게 표시하는 방법.
const formatDate = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const timeDifference = now - postDate; // 시간 차이 (밀리초 단위)

    // 1일(24시간) 이하인 경우: 시간 표시
    if (timeDifference < 24 * 60 * 60 * 1000) {
        const hours = postDate.getHours().toString().padStart(2, '0');
        const minutes = postDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // 1일 이상인 경우: 날짜 표시
    const day = postDate.getDate().toString().padStart(2, '0');
    const month = (postDate.getMonth() + 1).toString().padStart(2, '0');
    const year = postDate.getFullYear() % 100; // 두 자리 연도

    // 연도가 현재 연도와 다를 경우 'yy/mm/dd' 형식, 같은 연도일 경우 'mm/dd' 형식
    return (now.getFullYear() === postDate.getFullYear()) ? `${month}/${day}` : `${year}/${month}/${day}`;
};

document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const page = 1; // 요청할 페이지 번호
    const limit = 50; // 한 번에 요청할 게시물 수

    // 임의의 날짜, 추천수, 조회수를 생성하는 함수
    const generateAdditionalData = () => {
        // 현재 시간을 사용하여 날짜, 추천수, 조회수 생성
        const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();
        const randomLikes = Math.floor(Math.random() * 1000);
        const randomViews = Math.floor(Math.random() * 5000);
        return { date: formatDate(randomDate), likes: randomLikes, views: randomViews };
    };

    // 게시물을 로드하는 함수
    const loadPosts = async (page, limit) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const posts = await response.json();

            posts.forEach(post => {
                const additionalData = generateAdditionalData(); // 추가 데이터 생성
                const postElement = document.createElement('tr');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.userId}</td>
                    <td>${additionalData.date}</td>
                    <td>${additionalData.views}</td>
                    <td>${additionalData.likes}</td>
                `;
                postList.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // 초기 게시물 로드
    loadPosts(page, limit);
});
