main();

async function main() {
    // 필요한 정보들(주문번호, 결제금액, 이메일, 주문자명, 휴대폰 번호)
    let orderId ='';
    let Amount = 0;
    let userEmail = '';
    let userName = '';
    let phoneNumber = '';

    // db에서 결제 정보 데이터 가져오기
    fetch('/payinfo', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        orderId = data.orderInfo.orderId;
        Amount = data.paymentInfo.finalAmount;
        userEmail = data.orderInfo.userId;
        userName = data.orderInfo.orderName;
        phoneNumber = data.orderInfo.mobile;
    })
    .catch(error => console.error('Error:', error));



    const button = document.getElementById("payment-request-button");
    // ------  결제위젯 초기화 ------
    const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
    const tossPayments = TossPayments(clientKey);
    // 회원 결제
    const customerKey = "k4PTvGldYG6jghqXE2T-E";
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
        orderName: "네트워커 스토어",
        successUrl: window.location.origin + "/views/success.html",
        failUrl: window.location.origin + "/views/fail.html",
        customerEmail: userEmail,
        customerName: userName,
        customerMobilePhone: phoneNumber,
        });
    });
}
