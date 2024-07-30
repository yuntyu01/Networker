document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchCategory = document.getElementById('search-category');
    let fuse;

    const loadPosts = () => {
        fetch('/lawsupport/data', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            fuse = new Fuse(data, {
                keys: ['subject', 'content', 'id'],
                includeScore: true,
                threshold: 0.3,
            });

            displayResults(data);
        })
        .catch(error => console.error('Error fetching posts:', error));
    };

    const displayResults = (results) => {
        const postList = document.getElementById('post-list');
        postList.innerHTML = ''; // 기존 리스트 지우기
        results.forEach(post => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${post.id}</td>
                <td><a href="/lawsupport/detail/${post.id}">${post.title}</a></td>
                <td>${post.author}</td>
                <td>${post.date}</td>
                <td>${post.views}</td>
                <td>${post.recommendations}</td>
            `;
            postList.appendChild(row);
        });
    };

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            const results = fuse.search(query);
            displayResults(results.map(result => result.item));
        }
    });

    searchCategory.addEventListener('change', () => {
        const category = searchCategory.value;
        if (category === 'all') {
            fuse.setOptions({
                keys: ['subject', 'content', 'id'],
            });
        } else {
            fuse.setOptions({
                keys: [category],
            });
        }
    });

    loadPosts();
});
