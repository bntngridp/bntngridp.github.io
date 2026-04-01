/**
 * script.js - Bintang Ridwan Pribadi Portfolio
 * Menangani: Theme Toggle (Persistence), Sticky Header, Mobile Menu, & Search Modal
 */

// 1. FUNGSI UNTUK MENERAPKAN TEMA (Dipanggil segera agar tidak 'flashing')
function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  const icon = document.querySelector("#theme-toggle i");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (icon) {
      icon.classList.replace("ri-moon-line", "ri-sun-line");
    }
  } else {
    document.body.classList.remove("light-mode");
    if (icon) {
      icon.classList.replace("ri-sun-line", "ri-moon-line");
    }
  }
}

// Jalankan pengecekan tema segera
applyTheme();

document.addEventListener("DOMContentLoaded", () => {
  // Jalankan ulang applyTheme setelah DOM siap untuk memastikan Ikon sinkron
  applyTheme();

  // --- 2. THEME TOGGLE EVENT ---
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");

      // Simpan pilihan ke localStorage
      localStorage.setItem("theme", isLight ? "light" : "dark");

      // Update Ikon secara real-time
      const icon = themeToggle.querySelector("i");
      if (isLight) {
        icon.classList.replace("ri-moon-line", "ri-sun-line");
      } else {
        icon.classList.replace("ri-sun-line", "ri-moon-line");
      }
    });
  }

  // --- 3. STICKY HEADER ---
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("sticky", window.scrollY > 80);
    });
  }

  // --- 4. MOBILE MENU ---
  const menuIcon = document.querySelector("#menu-icon");
  const navlist = document.querySelector(".navlist");

  if (menuIcon && navlist) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle("bx-x");
      navlist.classList.toggle("active");
    };

    // Tutup menu saat scroll
    window.addEventListener("scroll", () => {
      menuIcon.classList.remove("bx-x");
      navlist.classList.remove("active");
    });

    // Tutup menu saat link diklik (untuk mobile)
    navlist.querySelectorAll("a").forEach(link => {
      link.onclick = () => {
        menuIcon.classList.remove("bx-x");
        navlist.classList.remove("active");
      };
    });
  }

  // --- 5. SEARCH MODAL ---
  const searchBtn = document.getElementById("search-btn");
  const searchModal = document.getElementById("search-modal");

  if (searchBtn && searchModal) {
    searchBtn.onclick = (e) => {
      e.stopPropagation();
      searchModal.classList.add("active");
    };

    // Klik di luar box untuk menutup
    searchModal.onclick = () => {
      searchModal.classList.remove("active");
    };

    // Mencegah modal tertutup saat klik di dalam box pencarian
    const searchBox = searchModal.querySelector(".search-box");
    if (searchBox) {
      searchBox.onclick = (e) => e.stopPropagation();
    }

    // Tutup dengan tombol ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchModal.classList.remove("active");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const searchModal = document.getElementById("search-modal");
  const searchInput = searchModal ? searchModal.querySelector("input") : null;

  // Fungsi untuk membuka modal
  const openSearch = () => {
    if (searchModal) {
      searchModal.classList.add("active");
      // Auto focus ke input saat terbuka
      setTimeout(() => searchInput?.focus(), 100);
    }
  };

  // Fungsi untuk menutup modal
  const closeSearch = () => {
    searchModal?.classList.remove("active");
  };

  // 1. Event Listener untuk klik tombol (icon)
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) {
    searchBtn.onclick = (e) => {
      e.stopPropagation();
      openSearch();
    };
  }

  // 2. Event Listener untuk Shortcut Keyboard (CMD+K atau CTRL+K)
  document.addEventListener("keydown", (e) => {
    // Mendeteksi Cmd+K (Mac) atau Ctrl+K (Windows/Linux)
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault(); // Mencegah browser membuka search default atau aksi lain
      openSearch();
    }

    // Menutup dengan tombol Escape
    if (e.key === "Escape") {
      closeSearch();
    }
  });

  // 3. Klik di luar modal untuk menutup
  if (searchModal) {
    searchModal.onclick = () => closeSearch();
    const searchBox = searchModal.querySelector(".search-box");
    if (searchBox) {
      searchBox.onclick = (e) => e.stopPropagation();
    }
  }
});