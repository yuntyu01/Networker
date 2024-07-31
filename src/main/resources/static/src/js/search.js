document.addEventListener('DOMContentLoaded', () => {
    // HTML 요소에 대한 참조 가져오기
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchCategory = document.getElementById('search-category');
    let fuse; // Fuse 검색 인스턴스를 저장할 변수 초기화

    // 서버에서 게시물 로드
    const loadPosts = () => {
        fetch('/lawsupport/data', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                // 검색 옵션을 사용하여 새로운 Fuse 인스턴스 생성
                fuse = new Fuse(data, {
                    keys: ['subject', 'content', 'id'], // id가 작성자 아이디가 아닌 게시글 id라 수정 해야함
                    includeScore: true, // 랭킹을 위해 검색 점수 포함
                    threshold: 0.3, // 검색 임계값 설정 (필요에 따라 조정)
                });

                displayResults(data); // 초기 검색 결과 표시
            })
            .catch(error => console.error('게시물 가져오기 오류:', error));
    };

    // UI에서 검색 결과 표시
    const displayResults = (results) => {
        const postList = document.getElementById('post-list');
        postList.innerHTML = ''; // 기존 목록 지우기

        results.forEach(post => {
            // 각 게시물에 대한 테이블 행 생성
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

    // 검색 버튼 클릭 처리
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            const results = fuse.search(query);
            displayResults(results.map(result => result.item));
        }
    });

    // 카테고리 선택 변경 처리
    searchCategory.addEventListener('change', () => {
        const category = searchCategory.value;
        let keys = ['subject', 'content']; // 기본적으로 제목+내용+ID로 설정

        if (category === 'subject') {
            keys = ['subject']; // 제목에서만 검색
        } else if (category === 'content') {
            keys = ['content']; // 내용에서만 검색
        } else if (category === 'author') {
            keys = ['id']; // 작성자(게시글 ID)에서만 검색
        }

        fuse.setCollection([]); // fuse.js 5.x 버전에서는 필요 없음 (fuse.js 4.x에서는 필요)
        fuse.setKeys(keys); // 선택한 카테고리에 맞춰 검색 키 설정
    });

    loadPosts(); // 초기 데이터 로드
});
