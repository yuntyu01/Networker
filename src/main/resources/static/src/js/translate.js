document.addEventListener("DOMContentLoaded", function () {
  const languageSelector = document.getElementById("languageSelector2");

  // 로컬 스토리지에서 선택한 언어 가져오기
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage) {
      languageSelector.value = savedLanguage; // 저장된 언어로 설정
  }

  // 언어 변경 이벤트 핸들러
  languageSelector.addEventListener("change", function () {
      const selectedLanguage = this.value;
      setLanguage(selectedLanguage); // 언어 설정 함수 호출
  });

  // 페이지 로드 시 저장된 언어로 번역 설정
  applySavedLanguage();
});

// 언어 설정 함수
function setLanguage(language) {
  const googleTranslateCombo = document.querySelector(".goog-te-combo");

  if (googleTranslateCombo) {
      googleTranslateCombo.value = language;
      googleTranslateCombo.dispatchEvent(new Event("change"));
  } else {
      console.log("Google 번역 콤보 리스트를 찾을 수 없습니다. 번역 위젯이 아직 로드되지 않았을 수 있습니다.");
  }

  // 로컬 스토리지에 선택한 언어 저장
  localStorage.setItem('selectedLanguage', language);
}

// Google 번역 초기화 함수
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
      pageLanguage: 'ko',
      autoDisplay: false // 자동 표시 비활성화
  }, 'google_translate_element');
}

// 저장된 언어 설정 적용
function applySavedLanguage() {
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage) {
      const interval = setInterval(() => {
          const googleTranslateCombo = document.querySelector(".goog-te-combo");

          if (googleTranslateCombo) {
              setLanguage(savedLanguage);
              clearInterval(interval); // 번역 설정 후 인터벌 제거
          }
      }, 100); // 100ms 간격으로 시도
  }
}



// function googleTranslateElementInit() {
//     new google.translate.TranslateElement({ pageLanguage: 'ko', autoDisplay: true }, 'google_translate_element');
//   }
  
//   document.addEventListener('DOMContentLoaded', function() {
//     const translationLinks = document.querySelector('.translation-links');
  
//     if (translationLinks) {
//       translationLinks.addEventListener('click', function(event) {
//         let el = event.target;
//         while (el.nodeName === 'FONT' || el.nodeName === 'SPAN') {
//           el = el.parentElement;
//         }
//         if (el && el.nodeName === 'A') {
//           const lang = el.getAttribute('data-lang');
//           const gtcombo = document.querySelector('.goog-te-combo');
//           if (gtcombo) {
//             gtcombo.value = lang;
//             gtcombo.dispatchEvent(new Event('change'));
//           } else {
//             alert("Error: Could not find Google translate Combolist.");
//           }
//         }
//         event.preventDefault();
//       });
//     }
//   });
  