document.addEventListener('DOMContentLoaded', function() {
    let userEmail = '';
    const profileIcon = document.querySelector('.profile-icon');

    // 유저 아이디(이메일) 정보 가져오기
    const checkLoginStatus = () => {
        fetch('/board', {
            method: 'GET',
             credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    // 유저 이메일(아이디) 저장
                    userEmail = data.userEmail;

                    // 주문내역가져오기
                    fetchOrders(userEmail);
                    // 로그인 했을때
                    if (window.innerWidth > 1090) {
                        profileIcon.style.display = 'inline-block';
                    } else {
                        profileIcon.style.display = 'inline-block';
                    }                      
                }
                else {  // 비 로그인 상태
                    window.alert("로그인이 필요합니다.");
                    window.location.href = 'login.html';
                }
            })
            .catch(error => console.error('Error:', error));
    };
    // 윈도우 크기 변경 시 요소 가시성 조정
    window.addEventListener('resize', checkLoginStatus);
    
    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();
});

function fetchOrders(userEmail) {
    fetch('/orderinfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userEmail}),
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            const emptyList = document.querySelector('.empty_list_message');
            const orderTableBody = document.getElementById('orderTableBody');
            data.forEach(info => {
                // 데이터 없다는 텍스트 숨기기
                emptyList.style.display = "none";

                // 주문내역 출력
                const row = document.createElement('tr');
                row.classList.add('order-row');
                row.dataset.orderId = info.orderId; // 주문 ID를 데이터 속성으로 저장
                row.innerHTML = `
                    <td>${info.orderId}</td>
                    <td><img src="${info.image}" alt="${info.productName}" /></td>
                    <td>${info.productName} 외 ${info.count - 1}건</td>
                    <td>₩ ${info.finalAmount.slice(0, -3)}</td>
                    <td>${info.created_at.slice(0, -4)}</td>
                `;
                /* 주문 상세 정보 확인 페이지로 이동*/
                row.addEventListener('click', () => {
                    window.location.href = `/views/orderdetails.html?orderId=${info.orderId}`;
                });
                
                orderTableBody.appendChild(row);
            });
        })
        .catch(error => {
            emptyList.style.display = "block";
            console.error('Error fetching orders:', error)
        });
}



document.addEventListener('DOMContentLoaded', () => {
      
    // 헤더 로고 반응형 스타일 적용 및 드롭다운 기능 활성화
    const logo = document.querySelector('.logo');
    const menu = document.querySelector('.menu');

    logo.addEventListener('click', (event) => {
        if (window.innerWidth <= 745) {
        event.preventDefault(); // 745px 이하에서는 기본 동작 막기
        menu.classList.toggle('active');
        }
    });

    // 윈도우 크기 변경 시 메뉴 상태 초기화
    window.addEventListener('resize', () => {
        if ( window.innerWidth > 745 ) {
            menu.classList.remove('active');
        }
    });

});
