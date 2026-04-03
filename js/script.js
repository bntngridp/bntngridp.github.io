/**
 * script.js - Bintang Ridwan Pribadi Portfolio
 * Final Version: Friday, April 3, 2026
 */

// --- 1. THEME MANAGEMENT (SINKRONISASI AWAL) ---
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

// --- 2. GLOBAL STATE UNTUK REPOSITORY ---
let allRepos = [];
let filteredRepos = [];
let currentPage = 1;
const reposPerPage = 9; // Menampilkan 6 repo per halaman

// --- 3. REPOSITORY FUNCTIONS (FILTER, SORT, PAGINATION) ---

function renderRepos() {
  const container = document.getElementById("repo-container");
  const paginationContainer = document.getElementById("pagination");
  if (!container) return;

  if (filteredRepos.length === 0) {
    container.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding: 50px 0;">No repositories found matching your criteria.</p>';
    if (paginationContainer) paginationContainer.innerHTML = "";
    return;
  }

  // Kalkulasi Pagination
  const startIndex = (currentPage - 1) * reposPerPage;
  const endIndex = startIndex + reposPerPage;
  const paginatedItems = filteredRepos.slice(startIndex, endIndex);

  container.innerHTML = "";
  paginatedItems.forEach((repo, index) => {
    const updatedAt = new Date(repo.updated_at).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });

    container.innerHTML += `
            <div class="repo-card" data-aos="fade-up" data-aos-delay="${index * 50}">
                <a href="${repo.html_url}" target="_blank">
                    <div class="repo-title">
                        <i class="ri-git-repository-line"></i> ${repo.name}
                    </div>
                    <p class="repo-desc">${repo.description || "No description available for this repository."}</p>
                </a>
                <div class="repo-meta">
                    <span><i class="ri-time-line"></i> Updated ${updatedAt}</span>
                    <span class="lang-tag">${repo.language || "Plain Text"}</span>
                </div>
            </div>
        `;
  });

  renderPagination();
  if (window.AOS) AOS.refresh();
}

function renderPagination() {
  const paginationContainer = document.getElementById("pagination");
  if (!paginationContainer) return;

  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return;

  // Tombol Previous
  const prevBtn = document.createElement("button");
  prevBtn.className = "page-btn";
  prevBtn.innerHTML = "<";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => { currentPage--; renderRepos(); scrollRepoTop(); };
  paginationContainer.appendChild(prevBtn);

  // Tombol Angka
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `page-btn ${i === currentPage ? "active" : ""}`;
    pageBtn.innerText = i;
    pageBtn.onclick = () => {
      currentPage = i;
      renderRepos();
      scrollRepoTop();
    };
    paginationContainer.appendChild(pageBtn);
  }

  // Tombol Next
  const nextBtn = document.createElement("button");
  nextBtn.className = "page-btn";
  nextBtn.innerHTML = ">";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => { currentPage++; renderRepos(); scrollRepoTop(); };
  paginationContainer.appendChild(nextBtn);
}

function scrollRepoTop() {
  const header = document.querySelector(".repo-header");
  if (header) window.scrollTo({ top: header.offsetHeight + 100, behavior: 'smooth' });
}

function applyRepoFilters() {
  const searchInput = document.getElementById("repo-search-input");
  const langSelect = document.getElementById("repo-language-filter");
  const sortSelect = document.getElementById("repo-sort-filter");

  const searchTerm = (searchInput?.value || "").toLowerCase();
  const selectedLang = langSelect?.value || "all";
  const sortMode = sortSelect?.value || "updated";

  filteredRepos = allRepos.filter((repo) => {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || "").toLowerCase();
    const lang = (repo.language || "Plain").toLowerCase();

    const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);
    const matchesLang = (selectedLang === "all") ? true : (lang === selectedLang.toLowerCase());

    return matchesSearch && matchesLang;
  });

  // Sorting Logic
  filteredRepos.sort((a, b) => {
    if (sortMode === "stars") {
      return (b.stargazers_count || 0) - (a.stargazers_count || 0);
    }
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  currentPage = 1; // Reset ke page 1 setiap filter berubah
  renderRepos();
}

// --- 4. PORTFOLIO MODAL DATA ---
const projectData = {
  pmi: {
    tag: "Laravel • 2023",
    title: "Financial and Management for PMI",
    desc: "Sistem ini dibangun untuk mendigitalisasi pencatatan keuangan manual. Fokus utama pada keamanan transaksi dan validasi data hibah yang ketat.",
    arch: "Menerapkan Service-Repository Pattern untuk memisahkan Business Logic dari Eloquent, memastikan kode bersih dan testable.",
    erd: "../img/port-1.jpg",
    techLogos: ["../img/tech/laravel.svg", "../img/tech/mysql.svg", "../img/tech/php.svg"],
    githubUrl: "https://github.com/guanshiyin28/HackerRank"
  },
  telu: {
    tag: "Flutter • 2024",
    title: "My Tel-U Traffic Status",
    desc: "Aplikasi mobile real-time untuk monitoring kepadatan lalu lintas di lingkungan kampus Telkom University.",
    arch: "Menerapkan Clean Architecture dengan state management Provider dan integrasi Firebase Cloud Messaging.",
    erd: "../img/port-2.jpg",
    techLogos: ["../img/tech/flutter.svg", "../img/tech/firebase.svg", "../img/tech/dart.svg"],
    githubUrl: "" // Kosongkan jika tidak ada github
  },
  balok: {
    tag: "Kotlin • 2023",
    title: "Volume Balok Simple App",
    desc: "Aplikasi Android native untuk kalkulasi matematis volume bangun ruang balok secara instan.",
    arch: "Menggunakan pola MVVM (Model-View-ViewModel) dasar untuk pemisahan data kalkulasi dengan UI Android.",
    erd: "../img/port-3.jpg",
    techLogos: ["../img/tech/kotlin.svg", "../img/tech/android.svg"],
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

  // Render Tech Logos
  const techContainer = document.getElementById("m-tech");
  techContainer.innerHTML = "";
  data.techLogos.forEach(logo => {
    techContainer.innerHTML += `<div class="tech-logo-item"><img src="${logo}" alt="tech"></div>`;
  });

  // Render GitHub Button
  const githubContainer = document.getElementById("github-link-container");
  githubContainer.innerHTML = data.githubUrl
      ? `<a href="${data.githubUrl}" target="_blank" class="github-modal-btn"><i class="ri-github-fill"></i> View on GitHub</a>`
      : "";

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

// --- 5. INITIALIZATION ON DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", () => {
  applyTheme();

  // Theme Toggle Handler
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.onclick = () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      const icon = themeToggle.querySelector("i");
      if (isLight) icon.classList.replace("ri-moon-line", "ri-sun-line");
      else icon.classList.replace("ri-sun-line", "ri-moon-line");
    };
  }

  // Sticky Header
  window.onscroll = () => {
    const navbar = document.getElementById("navbar");
    if (navbar) navbar.classList.toggle("sticky", window.scrollY > 80);
  };

  // Mobile Menu
  const menuIcon = document.querySelector("#menu-icon");
  const navlist = document.querySelector(".navlist");
  if (menuIcon && navlist) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle("bx-x");
      navlist.classList.toggle("active");
    };
  }

  // Search Modal (Cmd+K)
  const searchModal = document.getElementById("search-modal");
  const searchBtn = document.getElementById("search-btn");
  const openSearch = () => {
    searchModal?.classList.add("active");
    setTimeout(() => searchModal?.querySelector("input")?.focus(), 100);
  };
  const closeSearch = () => searchModal?.classList.remove("active");

  if (searchBtn) searchBtn.onclick = (e) => { e.stopPropagation(); openSearch(); };
  if (searchModal) {
    searchModal.onclick = () => closeSearch();
    searchModal.querySelector(".search-box").onclick = (e) => e.stopPropagation();
  }

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); openSearch(); }
    if (e.key === "Escape") { closeSearch(); closeProject(); }
  });

  // --- REPOSITORY API FETCH ---
  const repoGrid = document.getElementById("repo-container");
  if (repoGrid) {
    const username = "bintangridwanp";

    async function fetchGitHubData() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const repos = await response.json();

        if (repos.message === "Not Found") {
          repoGrid.innerHTML = "<p>GitHub user not found.</p>";
          return;
        }

        allRepos = repos;
        filteredRepos = repos;

        // Update Stats
        let stars = 0, forks = 0;
        repos.forEach(r => { stars += r.stargazers_count; forks += r.forks_count; });

        document.getElementById("total-repos").innerText = repos.length;
        document.getElementById("total-stars").innerText = stars;
        document.getElementById("total-forks").innerText = forks;

        renderRepos();
      } catch (err) {
        repoGrid.innerHTML = "<p>Error loading repositories.</p>";
      }
    }
    fetchGitHubData();

    // Event Listeners for Filters
    document.getElementById("repo-search-input")?.addEventListener("input", applyRepoFilters);
    document.getElementById("repo-language-filter")?.addEventListener("change", applyRepoFilters);
    document.getElementById("repo-sort-filter")?.addEventListener("change", applyRepoFilters);
    document.getElementById("repo-reset-btn")?.addEventListener("click", () => {
      document.getElementById("repo-search-input").value = "";
      document.getElementById("repo-language-filter").value = "all";
      document.getElementById("repo-sort-filter").value = "updated";
      applyRepoFilters();
    });
  }
});