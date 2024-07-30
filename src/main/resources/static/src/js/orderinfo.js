// orderinfo.js
document.addEventListener('DOMContentLoaded', function() {
    fetchOrders();
});

function fetchOrders() {
    fetch('/orderinfo')
        .then(response => response.json())
        .then(data => {
            const emptyList = document.querySelector('.empty-list');
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
                    <td>${info.productName} 외 ${info.itemCnt - 1}건</td>
                    <td>₩ ${info.totalAmount}</td>
                    <td>${info.date}</td>
                `;
                row.addEventListener('click', () => {
                    window.location.href = `/order-details.html?orderId=${info.orderId}`;
                });
                orderTableBody.appendChild(row);
            });
        })
        .catch(error => {
            emptyList.style.display = "block";
            console.error('Error fetching orders:', error)
        });
}
