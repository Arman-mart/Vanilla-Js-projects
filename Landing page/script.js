const logInBtn = document.getElementById("login");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const main = document.querySelector(".main");
const closeButton = document.querySelector(".close-button");
const menuBtn = document.querySelector(".burger-menu");
const menuItems = document.getElementById("menu-items")

logInBtn.addEventListener("click", (event) => {
  event.preventDefault();
  modalOverlay.classList.add("active");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
});

document.addEventListener("click", (event) => {
  if (event.target === modalOverlay || event.target === closeButton) {
    modalOverlay.classList.remove("active");
    modal.classList.remove("active");
    document.body.style.overflow = "visible";
  }
});

function toggleMenu() {
    if (menuItems.classList.contains("show-menu")) {
      menuItems.classList.remove("show-menu");
    } else {
      menuItems.classList.add("show-menu");
    }
  }

  menuBtn.addEventListener('click', toggleMenu)



