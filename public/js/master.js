// navigation menu

if (feather) {
  feather.replace();
}

const closeButtonNav = document.querySelector("#close-menu-nav");
const showButtonNav = document.querySelector("#show-menu-nav");

const menuNav = document.querySelector(".nav-menu");

if (closeButtonNav) {
  closeButtonNav.onclick = function () {
    menuNav.classList.replace("show", "hidden");
  };
}

if (showButtonNav) {
  showButtonNav.onclick = function () {
    menuNav.classList.replace("hidden", "show");
  };
}

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

// copyrights

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.innerHTML = new Date().getFullYear();
}

// sidebar

const sidebarCollapseBtn = document.querySelector(".sidebar-button");
const sidebar = document.querySelector(".sidebar");

if (sidebar) {
  sidebarCollapseBtn.onclick = function () {
    sidebar.classList.toggle("sidebar-collapsed");
  };
}

const sidebarLinks = document.querySelectorAll(".sidebar-link");

if (sidebarLinks) {
  sidebarLinks.forEach((link) => {
    if (location.pathname === link.pathname) {
      link.classList.add("sidebar-link-active");
    }
  });
}

const togglePassword = document.querySelector(".toggle-password");
const input = document.querySelector("#password-input");

if (togglePassword) {
  function showPassword(input) {
    input.type = "text";
    togglePassword.classList.replace("password-hidden", "password-show");
  }

  function hidePassword(input) {
    input.type = "password";
    togglePassword.classList.replace("password-show", "password-hidden");
  }

  togglePassword.onclick = function () {
    input.type === "password" ? showPassword(input) : hidePassword(input);
  };
}

const cursoForm = document.querySelector("#carga-horaria-inputs");
const novaCHButton = document.querySelector("#nova-ch");
const formGroup = document.querySelector(".carga-horara-group");

let numDisc = cursoForm.children.length;

novaCHButton.onclick = function () {
  const newCH = formGroup.cloneNode(true);

  const newCHId = newCH.querySelector('input[type="hidden"]');
  if (newCHId) {
    newCHId.value = null;
    newCHId.name = `id[${numDisc}]`;
  }

  const newCHDisciplina = newCH.querySelector('input[type="text"]');
  newCHDisciplina.value = null;
  newCHDisciplina.name = `disciplina[${numDisc}]`;

  const newCHHoras = newCH.querySelector('input[type="number"]');
  newCHHoras.value = null;
  newCHHoras.name = `carga_horaria[${numDisc}]`;

  numDisc++;
  cursoForm.appendChild(newCH);
};
