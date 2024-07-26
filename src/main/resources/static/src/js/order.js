document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.auth-buttons a[href="login.html"]');
    const signupButton = document.querySelector('.auth-buttons a[href="signup.html"]');
    const profileIcon = document.querySelector('.auth-buttons .profile-icon');

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

    // 모든 약관 동의 체크박스 기능
    const agreeAllCheckbox = document.getElementById('agree-all');
    const agreeCheckboxes = document.querySelectorAll('input[name^="agree-"]');

    agreeAllCheckbox.addEventListener('change', (e) => {
        agreeCheckboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });

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
                    <p>${item.price}원</p>
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

    // 결제하기 버튼 클릭 시 결제 정보 웹서버에 전달 -> 결제 모듈 연결 후 결제 성공 시 실행되도록 코드 수정 예정
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // 주문자 정보
        const orderInfo = {
            orderName: document.getElementById('order-name').value,
            email: document.getElementById('email').value,
            mobile: `${document.getElementById('mobile-prefix').value}-${document.getElementById('mobile-middle').value}-${document.getElementById('mobile-last').value}`,
        };
        // 배송 정보
        const shippingInfo = {
            receiver: document.getElementById('receiver').value,
            postcode: document.getElementById('postcode').value,
            address: document.getElementById('address').value,
            addressDetail: document.getElementById('address-detail').value,
            mobile: `${document.getElementById('mobile-prefix2').value}-${document.getElementById('mobile-middle2').value}-${document.getElementById('mobile-last2').value}`,
        };
        // 결제 금액 정보
        const paymentInfo = {
            totalAmount: totalAmount,
            shippingFee: shippingFee,
            finalAmount: finalAmount
        };
        
        // 최종 결제 정보 데이터
        const orderData = {
            orderInfo: orderInfo,
            shippingInfo: shippingInfo,
            cartItems: cartItems,   // 주문한 상품 정보
            paymentInfo: paymentInfo
        };

        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('결제가 성공적으로 완료되었습니다.');
                // 로컬 스토리지 장바구니 데이터 삭제
                localStorage.removeItem('cartItems');
                location.reload();
                // 결제 성공 후 주문 정보 확인 페이지(07.25.미구현상태)로 리디렉션하기
            } else {
                alert('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        });
    });
});
