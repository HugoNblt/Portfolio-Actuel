function ContactPopup() { const popup = document.getElementById('popup'); popup.style.display = 'block'; window.onclick = function (event) { if (event.target == popup) { popup.style.display = 'none' } } }
function ClosePopup() { const popup = document.getElementById('popup'); popup.style.display = 'none' }
function CopyText() { const email = document.querySelector('.email').textContent; navigator.clipboard.writeText(email).then(() => { alert('Adresse email copiée dans le presse-papiers !') }).catch(err => { console.error('Erreur lors de la copie : ', err) }) }



const langSelect = document.getElementById('language-select');
let originalTexts = {};

// On sauvegarde les textes FR au chargement pour pouvoir y revenir
document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    originalTexts[key] = (el.tagName === 'META') ? el.getAttribute('content') : el.innerText;
});

langSelect.addEventListener('change', async (e) => {
    const lang = e.target.value;
    
    if (lang === 'fr') {
        applyTranslations(originalTexts);
        return;
    }

    try {
        const response = await fetch(`translations/${lang}.json`);
        if (!response.ok) throw new Error("Fichier de traduction introuvable");
        const translations = await response.json();
        applyTranslations(translations);
    } catch (error) {
        console.error("Erreur de traduction :", error);
    }
});

function applyTranslations(data) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
            if (el.tagName === 'META') {
                el.setAttribute('content', data[key]);
            } else {
                el.innerText = data[key];
            }
        }
    });
}