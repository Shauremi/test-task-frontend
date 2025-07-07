document.addEventListener("DOMContentLoaded", () => {
  // Элементы управления
  const toggleBtn = document.querySelector(".toggle-btn");
  const arrow = document.querySelector(".custom-arrow");
  const hiddenBlocks = document.querySelector(".hidden-block");
  const sliderDots = document.querySelector(".slider-dots");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  // Проверка существования элементов
  if (!toggleBtn || !arrow || !hiddenBlocks || !sliderDots) {
    console.error("Один из элементов не найден!");
    return;
  }

  // Переменная состояния
  // Переменная состояния
  let isOpen = false;

  // Основной обработчик клика
  toggleBtn.addEventListener("click", () => {
    // Добавляем класс "show" перед измерением высоты
    if (!isOpen) {
      hiddenBlocks.classList.add("show");

      // Ждем следующего фрейма для корректного измерения
      requestAnimationFrame(() => {
        const blockHeight = hiddenBlocks.offsetHeight;
        toggleBtn.style.bottom = `${blockHeight}px`;
      });
    } else {
      toggleBtn.style.bottom = "0px";
    }

    // Переключаем состояние
    isOpen = !isOpen;

    // Обновляем классы
    arrow.classList.toggle("rotated", isOpen);
    hiddenBlocks.classList.toggle("show", isOpen);
    sliderDots.classList.toggle("hide", isOpen);

    // Управляем обработчиком ресайза
    if (isOpen) {
      window.addEventListener("resize", updateButtonPosition);
    } else {
      window.removeEventListener("resize", updateButtonPosition);
    }
  });

  // Функция для обновления позиции кнопки
  function updateButtonPosition() {
    if (isOpen && hiddenBlocks.classList.contains("show")) {
      const blockHeight = hiddenBlocks.offsetHeight;
      toggleBtn.style.bottom = `${blockHeight}px`;
    }
  }

  // Добавляем transition в CSS для плавности

  // Удаляем обработчик при закрытии, чтобы избежать утечек
  document.addEventListener("click", (e) => {
    if (!isOpen) {
      window.removeEventListener("resize", updateButtonPosition);
    }
  });

  // Функционал слайдера
  let currentSlide = 0;
  let interval;

  function showSlide(index) {
    // Скрываем все слайды
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Показываем текущий слайд
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
  }

  function startSlider() {
    interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      showSlide(nextSlide);
    }, 3000);
  }

  // Обработчики для точек
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      showSlide(index);
      startSlider();
    });
  });

  // Запускаем слайдер
  showSlide(0);
  startSlider();
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const hasSubItems = document.querySelectorAll(".menu__item--has-sub");

  // Переключение основного меню
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    menu.classList.toggle("active");
  });

  // Обработка подменю на мобильных
  hasSubItems.forEach((item) => {
    const link = item.querySelector("a");

    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const submenu = item.querySelector(".submenu");
        submenu.classList.toggle("active");
      }
    });
  });

  // Закрытие меню при клике на пункт без подменю
  document
    .querySelectorAll(".menu__item:not(.menu__item--has-sub) a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          menu.classList.remove("active");
          menuToggle.classList.remove("active");
        }
      });
    });
});
document.addEventListener("DOMContentLoaded", function () {
  // Элементы модального окна
  const modal = document.getElementById("authModal");

  // Скрываем модальное окно при загрузке
  if (modal) {
    modal.style.display = "none";
  }

  const authBtn = document.getElementById("authBtn");
  const closeBtn = document.querySelector(".auth-close");
  const tablinks = document.querySelectorAll(".auth-tablink");
  const tabcontents = document.querySelectorAll(".auth-tabcontent");

  // Открытие модального окна
  if (authBtn) {
    authBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (modal) {
        modal.style.display = "flex"; // Используем flex вместо block
        document.body.style.overflow = "hidden";
      }
    });
  }

  // Закрытие модального окна
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  // Закрытие при клике вне окна
  window.addEventListener("click", function (event) {
    if (event.target === modal && modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Переключение вкладок
  tablinks.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");

      // Убираем активный класс у всех вкладок
      tablinks.forEach((t) => t.classList.remove("active"));
      tabcontents.forEach((t) => t.classList.remove("active"));

      // Добавляем активный класс текущей вкладке
      this.classList.add("active");
      document.getElementById(tabName).classList.add("active");
    });
  });

  // Обработка формы авторизации
  const loginForm = document.querySelector("#login .auth-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Здесь должна быть логика авторизации
      console.log("Login attempt:", email, password);
    });
  }

  // Обработка формы регистрации
  const registerForm = document.querySelector("#register .auth-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const confirmPassword =
        document.getElementById("confirmPassword").value;

      // Проверка совпадения паролей
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Проверка чекбоксов
      const terms = document.getElementById("terms").checked;
      const privacy = document.getElementById("privacy").checked;

      if (!terms || !privacy) {
        alert("Please accept terms and privacy policy!");
        return;
      }

      // Здесь должна быть логика регистрации
      console.log("Registration:", firstName, lastName, email, password);

      // Закрываем модальное окно после успешной регистрации
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }
});