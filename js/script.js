/**
 * script.js - Bintang Ridwan Pribadi Portfolio
 * Menangani: Theme Toggle (Persistence), Sticky Header, Mobile Menu, Search Modal, Portfolio Modal & Repository Page
 */

// 1. Terapkan tema seawal mungkin (hindari flashing)
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

applyTheme();

// STATE GLOBAL REPO
let allRepos = [];
let filteredRepos = [];

// RENDER REPOS
function renderRepos() {
  const container = document.getElementById("repo-container");
  if (!container) return;

  if (!filteredRepos.length) {
    container.innerHTML =
      '<p style="text-align:center; grid-column:1/-1;">No repositories found.</p>';
    return;
  }

  container.innerHTML = "";
  filteredRepos.forEach((repo, index) => {
    const updatedAt = new Date(repo.updated_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    container.innerHTML += `
      <div class="repo-card" data-aos="fade-up" data-aos-delay="${index * 50}">
        <a href="${repo.html_url}" target="_blank">
          <div class="repo-title">
            <i class="ri-git-repository-line"></i> ${repo.name}
          </div>
          <p class="repo-desc">
            ${repo.description || "No description available for this repository."}
          </p>
        </a>
        <div class="repo-meta">
          <span><i class="ri-time-line"></i> Updated ${updatedAt}</span>
          <span class="lang-tag">${repo.language || "Plain"}</span>
        </div>
      </div>
    `;
  });

  if (window.AOS) AOS.refresh();
}

// FILTER + SORT REPOS
function applyRepoFilters() {
  if (!allRepos.length) return;

  const searchInput = document.getElementById("repo-search-input");
  const langSelect = document.getElementById("repo-language-filter");
  const sortSelect = document.getElementById("repo-sort-filter");

  const searchTerm = (searchInput?.value || "").toLowerCase();
  const selectedLang = (langSelect?.value || "all").toLowerCase();
  const sortMode = sortSelect?.value || "updated";

  filteredRepos = allRepos.filter((repo) => {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || "").toLowerCase();
    const lang = (repo.language || "Plain").toLowerCase();

    const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);
    const matchesLang = selectedLang === "all" ? true : lang === selectedLang;

    return matchesSearch && matchesLang;
  });

  filteredRepos.sort((a, b) => {
    if (sortMode === "stars") {
      return (b.stargazers_count || 0) - (a.stargazers_count || 0);
    }
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  renderRepos();
}

// DATA PORTFOLIO MODAL
const projectData = {
  pmi: {
    tag: "Laravel • 2023",
    title: "Financial and Management for PMI",
    desc: "Sistem ini dibangun untuk mendigitalisasi pencatatan keuangan manual...",
    arch: "Menggunakan Service-Repository Pattern...",
    erd: "../img/port-1.jpg",
    techLogos: [
      "../img/tech/laravel.svg",
      "../img/tech/mysql.svg",
      "../img/tech/php.svg"
    ],
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
    githubUrl: ""
  },
  balok: {
    tag: "Kotlin • 2023",
    title: "Volume Balok Simple App",
    desc: "Aplikasi Android sederhana untuk menghitung volume balok...",
    arch: "Menggunakan arsitektur sederhana dengan Activity tunggal...",
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

  document.getElementById("m-tag").innerText = data.tag;
  document.getElementById("m-title").innerText = data.title;
  document.getElementById("m-desc").innerText = data.desc;
  document.getElementById("m-arch").innerText = data.arch;
  document.getElementById("m-erd").src = data.erd;

  const techContainer = document.getElementById("m-tech");
  techContainer.innerHTML = "";
  data.techLogos.forEach((logoPath) => {
    techContainer.innerHTML += `
      <div class="tech-logo-item" title="Technology">
        <img src="${logoPath}" alt="tech">
      </div>
    `;
  });

  const githubContainer = document.getElementById("github-link-container");
  githubContainer.innerHTML = "";
  if (data.githubUrl) {
    githubContainer.innerHTML = `
      <a href="${data.githubUrl}" target="_blank" class="github-modal-btn">
        <i class="ri-github-fill"></i> View on GitHub
      </a>
    `;
  }

  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeProject() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

// SATU DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(); // sinkron lagi setelah DOM siap

  // THEME TOGGLE
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("theme", isLight ? "light" : "dark");

      const icon = themeToggle.querySelector("i");
      if (icon) {
        if (isLight) icon.classList.replace("ri-moon-line", "ri-sun-line");
        else icon.classList.replace("ri-sun-line", "ri-moon-line");
      }
    });
  }

  // STICKY HEADER
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("sticky", window.scrollY > 80);
    });
  }

  // MOBILE MENU
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

  // SEARCH MODAL + SHORTCUT
  const searchModal = document.getElementById("search-modal");
  const searchBtn = document.getElementById("search-btn");
  const searchInput = searchModal ? searchModal.querySelector("input") : null;

  const openSearch = () => {
    if (!searchModal) return;
    searchModal.classList.add("active");
    setTimeout(() => searchInput && searchInput.focus(), 100);
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
    const searchBox = searchModal.querySelector(".search-box");
    searchModal.onclick = () => closeSearch();
    if (searchBox) {
      searchBox.onclick = (e) => e.stopPropagation();
    }
  }
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape") {
      closeSearch();
      closeProject();
    }
  });

  // PORTFOLIO MODAL (close handlers)
  const modal = document.getElementById("project-modal");
  if (modal) {
    const closeBtn = modal.querySelector(".close-modal");
    if (closeBtn) closeBtn.addEventListener("click", closeProject);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProject();
    });
  }

  // REPOSITORY PAGE
  const repoContainer = document.getElementById("repo-container");
  if (repoContainer) {
    const username = "bintangridwanp";

    async function fetchGitHubData() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`
        );
        const repos = await response.json();

        if (repos.message === "Not Found") {
          repoContainer.innerHTML = "<p>User not found.</p>";
          return;
        }

        allRepos = repos.slice();
        filteredRepos = repos.slice();

        let totalStars = 0;
        let totalForks = 0;
        repos.forEach((repo) => {
          totalStars += repo.stargazers_count || 0;
          totalForks += repo.forks_count || 0;
        });

        const totalReposEl = document.getElementById("total-repos");
        const totalStarsEl = document.getElementById("total-stars");
        const totalForksEl = document.getElementById("total-forks");
        if (totalReposEl) totalReposEl.innerText = repos.length;
        if (totalStarsEl) totalStarsEl.innerText = totalStars;
        if (totalForksEl) totalForksEl.innerText = totalForks;

        renderRepos();
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        repoContainer.innerHTML =
          "<p>Failed to load repositories. Please try again later.</p>";
      }
    }

    fetchGitHubData();

    const searchInputEl = document.getElementById("repo-search-input");
    const langSelectEl = document.getElementById("repo-language-filter");
    const sortSelectEl = document.getElementById("repo-sort-filter");
    const resetBtn = document.getElementById("repo-reset-btn");

    if (searchInputEl) searchInputEl.addEventListener("input", applyRepoFilters);
    if (langSelectEl) langSelectEl.addEventListener("change", applyRepoFilters);
    if (sortSelectEl) sortSelectEl.addEventListener("change", applyRepoFilters);
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (searchInputEl) searchInputEl.value = "";
        if (langSelectEl) langSelectEl.value = "all";
        if (sortSelectEl) sortSelectEl.value = "updated";
        filteredRepos = allRepos.slice();
        renderRepos();
      });
    }
  }
});
