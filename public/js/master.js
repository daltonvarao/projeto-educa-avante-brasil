// navigation menu
const closeButtonNav = document.querySelector("#close-menu-nav");
const showButtonNav = document.querySelector("#show-menu-nav");

const menuNav = document.querySelector(".nav-menu");

closeButtonNav.onclick = function () {
  menuNav.classList.replace("show", "hidden");
};

showButtonNav.onclick = function () {
  menuNav.classList.replace("hidden", "show");
};

// alert messages
const closeAlertBtn = document.querySelector(".alert-close");
const alertMessage = document.querySelector(".alert-message");

if (closeAlertBtn) {
  closeAlertBtn.onclick = function () {
    alertMessage.classList.add("hidden");
  };
}
