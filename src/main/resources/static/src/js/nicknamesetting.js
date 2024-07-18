document.addEventListener('DOMContentLoaded', () => {
    const nicknameForm = document.getElementById('nickname-form');
    const nicknameInput = document.getElementById('nickname');

    nicknameForm.addEventListener('submit', (e) => {
        const nickname = nicknameInput.value.trim();
        
        if (nickname === '') {
            e.preventDefault();
            alert('닉네임을 입력해주세요.');
        }
    });
});
