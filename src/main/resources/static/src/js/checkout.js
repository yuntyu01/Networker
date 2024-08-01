main();

async function main() {
    // 필요한 정보들(유저 고유번호, 주문번호, 결제금액, 이메일, 주문자명, 휴대폰 번호, 구매 상품 갯수)
    let userId, orderId, Amount, userEmail, userName, phoneNumber, count;

    // db에서 결제 정보 데이터 가져오기
    fetch('/payinfo', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        userId = data.userId
        orderId = data.orderId;
        Amount = data.finalAmount;
        userEmail = data.userEmail;
        userName = data.orderName;
        phoneNumber = data.mobile;
        count = data.count
    })
    .catch(error => console.error('Error:', error));

    const checkLoginStatus = () => {
        fetch('/board', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (!data.loggedIn) {
                    // 비 로그인 상태
                    window.alert("로그인이 필요합니다.");
                    window.location.href = 'login.html';
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();



    const button = document.getElementById("payment-request-button");
    // ------  결제위젯 초기화 ------
    const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
    const tossPayments = TossPayments(clientKey);
    // 회원 결제
    const customerKey = userId;     // 테스트 키 "k4PTvGldYG6jghqXE2T-E";
    const widgets = tossPayments.widgets({
        customerKey,
    });

  // ------ 주문의 결제 금액 설정 ------
    await widgets.setAmount({
        currency: "KRW",
        value: Amount,
    });

    await Promise.all([
    // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
        selector: "#payment-method",
        variantKey: "DEFAULT",
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
        }),
    ]);

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    button.addEventListener("click", async function () {
        await widgets.requestPayment({
        orderId: orderId,
        orderName: `네트워커 스토어 ${count}개 상품`,
        successUrl: window.location.origin + "/views/success.html",
        failUrl: window.location.origin + "/views/fail.html",
        customerEmail: userEmail,
        customerName: userName,
        customerMobilePhone: phoneNumber,
        });
    });
}
