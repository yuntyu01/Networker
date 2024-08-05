document.addEventListener('DOMContentLoaded', async () => {
    // 로그인, 회원가입, 프로필 아이콘 요소를 선택합니다.
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');
    const editButtonForm = document.querySelector('#edit-button-form');
    const deleteButtonForm = document.querySelector('#delete-button-form');

    // 로그인 상태 및 작성자를 확인하는 함수 정의
    const checkStatus = () => {
        // 서버에 로그인 상태를 확인하기 위한 GET 요청을 보냅니다.
        fetch('/board', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(async data => {
            if (data.loggedIn) {
                // 로그인 상태인 경우
                loginButton.style.display = 'none';
                signupButton.style.display = 'none';
                profileIcon.style.display = 'inline-block';

                const postUserId = document.querySelector('.postuserId').textContent;
                const userId = data.userEmail;

                if (postUserId === userId) {
                    // 로그인된 사용자와 작성자가 동일한 경우
                    editButtonForm.style.display = 'inline-block';
                    deleteButtonForm.style.display = 'inline-block';
                } else {
                    // 로그인된 사용자와 작성자가 다른 경우
                    editButtonForm.style.display = 'none';
                    deleteButtonForm.style.display = 'none';
                }
            } else {
                // 로그아웃 상태인 경우
                loginButton.style.display = 'inline-block';
                signupButton.style.display = 'inline-block';
                profileIcon.style.display = 'none';

                // 로그아웃 상태에서 버튼을 숨깁니다.
                editButtonForm.style.display = 'none';
                deleteButtonForm.style.display = 'none';
            }
        })
        .catch(error => console.error('Error:', error));
    };

    // DOMContentLoaded 이벤트가 발생하면 로그인 상태를 확인하는 함수 호출
    checkStatus();
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
      content: "내용",
      title: "제목",
      footer_terms: "이용약관",
      footer_privacy: "개인정보처리방침",
      footer_contact: "문의/신고",
      footer_ads: "광고 안내",
      post_button: "등록",
      cancel_button: "취소",
      image_upload: "사진 첨부",
      image_upload_note: "(사진 첨부는 최대 5MB)",
      write_post: "글쓰기",
    },
    en: {
      menu_home: "Home",
      menu_news: "News",
      menu_board: "Community Board",
      menu_store: "Store",
      menu_law: "Legal Support",
      menu_review: "Business Review",
      login: "Login",
      signup: "Sign Up",
      content: "Content",
      title: "Title",
      footer_terms: "Terms of Use",
      footer_privacy: "Privacy Policy",
      footer_contact: "Contact/Report",
      footer_ads: "Advertising Info",
      post_button: "Post",
      cancel_button: "Cancel",
      image_upload: "Attach Photo",
      image_upload_note: "(Photo attachment is up to 5MB)",
      write_post: "Write Post",
    },
    zh: {
      menu_home: "首页",
      menu_news: "信息",
      menu_board: "自由论坛",
      menu_store: "商店",
      menu_law: "法律支持",
      menu_review: "企业评论",
      login: "登录",
      signup: "注册",
      content: "内容",
      title: "标题",
      footer_terms: "使用条款",
      footer_privacy: "隐私政策",
      footer_contact: "咨询/举报",
      footer_ads: "广告信息",
      post_button: "发布",
      cancel_button: "取消",
      image_upload: "附加照片",
      image_upload_note: "(附加照片最大5MB)",
      write_post: "写文章",
    },
    ja: {
      menu_home: "ホーム",
      menu_news: "情報",
      menu_board: "掲示板",
      menu_store: "ストア",
      menu_law: "法律サポート",
      menu_review: "企業レビュー",
      login: "ログイン",
      signup: "会員登録",
      content: "内容",
      title: "タイトル",
      footer_terms: "利用規約",
      footer_privacy: "プライバシーポリシー",
      footer_contact: "お問い合わせ/報告",
      footer_ads: "広告案内",
      post_button: "投稿",
      cancel_button: "キャンセル",
      image_upload: "写真添付",
      image_upload_note: "（写真の添付は最大5MB）",
      write_post: "投稿を書く",
    },
    vi: {
      menu_home: "Trang Chủ",
      menu_news: "Tin Tức",
      menu_board: "Diễn Đàn",
      menu_store: "Cửa Hàng",
      menu_law: "Hỗ Trợ Pháp Lý",
      menu_review: "Đánh Giá Doanh Nghiệp",
      login: "Đăng Nhập",
      signup: "Đăng Ký",
      content: "Nội Dung",
      title: "Tiêu Đề",
      footer_terms: "Điều Khoản Sử Dụng",
      footer_privacy: "Chính Sách Bảo Mật",
      footer_contact: "Liên Hệ/Báo Cáo",
      footer_ads: "Thông Tin Quảng Cáo",
      post_button: "Đăng",
      cancel_button: "Hủy",
      image_upload: "Đính Kèm Ảnh",
      image_upload_note: "(Ảnh đính kèm tối đa 5MB)",
      write_post: "Viết Bài",
    },
    mn: {
      menu_home: "Эхлэл",
      menu_news: "Мэдээлэл",
      menu_board: "Чөлөөт Самбар",
      menu_store: "Дэлгүүр",
      menu_law: "Хууль Зүйн Дэмжлэг",
      menu_review: "Бизнесийн Шүүмж",
      login: "Нэвтрэх",
      signup: "Бүртгүүлэх",
      content: "Агуулга",
      title: "Гарчиг",
      footer_terms: "Ашиглалтын Нөхцөл",
      footer_privacy: "Хувийн Нууцлалын Бодлого",
      footer_contact: "Холбоо Барих/Мэдэгдэх",
      footer_ads: "Зар Сурталчилгааны Мэдээлэл",
      post_button: "Нийтлэх",
      cancel_button: "Цуцлах",
      image_upload: "Зураг Хавсаргах",
      image_upload_note: "(Зураг хавсралт нь 5MB хүртэл)",
      write_post: "Бичлэг Бичих",
    },
    uk: {
      menu_home: "Головна",
      menu_news: "Новини",
      menu_board: "Дошка Оголошень",
      menu_store: "Магазин",
      menu_law: "Юридична Підтримка",
      menu_review: "Відгук про Бізнес",
      login: "Увійти",
      signup: "Зареєструватися",
      content: "Зміст",
      title: "Заголовок",
      footer_terms: "Умови Використання",
      footer_privacy: "Політика Конфіденційності",
      footer_contact: "Контакт/Скарга",
      footer_ads: "Інформація про Рекламу",
      post_button: "Опублікувати",
      cancel_button: "Скасувати",
      image_upload: "Додати Фото",
      image_upload_note: "(Додаток до фото до 5MB)",
      write_post: "Написати Повідомлення",
    }
  };
  