// script.js

// 언어 선택 드롭다운에 이벤트 리스너 추가
document.getElementById('languageSelector').addEventListener('change', function () {
    const selectedLanguage = this.value; // 선택한 언어 코드 가져오기

    // 페이지의 모든 텍스트 노드를 수집
    const textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    // 텍스트 노드에서 텍스트 추출 및 필터링 (빈 텍스트 제거)
    const textsToTranslate = textNodes.map(node => node.nodeValue).filter(text => text.trim() !== "");

    // 서버에 번역 요청 보내기
    fetch('/api/translate', {  // Java Spring의 엔드포인트 설정
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            texts: textsToTranslate, // 번역할 텍스트 배열
            language: selectedLanguage  // 목표 언어
        })
    })
    .then(response => response.json())
    .then(data => {
        const translatedTexts = data.translatedTexts;  // 서버로부터 받은 번역된 텍스트

        // 번역된 텍스트를 각 텍스트 노드에 적용
        translatedTexts.forEach((translatedText, index) => {
            textNodes[index].nodeValue = translatedText;
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('번역에 실패했습니다. 다시 시도해주세요.');
    });
});
