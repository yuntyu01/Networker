document.addEventListener('DOMContentLoaded', () => {
    const inquiryForm = document.getElementById('inquiry-form');
    const contentInput = document.getElementById('content');
    const privacyConsentInput = document.getElementById('privacy-consent');

    inquiryForm.addEventListener('submit', (e) => {
        const content = contentInput.value.trim();
        const privacyConsent = privacyConsentInput.checked;
        
        if (content === '') {
            e.preventDefault();
            alert('문의 내용을 입력해주세요.');
            return;
        }
        
        if (!privacyConsent) {
            e.preventDefault();
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }
    });
});
