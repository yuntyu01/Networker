document.addEventListener('DOMContentLoaded', () => {
    const nicknameForm = document.getElementById('nickname-form');
    const nicknameInput = document.getElementById('nickname');

    nicknameForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nickname = nicknameInput.value.trim();
        
        if (nickname === '') {
            alert('닉네임을 입력해주세요.');
            return;
        }

        const nicknameData = { nickname: nickname };

        fetch('/update-nickname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nicknameData),
            credentials: 'include'  // 쿠키를 포함하여 요청
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('닉네임이 성공적으로 변경되었습니다.');
                window.location.href = 'networker.html';
            } else {
                alert(data.message || '닉네임 변경에 실패했습니다. 다시 시도해주세요.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('닉네임 변경 중 오류가 발생했습니다.');
        });
    });
});
