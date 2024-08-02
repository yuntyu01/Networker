document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');

    // 로그인 상태 확인 함수(로그인 여부에 따라 헤더 요소 변경)
    const checkLoginStatus = () => {
        fetch('/board', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    loginButton.style.display = 'none';
                    signupButton.style.display = 'none';
                    profileIcon.style.display = 'inline-block';
                } else {
                    loginButton.style.display = 'inline-block';
                    signupButton.style.display = 'inline-block';
                    profileIcon.style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();
});

// 검색어로 상품 필터링 함수
function filterProducts() {
    const searchInput = document.querySelector('.search-text').value.toLowerCase();
    const reviewContainer = document.querySelector('.content');
    const reviews = Array.from(reviewContainer.getElementsByClassName('review-item'));

    reviews.forEach(review => {
        // 'item-name' 클래스의 첫 번째 요소의 텍스트를 가져옴
        const companyNameElement = review.getElementsByClassName('item-name')[0];
        if (companyNameElement) {
            const companyName = companyNameElement.textContent.toLowerCase();
            if (companyName.includes(searchInput) || searchInput === '') {
                review.style.display = 'flex';
            } else {
                review.style.display = 'none';
            }
        }
    });
}
