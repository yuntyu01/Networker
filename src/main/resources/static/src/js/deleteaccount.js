document.addEventListener('DOMContentLoaded', function () {
    const deleteAccountForm = document.getElementById('delete-account-form');

    deleteAccountForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const password = document.getElementById('password').value;

        const userData = {
            password: password
        };

        fetch('/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'  // 쿠키를 포함하여 요청
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(errorData => {
                    throw new Error(errorData.message);
                });
            }
        })
        .then(data => {
            console.log('Response data:', data); // 디버깅을 위한 로그
            if (data.success) {
                alert(data.message);
                window.location.href = 'networker.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    });
});
