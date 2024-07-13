document.addEventListener('DOMContentLoaded', () => {
    const profileLinks = document.querySelectorAll('.profile-link');
    profileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const url = link.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });
});
