//отзывы
document.addEventListener('DOMContentLoaded', function () {
    const reviewContainer = document.querySelector('.review-container');
    const reviewWrapper = document.querySelector('.review-wrapper');
    const reviews = document.querySelectorAll('.review');
    const indicatorsContainer = document.querySelector('.indicators');
    let currentIndex = 0;
    const reviewCount = reviews.length;
    const reviewWidth = reviews[0].offsetWidth;
    let isTransitioning = false;

    //точки снизу
    for (let i = 0; i < reviewCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.dataset.index = i;
        indicator.addEventListener('click', goToReview);
        indicatorsContainer.appendChild(indicator);
    }

    const indicators = document.querySelectorAll('.indicator');
    indicators[0].classList.add('active');

    function updateIndicators() {
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[currentIndex].classList.add('active');
    }

    function goToReview(event) {
        if (isTransitioning) return;
        const index = parseInt(event.target.dataset.index);
        currentIndex = index;
        updateCarousel();
        updateIndicators();
    }

    function updateCarousel() {
        isTransitioning = true;
        const translateX = -currentIndex * reviewWidth;
        reviewWrapper.style.transform = `translateX(${translateX}px)`;
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function nextReview() {
        if (isTransitioning) return;
        currentIndex = (currentIndex + 1) % reviewCount;
        updateCarousel();
        updateIndicators();
    }

    function prevReview() {
        if (isTransitioning) return;
        currentIndex = (currentIndex - 1 + reviewCount) % reviewCount;
        updateCarousel();
        updateIndicators();
    }

    //вопросы   
    reviewContainer.addEventListener('click', (event) => {
        const containerWidth = reviewContainer.offsetWidth;
        const clickX = event.clientX - reviewContainer.getBoundingClientRect().left;

        if (clickX < containerWidth / 2) {
            prevReview();
        } else {
            nextReview();
        }
    });

    const faqContainer = document.querySelector('.faq__container');
    const faqWrapper = document.querySelector('.faq__wrapper');
    const faqItems = document.querySelectorAll('.faq__item');
    let faqCurrentIndex = 0;
    const faqCount = faqItems.length;
    const faqWidth = faqContainer.offsetWidth;

    function faqUpdateCarousel() {
        const translateX = -faqCurrentIndex * faqWidth;
        faqWrapper.style.transform = `translateX(${translateX}px)`;
    }

    faqContainer.addEventListener('click', (event) => {
        const containerWidth = faqContainer.offsetWidth;
        const clickX = event.clientX - faqContainer.getBoundingClientRect().left;

        if (clickX < containerWidth / 2) {
            faqPrevFaq();
        } else {
            faqNextFaq();
        }
    });

    function faqNextFaq() {
        faqCurrentIndex = (faqCurrentIndex + 1) % faqCount;
        faqUpdateCarousel();
    }

    function faqPrevFaq() {
        faqCurrentIndex = (faqCurrentIndex - 1 + faqCount) % faqCount;
        faqUpdateCarousel();
    }
});

const settingsOptionsButton = document.getElementById('settingsButton');
const settingsWindowOverlay = document.getElementById('settingsOverlay');
const settingsCloseButton = document.getElementById('closeSettings');

settingsOptionsButton.addEventListener('click', function () {
    settingsWindowOverlay.style.display = 'flex';
});

settingsCloseButton.addEventListener('click', function () {
    settingsWindowOverlay.style.display = 'none';
});

// Окно настроек 
const settingsButton = document.getElementById('settingsButton');
const settingsOverlay = document.getElementById('settingsOverlay');
const closeSettingsButton = document.getElementById('closeSettings');
const themeSelect = document.getElementById('themeSelect');
const languageSelect = document.getElementById('languageSelect');
const body = document.body;
const sections = document.querySelectorAll('.main__section, .main__section__courses');

// Смены темы
function setTheme(theme) {
    const settingsPanel = document.querySelector('.settings-panel');

    if (theme === 'dark') {
        body.classList.add('dark-theme');
        sections.forEach(section => section.classList.add('dark-theme'));
        settingsPanel.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
        sections.forEach(section => section.classList.remove('dark-theme'));
        settingsPanel.classList.remove('dark-theme');
    }
}

// Смена языка
function setLanguage(language) {
    fetch(`js/${language}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.dataset.translate;
                element.textContent = data[key];
            });
        })
        .catch(error => console.error('Ошибка загрузки перевода:', error));
}

let savedTheme = localStorage.getItem('theme');
let savedLanguage = localStorage.getItem('language');

// Сохранение настроек
if (savedTheme) {
    themeSelect.value = savedTheme;
    setTheme(savedTheme);
}

if (savedLanguage) {
    languageSelect.value = savedLanguage;
    setLanguage(savedLanguage);
}

// Обработка событий 
settingsButton.addEventListener('click', function () {
    settingsOverlay.style.display = 'flex';
});

closeSettingsButton.addEventListener('click', function () {
    settingsOverlay.style.display = 'none';
});

settingsOverlay.addEventListener('click', function (event) {
    if (event.target === settingsOverlay) {
        settingsOverlay.style.display = 'none';
    }
});

// Обработка изменения настроек
themeSelect.addEventListener('change', function () {
    let selectedTheme = themeSelect.value;
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
});

languageSelect.addEventListener('change', function () {
    let selectedLanguage = languageSelect.value;
    setLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
});

// Загрузчик
window.onload = function() {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    setTimeout(function() {
        preloader.style.display = 'none';
        if (content) {
          content.style.display = 'block';
        }
    }, 700); 
};