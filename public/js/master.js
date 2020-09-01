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

function resetInput(parentNode, selectorName, name, counter) {
  const input = parentNode.querySelector(selectorName);
  if (input) {
    input.value = null;
    input.name = `${name}[${counter}]`;
  }
}

const chForm = document.querySelector("#carga-horaria-inputs");
const chGroup = document.querySelector(".carga-horaria-group");
const novaCHButton = document.querySelector("#nova-ch");

if (chForm) {
  let numDisc = chForm.children.length;

  novaCHButton.onclick = function () {
    const newCH = chGroup.cloneNode(true);

    const newCHId = newCH.querySelector('input[type="hidden"]');
    if (newCHId) {
      newCHId.value = null;
      newCHId.name = `id[${numDisc}]`;
    }

    resetInput(newCH, 'input[type="text"]', "disciplina", numDisc);
    resetInput(newCH, 'input[type="number"]', "carga_horaria", numDisc);

    numDisc++;
    chForm.appendChild(newCH);
  };
}

const fpForm = document.querySelector("#forma-pagamento-inputs");
const fpGroup = document.querySelector(".forma-pagamento-group");
const novaFPButton = document.querySelector("#nova-fp");

if (fpGroup) {
  let numFP = fpForm.children.length;

  novaFPButton.onclick = function () {
    const newFP = fpGroup.cloneNode(true);

    resetInput(newFP, 'input[plca=""]');

    fpForm.appendChild(newFP);
  };
}
