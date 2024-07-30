// DB에서 데이터 가져오기
async function fetchProductData() {
    try {
        const response = await fetch('/detail'); // URL 조정 필요
        const productInfo = await response.json();
        displayInformation(productInfo);
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

// 데이터 기반 상품 목록 생성
function displayInformation(info) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // 기존 제품 목록 삭제

}


// 구매 수량 늘리기
function increaseQuantity() {
    var quantityInput = document.getElementById('quantity-input');
    var currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    updateTotalPrice();
}
// 구매 수량 줄이기
function decreaseQuantity() {
    var quantityInput = document.getElementById('quantity-input');
    var currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
    updateTotalPrice();
}

// 합계 가격 출력
function updateTotalPrice() {
    var quantityInput = document.getElementById('quantity-input').value;
    var unitPrice = 24000; // 상품 단가
    var totalPriceElement = document.querySelector('.total');
    totalPriceElement.textContent = '₩ ' + (unitPrice * quantityInput).toLocaleString();
}

// 장바구니에 추가 함수
function addToCart() {
    var productElement = button.closest('.section-product');
    var productId = productElement.getAttribute('data-id');
    var productName = productElement.getAttribute('data-name');
    var productPrice = parseInt(productElement.getAttribute('data-price'));
    var productImage = productElement.querySelector('img').src;
    var input = productElement.querySelector('.product-count');
    var productCount = parseInt(input.value);
    
    if (productCount > 0) {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        var existingItem = cartItems.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.count += productCount;
        } else {
            var cartItem = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                count: productCount
            };
            cartItems.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(productCount + '개의 상품이 장바구니에 추가되었습니다.');
        input.value = 0;
    } else {
        alert('추가할 상품 수량을 선택해주세요.');
    }
}


// 상세정보, 구매후기, 반품교환, Q&A 탭 이동
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab-content");
    var tabs = document.getElementsByClassName("tab-button");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tab-button').click(); // 기본적으로 첫 번째 탭을 열기
});
