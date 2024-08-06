async function translateContent(targetLanguage) {
    const postId = document.querySelector('#post-details').getAttribute('data-post-id');
    const subject = document.getElementById('post-subject').innerText;
    const content = document.getElementById('post-content').innerText;

    const detectLanguage = async (text) => {
        const response = await fetch('/api/translate/detect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error('Language detection request failed');
        }

        const data = await response.json();
        return data.detectedLanguage;
    };

    const translateText = async (text, fromLanguage, toLanguage) => {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text, fromLanguage: fromLanguage, toLanguage: toLanguage })
        });

        if (!response.ok) {
            throw new Error('Translation request failed');
        }

        const data = await response.json();
        return data.translatedText;
    };

    try {
        const detectedLanguage = await detectLanguage(subject + ' ' + content);
        const translatedSubject = await translateText(subject, detectedLanguage, targetLanguage);
        const translatedContent = await translateText(content, detectedLanguage, targetLanguage);

        document.getElementById('post-subject').innerText = translatedSubject;
        document.getElementById('post-content').innerText = translatedContent;
    } catch (error) {
        console.error('Error translating content:', error);
    }
}
