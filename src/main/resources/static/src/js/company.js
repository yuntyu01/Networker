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
    
    const reviewsContainer = document.getElementById('reviews-container');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const averageRatingElement = document.getElementById('average-rating');
    const latestReviewTextElement = document.querySelector('.latest-review-text');

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = '<p>아직 작성된 리뷰가 없습니다.</p>';
        averageRatingElement.innerHTML = '☆☆☆☆☆ (0.0)';
        latestReviewTextElement.innerHTML = '리뷰 없음';
    } else {
        let totalRating = 0;
        reviews.forEach(review => {
            totalRating += parseInt(review.rating);
        });

        const averageRating = (totalRating / reviews.length).toFixed(1);
        const fullStars = '★'.repeat(Math.floor(averageRating));
        const halfStar = averageRating % 1 !== 0 ? '☆' : '';
        const emptyStars = '☆'.repeat(5 - Math.ceil(averageRating));

        averageRatingElement.innerHTML = `${fullStars}${halfStar}${emptyStars} (${averageRating})`;

        const latestReview = reviews[reviews.length - 1];
        latestReviewTextElement.innerHTML = `"${latestReview.headline}"`;
    }
});
