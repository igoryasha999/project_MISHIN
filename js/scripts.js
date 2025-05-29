'use strict'

// Предварительная конфигурация и переменные, которые должны быть определены до основного кода

// Пример: Объявление глобальных переменных, если они нужны для нескольких блоков кода
// let глобальнаяПеременная = null;

// Пример: Функции-утилиты, которые могут быть полезны в разных частях скрипта
// function какаяТоФункция(параметр) {
//   // ... код функции ...
// }

// Здесь можно добавить проверку, есть ли поддержка localStorage, или другие подготовительные шаги
// if (!localStorage) {
//   console.error('Ваш браузер не поддерживает localStorage!');
// }

// Пример:  Предзагрузка данных, если это необходимо
// async function loadData() {
//   try {
//     const response = await fetch('data.json');
//     const data = await response.json();
//     // Обработка предзагруженных данных
//     console.log('Предзагруженные данные:', data);
//     // ...
//   } catch (error) {
//     console.error('Ошибка при предзагрузке данных:', error);
//   }
// }

// loadData(); // Запуск предзагрузки (если нужно)

document.addEventListener('DOMContentLoaded', () => {

    /* Функция для работы со скроллом */
    const scrollToogleClass = (elem, heightElem, classElem) => {
        document.addEventListener('scroll', () => {         // навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку

            console.log('Страница скролится');

            let scrollPageY = this.scrollY;                 // получаем значение насколько прокрутили страницу

            if (scrollPageY > heightElem) {                 // условие: если расстояние от верха страницы больше высоты элемента
                elem.classList.add(classElem)               // устанавливаем класс модификатора на элемент
            } else {
                elem.classList.remove(classElem)            // удаляем класс модификатора у элемента
            }

        })
    }

    /* 1. Исключение накладывания контента на хедер при скроле/прокрутке страницы */

    const header = document.querySelector('.header');       // создаем переменную находя блок по классу

    if (header) {                                           // проверяем существование элемента в DOM
        console.log('Константа header существует');

        const heightHeader = header.offsetHeight;           // определяем высоту блока, включая внутренние отступы

        // Блок-схема (текстовое представление):
        /*
        Начало
        Получить элемент header
        Проверка: header существует?
          Да:
            Получить heightHeader
            Вызвать scrollToogleClass(header, heightHeader, 'header--scroll')
          Нет:
            Конец
        Конец
        */

        scrollToogleClass(header, heightHeader, 'header--scroll');
    }

    /* 2. Динамический вывод карточек тегов. Часть 1 (Используем массив с данными) */
    /* Лекция 6 */
    const cardsContainer = document.querySelector('#cards');
    if (cardsContainer) {
        const cardList = cardsContainer.querySelector('.card__list');

        // Пример URL для получения данных с сервера
        const apiUrl = 'data.json';

        const createCard = (linkUrl, iconUrl, iconAlt, iconWidth, iconHeight, title, description) => {
            const card = `
                <a class="card__item" href="${linkUrl}">
                    <span class="card__icon">
                        <img src="" alt="${iconAlt}" width="${iconWidth}" height="${iconHeight}">
                    </span>
                    <h3 class="card__title">${title}</h3>
                    <p class="card__description">${description}</p>
                </a>
            `;

            return card;
        }

        // Блок-схема (текстовое представление):
        /*
        Начало
        Получить контейнер карточек (#cards)
        Проверка: cardsContainer существует?
          Да:
            Получить cardList (.card__list)
            Определить apiUrl ('data.json')
            Определить createCard()
            Вызвать fetch(apiUrl)
              При успешном ответе:
                Преобразовать ответ в JSON
                Для каждого элемента в data
                  cardElement = createCard(...)
                  cardList.insertAdjacentHTML(...)
                Конец цикла
              При ошибке:
                Вывести сообщение об ошибке
          Нет:
            Конец
        Конец
        */

        // Загрузка данных с сервера
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(typeof (data));

                data.forEach(item => {
                    const cardElement = createCard(item.link, item.icon, item.iconAlt, item.iconWidth, item.iconHeight, item.title, item.description);
                    cardList.insertAdjacentHTML('beforeend', cardElement);
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }

    /* 3. Клик на добавление рецепта в избранное */

    const favoriteBlock = document.querySelector('.recipe__indicators-favourites');

    if (favoriteBlock) {
        console.log('Константа favoriteBlock существует');

        const favoriteButton = favoriteBlock.querySelector('.recipe__indicators-button');
        const favoriteCount = favoriteBlock.querySelector('.recipe__indicators-count');

        let isFavorite = false; // Состояние избранного
        let count = parseInt(favoriteCount.textContent); // Начальное значение счетчика с приведением строки к числу

        // Обработчик клика на иконку
        // Блок-схема (текстовое представление):
        /*
        Начало
        Получить блок избранного (.recipe__indicators-favourites)
        Проверка: favoriteBlock существует?
          Да:
            Получить favoriteButton и favoriteCount
            Инициализировать isFavorite = false и count
            Навесить слушатель click на favoriteButton
              При клике:
                Инвертировать isFavorite
                Проверка: isFavorite?
                  Да:
                    Увеличить count и добавить класс к иконке
                  Нет:
                    Уменьшить count и удалить класс у иконки
                Обновить текст favoriteCount
          Нет:
            Конец
        Конец
        */
        favoriteButton.addEventListener('click', () => {
            isFavorite = !isFavorite; // Меняем состояние

            if (isFavorite) {
                count += 1; // Увеличиваем счетчик
                favoriteButton.children[0].classList.add('recipe__indicators-image--active'); // Делаем иконку красной
            } else {
                count -= 1; // Уменьшаем счетчик
                favoriteButton.children[0].classList.remove('recipe__indicators-image--active'); // Возвращаем иконку в серый цвет
            }

            favoriteCount.textContent = count; // Обновляем счетчик
        });
    }

    /* 4. Подбор тегов в поисковой строке при вводе */
    const searchBlock = document.querySelector('.search');

    if (searchBlock) {
        const searchFormField = searchBlock.querySelector('.search__form-name');
        const tags = searchBlock.querySelectorAll('.search__tag-item'); // Получаем все теги

        // Функция для фильтрации тегов
        const filterTags = () => {
            const searchText = searchFormField.value.toLowerCase(); // Получаем текст из поисковой строки

            tags.forEach(tag => {
                const tagText = tag.textContent.toLowerCase(); // Получаем текст тега
                if (tagText.includes(searchText)) {
                    tag.classList.remove('search__tag-item--hidden'); // Показываем тег
                } else {
                    tag.classList.add('search__tag-item--hidden'); // Скрываем тег
                }
            });
        }

        // Блок-схема (текстовое представление):
        /*
        Начало
        Получить блок поиска (.search)
        Проверка: searchBlock существует?
          Да:
            Получить searchFormField и все tags
            Определить filterTags()
              Получить searchText из searchFormField (toLowerCase)
              Для каждого tag
                Получить tagText (toLowerCase)
                Проверка: tagText includes searchText?
                  Да:
                    tag.classList.remove('search__tag-item--hidden')
                  Нет:
                    tag.classList.add('search__tag-item--hidden')
              Конец цикла
            Навесить слушатель input на searchFormField
              При вводе: Вызвать filterTags()
          Нет:
            Конец
        Конец
        */

        // Обработчик события ввода текста
        searchFormField.addEventListener('input', filterTags);
    }

    /* 5. Появление форм */
    const loginHeaderButton = document.querySelector('.header__login');
    const dialogLayout = document.querySelector('.dialog');

    if (loginHeaderButton && dialogLayout) {
        const closeDialogButtons = dialogLayout.querySelectorAll('[data-close]');
        const selectPopup = dialogLayout.querySelector('#popup-select');
        const loginPopup = dialogLayout.querySelector('#popup-login');
        const registrationPopup = dialogLayout.querySelector('#popup-registration');
        const switchToRegisterButtons = dialogLayout.querySelectorAll('[data-registration]');
        const switchToLoginButtons = dialogLayout.querySelectorAll('[data-login]');

        // Открытие модального окна при клике на кнопку "Войти"
        // Блок-схема (текстовое представление, упрощенная):
        /*
        Начало
        Получить кнопку "Войти" (loginHeaderButton) и диалоговое окно (dialogLayout)
        Проверка: Оба элемента существуют?
          Да:
            Навесить слушатель click на loginHeaderButton:
              При клике: Показать dialogLayout
          Нет:
            Конец
        Конец
        */
        loginHeaderButton.addEventListener('click', () => {
            dialogLayout.removeAttribute('hidden');
        });

        // Закрытие модального окна при клике на кнопку закрытия
        if (closeDialogButtons) {
            // Блок-схема (текстовое представление):
            /*
            Начало
            Для каждой closeDialogButton:
              Навесить слушатель click:
                При клике: скрыть диалог, показать selectPopup
            Конец
            */
            closeDialogButtons.forEach(button => {
                button.addEventListener('click', () => {
                    dialogLayout.setAttribute('hidden', true);
                    selectPopup.removeAttribute('hidden');
                    loginPopup.setAttribute('hidden', true);
                    registrationPopup.setAttribute('hidden', true);
                });
            });
        }

        // Закрытие модального окна при клике вне его области
        window.addEventListener('click', (event) => {
            // Блок-схема (текстовое представление):
            /*
            Начало
            Навесить слушатель click на window:
              При клике вне диалога: скрыть диалог, показать selectPopup
            Конец
            */
            if (event.target === dialogLayout) {
                dialogLayout.setAttribute('hidden', true);
                selectPopup.removeAttribute('hidden');
                loginPopup.setAttribute('hidden', true);
                registrationPopup.setAttribute('hidden', true);
            }
        });

        // Переключение на форму регистрации
        if (registrationPopup) {
            // Блок-схема (текстовое представление):
            /*
            Начало
            Для каждой кнопки switchToRegister:
              Навесить слушатель click:
                При клике: скрыть окна, показать форму регистрации
            Конец
            */
            switchToRegisterButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    selectPopup.setAttribute('hidden', true);
                    loginPopup.setAttribute('hidden', true);
                    registrationPopup.removeAttribute('hidden');
                });
            });
        }

        // Переключение на форму входа
        if (loginPopup) {
            // Блок-схема (текстовое представление):
            /*
            Начало
            Для каждой кнопки switchToLogin:
              Навесить слушатель click:
                При клике: скрыть окна, показать форму входа
            Конец
            */
            switchToLoginButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    selectPopup.setAttribute('hidden', true);
                    registrationPopup.setAttribute('hidden', true);
                    loginPopup.removeAttribute('hidden');
                });
            });
        }

        // Отправка данных на форме регистрации
        registrationPopup.addEventListener('submit', event => {
            event.preventDefault(); // Предотвращаем отправку формы

            const username = registrationPopup.querySelector('#username').value;
            const login = registrationPopup.querySelector('#login').value;
            const email = registrationPopup.querySelector('#email').value;
            const password = registrationPopup.querySelector('#password').value;
            const confirmPassword = registrationPopup.querySelector('#confirm-password').value;

            const errorMessage = registrationPopup.querySelector('#error-message');

            // Блок-схема (текстовое представление):
            /*
            Начало
            Получить данные из формы
            Проверка: Пароли совпадают?
              Нет:
                Вывести сообщение об ошибке
                Прервать
            Проверка: Длина имени пользователя < 3?
              Да:
                Вывести сообщение об ошибке
                Прервать
            Проверка: Длина пароля < 8?
              Да:
                Вывести сообщение об ошибке
                Прервать
            Успешно: Вывести сообщение, записать логин в localStorage, очистить форму
            Конец
            */

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Пароли не совпадают';
                errorMessage.style.color = 'red';
                return;
            }

            if (username.length < 3) {
                errorMessage.textContent = 'Имя пользователя должно содержать не менее 3 символов';
                return;
            }

            if (password.length < 8) {
                errorMessage.textContent = 'Пароль должен содержать не менее 8 символов';
                return;
            }

            // Здесь можно добавить отправку данных на сервер
            errorMessage.textContent = 'Регистрация прошла успешно!';
            errorMessage.style.color = 'green';

            // Запишем логин
            window.localStorage.setItem("login", login);

            // Очистка формы
            document.getElementById('registration-form').reset();
        });
    }

    // Дополнительные скрипты
    // Scroll up
    // Обратите внимание, что в коде выше уже есть слушатель скролла (на следующей практике уберем повторение)

    const scrollUpButton = document.querySelector('.scroll-up');

    if (scrollUpButton) {
        const windowHeight = document.documentElement.clientHeight; // Определяем высоту видимой части окна браузера

        /*  Вынесли в отдельную функцию !!!
        document.addEventListener('scroll', () => {
            let scrollPageY = this.scrollY;

            if (scrollPageY >= windowHeight) {
                scrollUpButton.classList.add('scroll-up--show');
            } else {
                scrollUpButton.classList.remove('scroll-up--show');
            }
        });
        */

        // Показать кнопку при прокрутке вниз на высоту экрана
        scrollToogleClass(scrollUpButton, windowHeight, 'scroll-up--show');

        // Плавная прокрутка наверх при нажатии на кнопку
        scrollUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

    }

    // Preloader страницы
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    if (preloader && content) {
        setTimeout(() => {
            // Скрываем прелоадер
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';

            // Показываем контент
            content.style.display = 'block';

            // Удаляем элемент из DOM
            preloader.remove();
        }, 3000); // Задержка 3 секунды
    }

    // Карусель (слайдер)
    const slider = document.querySelector('.swiper');

    if (slider) {
        const swiper = new Swiper(slider, {
            // Дополнительные параметры
            slidesPerView: 4, // Количество слайдов на экране
            spaceBetween: 30, // Расстояние между слайдами
            loop: true,  // Зацикливание слайдов

            // Пагинация
            pagination: {
                el: '.swiper-pagination',
            },

            // Навигационные стрелки
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

});//отзывы
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
    // Блок-схема (текстовое представление):
    /*
    Начало
    Получить reviewContainer
    Навесить слушатель click на reviewContainer:
        При клике:
            Определить clickX
            Проверка: clickX < containerWidth / 2?
              Да:
                Вызвать prevReview()
              Нет:
                Вызвать nextReview()
    Конец
    */

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

    // Блок-схема (текстовое представление):
    /*
    Начало
    Получить faqContainer
    Навесить слушатель click на faqContainer:
        При клике:
            Определить clickX
            Проверка: clickX < containerWidth / 2?
              Да:
                Вызвать faqPrevFaq()
              Нет:
                Вызвать faqNextFaq()
    Конец
    */

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

// Блок-схема (текстовое представление):
/*
Начало
Получить settingsOptionsButton, settingsWindowOverlay, settingsCloseButton
Навесить слушатель click на settingsOptionsButton:
    При клике: показать settingsWindowOverlay
Навесить слушатель click на settingsCloseButton:
    При клике: скрыть settingsWindowOverlay
Конец
*/
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

    // Блок-схема (текстовое представление):
    /*
    Начало
    Функция setTheme(theme)
    Проверка: theme === 'dark'?
      Да:
        Добавить dark-theme к body, sections, settingsPanel
      Нет:
        Удалить dark-theme из body, sections, settingsPanel
    Конец
    */

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