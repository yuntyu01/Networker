document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language');
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');

    const translations = {
        ko: {
            login_title: "로그인",
            useremail_label: "사용자 이메일",
            password_label: "비밀번호",
            login_button: "로그인",
            register_link: "회원가입",
            welcome_message: "함께하는 한국생활, Networker",
            description: "Networker와 함께 여러분이 원하는 한국생활을 만들어보세요.",
            select_language: "언어 선택:"
        },
        en: {
            login_title: "Login",
            useremail_label: "UserEmail",
            password_label: "Password",
            login_button: "Login",
            register_link: "Register",
            welcome_message: "Join the Korea Life with Networker",
            description: "Create the Korea life you want with Networker.",
            select_language: "Select Language:"
        },
        zh: {
            login_title: "登录",
            useremail_label: "电子邮件",
            password_label: "密码",
            login_button: "登录",
            register_link: "注册",
            welcome_message: "与 Networker 一起体验韓國生活",
            description: "和Networker一起创造大家喜欢的韩国生活吧。",
            select_language: "选择语言:"
        },
        ja: {
            login_title: "ログイン",
            useremail_label: "ユーザーメール",
            password_label: "パスワード",
            login_button: "ログイン",
            register_link: "登録",
            welcome_message: "Networker と韓国生活を楽しもう",
            description: "Networkerと一緒に皆さんが望む韓国生活を作ってみてください。",
            select_language: "言語を選択:"
        }
    };

    const translatePage = (language) => {
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
    };

    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        translatePage(selectedLanguage);
    });

    // Set initial language based on the browser's language or default to Korean
    const browserLanguage = navigator.language.slice(0, 2);
    const initialLanguage = ['ko', 'en', 'zh', 'ja'].includes(browserLanguage) ? browserLanguage : 'ko';
    languageSelect.value = initialLanguage;
    translatePage(initialLanguage);
});
