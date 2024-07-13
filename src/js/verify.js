document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('verification-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const registrationNumber = document.getElementById('registration-number').value;
        const birthdate = document.getElementById('birthdate').value;

        const response = await fetch('https://api.codef.io/v1/your-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY',
            },
            body: JSON.stringify({
                registration_number: registrationNumber,
                birthdate: birthdate,
            }),
        });

        const data = await response.json();
        
        if (data.success) {
            resultDiv.textContent = '인증 성공: 유효한 외국인 등록증입니다.';
        } else {
            resultDiv.textContent = `인증 실패: ${data.message}`;
        }
    });
});
