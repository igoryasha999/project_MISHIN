document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    // Функции для отображения/скрытия форм
    function showLoginForm() {
        loginForm.style.display = 'flex'; // отображаем
        registerForm.style.display = 'none'; // скрываем
    }

    function showRegisterForm() {
        registerForm.style.display = 'flex'; // отображаем
        loginForm.style.display = 'none'; // скрываем
    }

    // Обработчики событий для переключения между формами
    showRegisterLink.addEventListener('click', function(event) {
        event.preventDefault(); //  предотвращаем переход по ссылке (если это была ссылка)
        showRegisterForm();
    });

    showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        showLoginForm();
    });

    // Обработчик для формы регистрации
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Получаем значения полей формы
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        // Проверка паролей
        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        // Объект с данными пользователя
        const user = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        // Сохраняем данные в localStorage
        localStorage.setItem('user', JSON.stringify(user));
        alert('Регистрация прошла успешно!');

        // Очищаем форму и переключаемся на форму входа
        registerForm.reset();
        showLoginForm();  // Переключаемся на форму входа
    });

    // Обработчик для формы входа
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Получаем сохраненные данные пользователя из localStorage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert('Пользователь не найден. Зарегистрируйтесь.');
            return;
        }

        const user = JSON.parse(storedUser);

        // Проверяем email и пароль
        if (user.email === email && user.password === password) {
            alert('Вход выполнен успешно!');
            // Здесь можно добавить логику для перехода на другую страницу или обновления интерфейса
            window.location.href = 'index.html';
        } else {
            alert('Неверный email или пароль.');
        }
    });

    // По умолчанию показываем форму входа
    showLoginForm();
});