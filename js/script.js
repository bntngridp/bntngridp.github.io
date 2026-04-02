/**
 * script.js - Bintang Ridwan Pribadi Portfolio
 * Menangani: Theme Toggle (Persistence), Sticky Header, Mobile Menu, & Search Modal + Shortcut
 */

// 1. FUNGSI UNTUK MENERAPKAN TEMA (Dipanggil segera agar tidak 'flashing')
function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  const icon = document.querySelector("#theme-toggle i");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (icon) icon.classList.replace("ri-moon-line", "ri-sun-line");
  } else {
    document.body.classList.remove("light-mode");
    if (icon) icon.classList.replace("ri-sun-line", "ri-moon-line");
  }
}

// Jalankan pengecekan tema segera
applyTheme();

// Satu DOMContentLoaded saja (gabungan)
document.addEventListener("DOMContentLoaded", () => {
  // Sinkronkan lagi setelah DOM siap
  applyTheme();

  // --- THEME TOGGLE EVENT ---
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");

      // Simpan pilihan ke localStorage
      localStorage.setItem("theme", isLight ? "light" : "dark");

      // Update ikon
      const icon = themeToggle.querySelector("i");
      if (icon) {
        if (isLight) {
          icon.classList.replace("ri-moon-line", "ri-sun-line");
        } else {
          icon.classList.replace("ri-sun-line", "ri-moon-line");
        }
      }
    });
  }

  // --- STICKY HEADER ---
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("sticky", window.scrollY > 80);
    });
  }

  // --- MOBILE MENU ---
  const menuIcon = document.querySelector("#menu-icon");
  const navlist = document.querySelector(".navlist");

  if (menuIcon && navlist) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle("bx-x");
      navlist.classList.toggle("active");
    };

    window.addEventListener("scroll", () => {
      menuIcon.classList.remove("bx-x");
      navlist.classList.remove("active");
    });

    navlist.querySelectorAll("a").forEach((link) => {
      link.onclick = () => {
        menuIcon.classList.remove("bx-x");
        navlist.classList.remove("active");
      };
    });
  }

  // --- SEARCH MODAL + SHORTCUT CMD/CTRL+K ---
  const searchModal = document.getElementById("search-modal");
  const searchBtn = document.getElementById("search-btn");
  const searchInput = searchModal ? searchModal.querySelector("input") : null;

  const openSearch = () => {
    if (searchModal) {
      searchModal.classList.add("active");
      setTimeout(() => searchInput && searchInput.focus(), 100);
    }
  };

  const closeSearch = () => {
    if (searchModal) searchModal.classList.remove("active");
  };

  if (searchBtn && searchModal) {
    searchBtn.onclick = (e) => {
      e.stopPropagation();
      openSearch();
    };
  }

  if (searchModal) {
    searchModal.onclick = () => closeSearch();
    const searchBox = searchModal.querySelector(".search-box");
    if (searchBox) {
      searchBox.onclick = (e) => e.stopPropagation();
    }
  }

  document.addEventListener("keydown", (e) => {
    // Shortcut CMD/CTRL + K
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openSearch();
    }
    // Escape untuk tutup
    if (e.key === "Escape") {
      closeSearch();
    }
  });
});