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

  // --- PORTFOLIO MODAL CLOSE HANDLERS ---
  const modal = document.getElementById("project-modal");
  if (modal) {
    const closeBtn = modal.querySelector(".close-modal");

    // klik tombol X
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        closeProject();
      });
    }

    // klik di luar konten (overlay)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProject();
      }
    });

    // ESC untuk tutup
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") {
        closeProject();
      }
    });
  }
});

const projectData = {
  pmi: {
    tag: "Laravel • 2023",
    title: "Financial and Management for PMI",
    desc: "Sistem ini dibangun untuk mendigitalisasi pencatatan keuangan manual...",
    arch: "Menggunakan Service-Repository Pattern...",
    erd: "../img/port-1.jpg",
    // Daftar Path Logo Teknologi (Simpan di asset kamu)
    techLogos: [
      "../img/tech/laravel.svg",
      "../img/tech/mysql.svg",
      "../img/tech/php.svg"
    ],
    // ISI LINK GITHUB DISINI
    githubUrl: "https://github.com/guanshiyin28/HackerRank"
  },
  telu: {
    tag: "Flutter • 2024",
    title: "My Tel-U Traffic Status",
    desc: "Aplikasi mobile untuk monitoring kepadatan lalu lintas...",
    arch: "Menerapkan Clean Architecture...",
    erd: "../img/port-2.jpg",
    techLogos: [
      "../img/tech/flutter.svg",
      "../img/tech/firebase.svg"
    ],
    // JIKA TIDAK INGIN ADA GITHUB, KOSONGKAN SAJA ""
    githubUrl: ""
  },
  balok: {
    tag: "Kotlin • 2023",
    title: "Volume Balok Simple App",
    desc: "Aplikasi Android sederhana untuk menghitung volume balok dengan antarmuka ringan.",
    arch: "Menggunakan arsitektur sederhana dengan Activity tunggal dan perhitungan langsung di layer UI.",
    erd: "../img/port-3.jpg",
    techLogos: [
      "../img/tech/kotlin.svg",
      "../img/tech/android.svg"
    ],
    githubUrl: ""
  }
};

function openProject(id) {
  const data = projectData[id];
  if (!data) return;

  document.getElementById('m-tag').innerText = data.tag;
  document.getElementById('m-title').innerText = data.title;
  document.getElementById('m-desc').innerText = data.desc;
  document.getElementById('m-arch').innerText = data.arch;
  document.getElementById('m-erd').src = data.erd;

  // 1. Logika Render Logo Teknologi
  const techContainer = document.getElementById('m-tech');
  techContainer.innerHTML = "";
  data.techLogos.forEach(logoPath => {
    techContainer.innerHTML += `
            <div class="tech-logo-item" title="Technology">
                <img src="${logoPath}" alt="tech">
            </div>`;
  });

  // 2. Logika Kondisi Tombol GitHub
  const githubContainer = document.getElementById('github-link-container');
  githubContainer.innerHTML = ""; // Reset dulu

  if (data.githubUrl !== "") {
    githubContainer.innerHTML = `
            <a href="${data.githubUrl}" target="_blank" class="github-modal-btn">
                <i class="ri-github-fill"></i> View on GitHub
            </a>
        `;
  }

  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

/** Tutup modal project (dipakai di tombol X, klik overlay, dan ESC) */
function closeProject() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}
