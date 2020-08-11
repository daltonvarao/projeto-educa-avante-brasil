const closeButtonNav = document.querySelector("#close-menu-nav");
const showButtonNav = document.querySelector("#show-menu-nav");

const menuNav = document.querySelector(".nav-menu");

closeButtonNav.onclick = function () {
  menuNav.classList.replace("show", "hidden");
};

showButtonNav.onclick = function () {
  menuNav.classList.replace("hidden", "show");
};
