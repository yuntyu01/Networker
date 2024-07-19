document.addEventListener('DOMContentLoaded', function () {
    const deleteAccountForm = document.getElementById('delete-account-form');

    deleteAccountForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const password = document.getElementById('password').value;

        const userData = {
            email: email,
            nationality: nationality,
            password: password
        };

        fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (password == userData.password) {
                alert('회원 탈퇴가 성공적으로 완료되었습니다.');
                window.location.href = 'networker.html';
            } else if (password != userData.password) {
                alert('올바른 비밀번호를 입력하세요');
            } else {
                alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('회원 탈퇴 중 오류가 발생했습니다.');
        });
    });
});
