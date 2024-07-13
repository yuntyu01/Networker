// 무한스크롤
document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    let page = 1;
    const limit = 10;

    // 더미 데이터 post 생성 및 가져오기
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
