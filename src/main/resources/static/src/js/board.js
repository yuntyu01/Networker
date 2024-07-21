document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    let page = 1;
    const limit = 10;

    // 로그인 상태 확인 함수
    const checkLoginStatus = () => {
        const authButtons = document.querySelector('.auth-buttons');
        const profileIcon = authButtons.querySelector('.profile-icon');

        const token = getCookie('authToken'); // 쿠키에서 authToken을 가져옴

        if (token) {
            // 로그인 상태(프로필 아이콘만 보임)
            authButtons.style.display = 'none';
            profileIcon.style.display = 'inline-block';
        } else {
            // 로그아웃 상태(로그인/회원가입만 보임)
            authButtons.style.display = 'inline-block';
            profileIcon.style.display = 'none';
        }
    };

    // 쿠키를 가져오는 함수
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 무한스크롤 포스트 로드
    const loadPosts = async (page, limit) => {
        // Replace this with an actual API call to fetch posts
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
        const posts = await response.json();

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <span>${new Date().toLocaleTimeString()}</span>
            `;
            postElement.addEventListener('click', () => {
                window.location.href = `post.html?postId=${post.id}`;
            });
            postList.appendChild(postElement);
        });
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            page++;
            loadPosts(page, limit);
        }
    };

    loadPosts(page, limit);
    window.addEventListener('scroll', handleScroll);
});
