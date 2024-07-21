document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const pagination = document.getElementById('pagination');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    let currentPage = 1;
    const limit = 20;

    // 게시글 로드 함수(한 페이지에 게시글 20개씩)
    const loadPosts = async (page, limit, query = '') => {
        // Replace this with an actual API call to fetch posts
        const response = await fetch(`https://your-web-server-url/posts?_page=${page}&_limit=${limit}&q=${query}`);
        const posts = await response.json();
        const totalPosts = parseInt(response.headers.get('X-Total-Count'), 10);
        const totalPages = Math.ceil(totalPosts / limit);

        postList.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('tr');
            postElement.innerHTML = `
                <td>${(page - 1) * limit + index + 1}</td>
                <td><a href="post.html?postId=${post.id}">${post.title}</a></td>
                <td>${new Date(post.createdAt).toLocaleDateString()}</td>
                <td>${post.author}</td>
                <td>${post.views}</td>
            `;
            postList.appendChild(postElement);
        });

        createPaginationButtons(totalPages);
    };

    // 페이지네이션 버튼 생성 함수
    const createPaginationButtons = (totalPages) => {
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('page-button');
            if (i === currentPage) {
                button.classList.add('active');
            }

            button.addEventListener('click', () => {
                currentPage = i;
                loadPosts(currentPage, limit, searchInput.value);
            });

            pagination.appendChild(button);
        }
    };

    // 검색 버튼 클릭 이벤트
    searchButton.addEventListener('click', () => {
        loadPosts(1, limit, searchInput.value);
    });

    // 초기 게시글 및 페이지네이션 로드
    const initBoard = async () => {
        loadPosts(currentPage, limit);
    };

    initBoard();
});
