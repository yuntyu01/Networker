document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.auth-buttons a[href="login.html"]');
    const signupButton = document.querySelector('.auth-buttons a[href="signup.html"]');
    const profileIcon = document.querySelector('.auth-buttons .profile-icon');

    // 로그인 상태 확인 함수(로그인 여부에 따라 헤더 요소 변경)

    let userEmail = '';

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
                    // 유저 이메일(아이디) 저장
                    userEmail = data.userEmail;
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

    // 로컬스토리지에서 cartItems 불러와서 주문상품 정보 추가
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const orderProductsContainer = document.querySelector('.order-products');
    let productsHTML = '';

    cartItems.forEach(item => {
        productsHTML += `
            <div class="product-info">
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="product-details">
                    <p>${item.name}</p>
                    <p>수량: ${item.count}개</p>
                    <p>${item.price*item.count}원</p>
                </div>
            </div>
        `;
    });

    orderProductsContainer.innerHTML = productsHTML;

    // 주문상품의 금액을 cartItems의 가격 정보를 바탕으로 계산
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.count), 0);
    const shippingFee = 4000; // 배송비
    const finalAmount = totalAmount + shippingFee;

    document.getElementById('total-amount').textContent = `${totalAmount} 원`;
    document.getElementById('shipping-fee').textContent = `+ ${shippingFee} 원`;
    document.getElementById('final-amount').textContent = `${finalAmount} 원`;

    /*
    const paymentInfoSection = document.querySelector('.payment-info-section');    
    paymentInfoSection.innerHTML = `
        <h3>결제정보</h3>
        <div class="payment-info">
            <p>주문상품: <span>${totalAmount}원</span></p>
            <p>배송비: <span>+${shippingFee}원</span></p>
            <h4>최종 결제 금액: <span>${finalAmount}원</span></h4>
        </div>
    `;
    */


});
