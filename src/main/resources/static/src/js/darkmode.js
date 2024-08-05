document.addEventListener('DOMContentLoaded', () => {
    // 다크모드 초기 상태 설정
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement; // <html> 요소 선택

    // LocalStorage에서 다크모드 설정 가져오기
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        htmlElement.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', function() {
        if (darkModeToggle.checked) {
            htmlElement.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            htmlElement.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
});