document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-btn");
  const arrow = document.querySelector(".custom-arrow");
  const hiddenBlocks = document.querySelector(".hidden-block");
  const sliderDots = document.querySelector(".slider-dots");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (!toggleBtn || !arrow || !hiddenBlocks || !sliderDots) {
    console.error("Один из элементов не найден!");
    return;
  }

  let isOpen = false;

  toggleBtn.addEventListener("click", () => {
    if (!isOpen) {
      hiddenBlocks.classList.add("show");

      requestAnimationFrame(() => {
        const blockHeight = hiddenBlocks.offsetHeight;
        toggleBtn.style.bottom = `${blockHeight}px`;
      });
    } else {
      toggleBtn.style.bottom = "0px";
    }

    isOpen = !isOpen;

    arrow.classList.toggle("rotated", isOpen);
    hiddenBlocks.classList.toggle("show", isOpen);
    sliderDots.classList.toggle("hide", isOpen);

    if (isOpen) {
      window.addEventListener("resize", updateButtonPosition);
    } else {
      window.removeEventListener("resize", updateButtonPosition);
    }
  });

  function updateButtonPosition() {
    if (isOpen && hiddenBlocks.classList.contains("show")) {
      const blockHeight = hiddenBlocks.offsetHeight;
      toggleBtn.style.bottom = `${blockHeight}px`;
    }
  }

  document.addEventListener("click", (e) => {
    if (!isOpen) {
      window.removeEventListener("resize", updateButtonPosition);
    }
  });

  let currentSlide = 0;
  let interval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

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

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      showSlide(index);
      startSlider();
    });
  });

  showSlide(0);
  startSlider();
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const hasSubItems = document.querySelectorAll(".menu__item--has-sub");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    menu.classList.toggle("active");
  });

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
  const modal = document.getElementById("authModal");

  if (modal) {
    modal.style.display = "none";
  }

  const authBtn = document.getElementById("authBtn");
  const closeBtn = document.querySelector(".auth-close");
  const tablinks = document.querySelectorAll(".auth-tablink");
  const tabcontents = document.querySelectorAll(".auth-tabcontent");

  if (authBtn) {
    authBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal && modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  tablinks.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");

      tablinks.forEach((t) => t.classList.remove("active"));
      tabcontents.forEach((t) => t.classList.remove("active"));

      this.classList.add("active");
      document.getElementById(tabName).classList.add("active");
    });
  });

  const loginForm = document.querySelector("#login .auth-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("Login attempt:", email, password);
    });
  }

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

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const terms = document.getElementById("terms").checked;
      const privacy = document.getElementById("privacy").checked;

      if (!terms || !privacy) {
        alert("Please accept terms and privacy policy!");
        return;
      }
      console.log("Registration:", firstName, lastName, email, password);

      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }
});