// navigation menu

window.onload = function () {
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

  // dropdown menu
  const dropdownButton = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (dropdownButton) {
    dropdownButton.onclick = function () {
      if (dropdownContent.classList.contains("hidden")) {
        dropdownContent.classList.replace("hidden", "show");
      } else {
        dropdownContent.classList.replace("show", "hidden");
      }
    };

    window.onclick = function (ev) {
      if (!ev.target.matches(".dropdown-button"))
        dropdownContent.classList.replace("show", "hidden");
    };
  }

  // delete prompt
  const deleteButtons = document.querySelectorAll(".delete-button");

  if (deleteButtons) {
    deleteButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (confirm("Deseja realmente deletar este item?")) {
          btn.parentElement.submit();
        }
      });
    });
  }

  const currentYear = document.querySelector("#current-year");

  if (currentYear) {
    currentYear.innerHTML = new Date().getFullYear();
  }
};
