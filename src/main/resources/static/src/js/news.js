document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');

    // 로그인 상태 확인 함수(로그인 여부에 따라 헤더 요소 변경)
    const checkLoginStatus = () => {
        fetch('/board', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    loginButton.style.display = 'none';
                    signupButton.style.display = 'none';
                    profileIcon.style.display = 'inline-block';
                } else {
                    loginButton.style.display = 'inline-block';
                    signupButton.style.display = 'inline-block';
                    profileIcon.style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();
});


document.addEventListener("DOMContentLoaded", function () {
    // 모든 뉴스 항목의 제목과 링크를 가져옴
    const newsItems = Array.from(document.querySelectorAll('.news-content-main, .news-content')).map(el => {
      return {
        title: el.querySelector('h2').innerText,
        url: el.querySelector('a').href
      };
    });
  
    // 로컬 스토리지에 저장
    localStorage.setItem('newsItems', JSON.stringify(newsItems));
  });
  

  const langResource = {
    ko: {
      menu_home: "홈",
      menu_news: "정보",
      menu_board: "자유게시판",
      menu_store: "스토어",
      menu_law: "법률지원",
      menu_review: "기업리뷰",
      login: "로그인",
      signup: "회원가입",
      footer_terms: "이용약관",
      footer_privacy: "개인정보처리방침",
      footer_contact: "문의/신고",
      footer_ads: "광고 안내",
      read_more: "더 읽기",
    },
    en: {
        menu_home: "Home",
        menu_news: "News",
        menu_board: "Board",
        menu_store: "Store",
        menu_law: "Legal Support",
        menu_review: "Company Reviews",
        login: "Login",
        signup: "Sign Up",
        footer_terms: "Terms of Use",
        footer_privacy: "Privacy Policy",
        footer_contact: "Contact/Report",
        footer_ads: "Advertising Info",
        read_more: "Read More",
    },
    zh: {
        menu_home: "首页",
        menu_news: "新闻",
        menu_board: "公告栏",
        menu_store: "商店",
        menu_law: "法律支援",
        menu_review: "公司评论",
        footer_terms: "使用条款",
        footer_privacy: "隐私政策",
        footer_contact: "联系/举报",
        footer_ads: "广告信息",
        read_more: "阅读更多",
    },
    ja: {
        menu_home: "ホーム",
        menu_news: "ニュース",
        menu_board: "掲示板",
        menu_store: "ストア",
        menu_law: "法律支援",
        menu_review: "企業レビュー",
        login: "ログイン",
        signup: "サインアップ",
        footer_terms: "利用規約",
        footer_privacy: "プライバシーポリシー",
        footer_contact: "お問い合わせ/報告",
        footer_ads: "広告案内",
        read_more: "続きを読む",
    },
    vi: {
        menu_home: "Trang Chủ",
        menu_news: "Tin Tức",
        menu_board: "Bảng Tin",
        menu_store: "Cửa Hàng",
        menu_law: "Hỗ Trợ Pháp Lý",
        menu_review: "Đánh Giá Công Ty",
        login: "Đăng Nhập",
        signup: "Đăng Ký",
        footer_terms: "Điều Khoản Sử Dụng",
        footer_privacy: "Chính Sách Bảo Mật",
        footer_contact: "Liên Hệ/Báo Cáo",
        footer_ads: "Thông Tin Quảng Cáo",
        read_more: "Đọc Thêm",
    },
    mn: {
        menu_home: "Нүүр",
        menu_news: "Мэдээ",
        menu_board: "Зарлалын самбар",
        menu_store: "Дэлгүүр",
        menu_law: "Хууль эрх зүйн дэмжлэг",
        menu_review: "Компанийн тойм",
        login: "Нэвтрэх",
        signup: "Бүртгүүлэх",
        footer_terms: "Ашиглах нөхцөл",
        footer_privacy: "Нууцлалын бодлого",
        footer_contact: "Холбоо барих/Мэдээлэх",
        footer_ads: "Зар сурталчилгааны мэдээлэл",
        read_more: "Цааш унших",
    },
    uk: {
        menu_home: "Головна",
        menu_news: "Новини",
        menu_board: "Дошка оголошень",
        menu_store: "Магазин",
        menu_law: "Юридична підтримка",
        menu_review: "Відгуки про компанії",
        login: "Увійти",
        signup: "Реєстрація",
        footer_terms: "Умови використання",
        footer_privacy: "Політика конфіденційності",
        footer_contact: "Контакт/Звіт",
        footer_ads: "Інформація про рекламу",
        read_more: "Читати далі",
    },
};

  window.addEventListener("load", function () {
    const selectedLang = localStorage.getItem("selectedLang") || "ko";
    document.getElementById("languageSelector").value = selectedLang;
    updateLanguage(selectedLang);
  
    document.getElementById("languageSelector").addEventListener("change", function () {
      const selectedLang = this.value;
      localStorage.setItem("selectedLang", selectedLang);
      updateLanguage(selectedLang);
    });
  });
  
  function updateLanguage(lang) {
    if (!langResource[lang]) {
      console.error(`Language resources for '${lang}' are not available.`);
      return;
    }
  
    for (let key in langResource[lang]) {
      // id 기반 요소 업데이트
      const elementById = document.getElementById(key);
      if (elementById) {
        elementById.textContent = langResource[lang][key];
      }
  
      // class 기반 요소 업데이트
      const elementsByClass = document.querySelectorAll(`.${key}`);
      elementsByClass.forEach((el) => {
        el.textContent = langResource[lang][key];
      });
  
      // placeholder 업데이트 (placeholder가 있는 요소만 선택)
      const elementsWithPlaceholder = document.querySelectorAll(`[placeholder].${key}`);
      elementsWithPlaceholder.forEach((el) => {
        el.placeholder = langResource[lang][key];
      });
    }
  }
  