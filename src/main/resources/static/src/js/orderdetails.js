document.addEventListener('DOMContentLoaded', function() {
    //url에서 orderId 가져오기
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');

    // 유저 아이디(이메일) 정보 가져오기
    const checkLoginStatus = () => {
        fetch('/board', {
            method: 'GET',
             credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    // 주문/결제 상세 내역가져오기
                    fetchOrderDetails(orderId);
                }
                else {  // 비 로그인 상태
                    window.alert("로그인이 필요합니다.");
                    window.location.href = 'login.html';
                }
            })
            .catch(error => console.error('Error:', error));
    };
        
    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

});

function fetchOrderDetails(orderId) {
    // orderId를 기반으로 주문/결제 정보 POST 요청하기
    fetch('/orderdetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId }),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');

        // 주문 번호
        document.getElementById("orderId").innerText = `${orderId}`;
        // 주문 일시
        document.getElementById("orderDate").innerText = `${data[0].created_at.slice(0, -4)}`;

        data.forEach(product => {
            // 주문/결제 상세 정보 화면 요소 추가
            const row = document.createElement('tr');
            row.classList.add('product-row');
            row.innerHTML = `
                <td><img src="${product.image}" alt="${product.productName}" /></td>
                <td>${product.productName}</td>
                <td>₩ ${product.price}</td>
                <td>${product.count}</td>
            `
            productList.appendChild(row);
        });

        // 총 상품 금액
        document.querySelector(".summary-amount").innerText = `₩ ${Number(data[0].finalAmount)-4000}`;

        // 총 결제 금액
        document.querySelector(".total-payment").innerText = `₩ ${data[0].finalAmount.slice(0, -3)}`;
    })
    .catch(error => {
        console.error('Error fetching order details:', error);
        alert('주문 상세 정보를 불러오는데 오류가 발생했습니다.');
    });
}
