document.addEventListener("DOMContentLoaded", () => {
  // 정보글 DB에서 가져오기
  fetch("/infolist")
    .then((response) => response.json())
    .then((data) => {
      displayInfos(data);
    })
    .catch((error) => {
      console.error("정보글 불러오기 오류:", error);
      boardContent.innerHTML = "<li>정보글 정보를 불러올 수 없습니다.</li>";
    });
});

// 정보글 요소 추가하기
function displayInfos(infolist) {
  const infoItems = document.querySelector(".content");
  infoItems.innerHTML = ""; // 남아있는 데이터 지우기

  infolist.forEach((info) => {
    //<div class='news-item'> newsItem </> 추가
    const newsItem = document.createElement("div");
    newsItem.className = "news-item";

    newsItem.innerHTML = `
          <a href="${info.url}" target="_blank"><img src="${info.image}" alt="Worker Image"/></a>
          <div class="news-content">
            <h2>${info.title}</h2>
            <p>${info.content}</p>
            <a href="${info.url}" class="read_more">더 읽기</a>
          </div>
      `;

    infoItems.appendChild(newsItem);
  });
}

/* // 로컬스토리지에 모든 정보글을 저장하는 함수 웹서버 연결 테스트 후 삭제 예정
document.addEventListener("DOMContentLoaded", function () {
  // 모든 뉴스 항목의 제목과 링크를 가져옴
  const newsItems = Array.from(
    document.querySelectorAll(".news-content-main, .news-content")
  ).map((el) => {
    return {
      title: el.querySelector("h2").innerText,
      url: el.querySelector("a").href,
    };
  });

  // 로컬 스토리지에 저장
  localStorage.setItem("newsItems", JSON.stringify(newsItems));
});
*/

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

  document
    .getElementById("languageSelector")
    .addEventListener("change", function () {
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
    const elementsWithPlaceholder = document.querySelectorAll(
      `[placeholder].${key}`
    );
    elementsWithPlaceholder.forEach((el) => {
      el.placeholder = langResource[lang][key];
    });
  }
}
