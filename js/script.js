/**
 * script.js - Bintang Ridwan Pribadi Portfolio
 * Final Version: Saturday, April 4, 2026
 */

// --- 1. THEME MANAGEMENT ---
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

// --- 2. GLOBAL STATE ---
// Repository State
let allRepos = [];
let filteredRepos = [];
let repoPage = 1;
const reposPerPage = 9;

// Certification State
let currentCertFilter = 'all';
let certPage = 1;
const certsPerPage = 9;

// --- 3. REPOSITORY FUNCTIONS (GitHub API) ---
function renderRepos() {
  const container = document.getElementById("repo-container");
  const paginationContainer = document.getElementById("pagination");
  if (!container) return;

  if (filteredRepos.length === 0) {
    container.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding: 50px 0;">No repositories found.</p>';
    if (paginationContainer) paginationContainer.innerHTML = "";
    return;
  }

  const start = (repoPage - 1) * reposPerPage;
  const paginatedItems = filteredRepos.slice(start, start + reposPerPage);

  container.innerHTML = "";
  paginatedItems.forEach((repo, index) => {
    const updatedAt = new Date(repo.updated_at).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
    container.innerHTML += `
            <div class="repo-card" data-aos="fade-up" data-aos-delay="${index * 50}">
                <a href="${repo.html_url}" target="_blank">
                    <div class="repo-title"><i class="ri-git-repository-line"></i> ${repo.name}</div>
                    <p class="repo-desc">${repo.description || "No description available."}</p>
                </a>
                <div class="repo-meta">
                    <span><i class="ri-time-line"></i> Updated ${updatedAt}</span>
                    <span class="lang-tag">${repo.language || "Plain"}</span>
                </div>
            </div>`;
  });
  renderRepoPagination();
  if (window.AOS) AOS.refresh();
}

function renderRepoPagination() {
  const container = document.getElementById("pagination");
  if (!container) return;
  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);
  container.innerHTML = "";
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = `page-btn ${i === repoPage ? "active" : ""}`;
    btn.innerText = i;
    btn.onclick = () => { repoPage = i; renderRepos(); window.scrollTo({top: 400, behavior: 'smooth'}); };
    container.appendChild(btn);
  }
}

function applyRepoFilters() {
  const searchTerm = document.getElementById("repo-search-input")?.value.toLowerCase() || "";
  const selectedLang = document.getElementById("repo-language-filter")?.value || "all";
  const sortMode = document.getElementById("repo-sort-filter")?.value || "updated";

  filteredRepos = allRepos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm) || (repo.description || "").toLowerCase().includes(searchTerm);
    const matchesLang = selectedLang === "all" || (repo.language || "").toLowerCase() === selectedLang.toLowerCase();
    return matchesSearch && matchesLang;
  });

  filteredRepos.sort((a, b) => sortMode === "stars" ? b.stargazers_count - a.stargazers_count : new Date(b.updated_at) - new Date(a.updated_at));
  repoPage = 1;
  renderRepos();
}

// --- 4. CERTIFICATION FUNCTIONS ---
const allCertifications = [
  {
    title: "Cloud Practitioner Essentials",
    tag: "aws",
    img: "../img/certifications/dicoding/Cloud Practitioner Essentials (Belajar Dasar AWS Cloud).jpg",
    desc: "Study the fundamentals of cloud computing using AWS infrastructure."
  },
  {
    title: "Google UI/UX Design",
    tag: "google",
    img: "../img/cert-2.jpg",
    desc: "Professional certificate for user experience design."
  },
  {
    title: "Flutter Mobile Expert",
    tag: "dicoding",
    img: "../img/cert-3.jpg",
    desc: "Deep dive into cross-platform mobile development."
  }
  // Tambahkan data sertifikat lainnya di sini...
];

function renderCertifications() {
  const container = document.getElementById("cert-container");
  if (!container) return;

  const filtered = allCertifications.filter(c => currentCertFilter === 'all' || c.tag === currentCertFilter);
  const start = (certPage - 1) * certsPerPage;
  const paginated = filtered.slice(start, start + certsPerPage);

  container.innerHTML = "";
  paginated.forEach((cert, index) => {
    container.innerHTML += `
            <div class="cert-card" data-aos="fade-up" data-aos-delay="${index * 50}">
                <div class="cert-img-box" onclick="zoomImg(this)">
                    <img src="${cert.img}" alt="${cert.title}">
                </div>
                <div class="cert-info">
                    <h3></i> ${cert.title}</h3>
                    <p>${cert.desc}</p>
                </div>
            </div>`;
  });
  renderCertPagination(filtered.length);
  if (window.AOS) AOS.refresh();
}

function renderCertPagination(totalItems) {
  const container = document.getElementById("cert-pagination");
  if (!container) return;
  const totalPages = Math.ceil(totalItems / certsPerPage);
  container.innerHTML = "";
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = `page-btn ${i === certPage ? "active" : ""}`;
    btn.innerText = i;
    btn.onclick = () => { certPage = i; renderCertifications(); window.scrollTo({top: 400, behavior: 'smooth'}); };
    container.appendChild(btn);
  }
}

function filterCerts(tag) {
  currentCertFilter = tag;
  certPage = 1;
  document.querySelectorAll('.filter-tag').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${tag}'`));
  });
  renderCertifications();
}

// --- 5. UI UTILITIES (Zoom, Modal, Menu) ---
function zoomImg(container) {
  const lightbox = document.getElementById('cert-lightbox');
  const zoomedImg = document.getElementById('zoomed-img');
  zoomedImg.src = container.querySelector('img').src;
  lightbox.style.display = 'flex';
  setTimeout(() => lightbox.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';
}

function closeZoom() {
  const lightbox = document.getElementById('cert-lightbox');
  lightbox.classList.remove('active');
  setTimeout(() => { lightbox.style.display = 'none'; document.body.style.overflow = 'auto'; }, 300);
}

// --- 6. INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.onclick = () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      const icon = themeBtn.querySelector("i");
      icon.classList.replace(isLight ? "ri-moon-line" : "ri-sun-line", isLight ? "ri-sun-line" : "ri-moon-line");
    };
  }

  // Sticky Header
  window.onscroll = () => document.getElementById("navbar")?.classList.toggle("sticky", window.scrollY > 80);

  // Mobile Menu
  const menuIcon = document.querySelector("#menu-icon");
  const navlist = document.querySelector(".navlist");
  if (menuIcon) {
    menuIcon.onclick = () => { menuIcon.classList.toggle("bx-x"); navlist.classList.toggle("active"); };
  }

  // Search Modal (Cmd+K)
  const searchModal = document.getElementById("search-modal");
  const openSearch = () => { searchModal?.classList.add("active"); setTimeout(() => searchModal?.querySelector("input")?.focus(), 100); };
  const closeSearch = () => searchModal?.classList.remove("active");
  document.getElementById("search-btn")?.addEventListener("click", (e) => { e.stopPropagation(); openSearch(); });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); openSearch(); }
    if (e.key === "Escape") { closeSearch(); closeZoom(); }
  });

  // Load Repositories if on Repo Page
  if (document.getElementById("repo-container")) {
    const username = "bntngridp";
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        .then(res => res.json()).then(data => {
      allRepos = data; filteredRepos = data;
      let s = 0, f = 0; data.forEach(r => { s += r.stargazers_count; f += r.forks_count; });
      document.getElementById("total-repos").innerText = data.length;
      document.getElementById("total-stars").innerText = s;
      document.getElementById("total-forks").innerText = f;
      renderRepos();
    });
    document.getElementById("repo-search-input")?.addEventListener("input", applyRepoFilters);
    document.getElementById("repo-language-filter")?.addEventListener("change", applyRepoFilters);
    document.getElementById("repo-sort-filter")?.addEventListener("change", applyRepoFilters);
  }

  // Load Certifications if on Cert Page
  if (document.getElementById("cert-container")) renderCertifications();
});