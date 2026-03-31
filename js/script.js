const header = document.querySelector("header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 80);
  });
}

// mobile menu
const menu = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");

if (menu && navlist) {
  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navlist.classList.toggle("active");
  };

  window.addEventListener("scroll", () => {
    menu.classList.remove("bx-x");
    navlist.classList.remove("active");
  });
}

// theme toggle (dark / light)
const toggle = document.getElementById("theme-toggle");
if (toggle) {
  const icon = toggle.querySelector("i");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
      icon.classList.remove("ri-moon-line");
      icon.classList.add("ri-sun-line");
    } else {
      icon.classList.remove("ri-sun-line");
      icon.classList.add("ri-moon-line");
    }
  });
}

// search modal
const searchBtn = document.getElementById("search-btn");
const searchModal = document.getElementById("search-modal");

if (searchBtn && searchModal) {
  searchBtn.onclick = (e) => {
    e.stopPropagation();
    searchModal.classList.add("active");
  };

  searchModal.onclick = () => {
    searchModal.classList.remove("active");
  };

  // prevent click inside box from closing
  const box = searchModal.querySelector(".search-box");
  if (box) {
    box.onclick = (e) => e.stopPropagation();
  }
}
