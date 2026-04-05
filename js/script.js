/**
 * script.js - Bintang Ridwan Pribadi Portfolio
 * Final Version: Saturday, April 4, 2026
 */

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

// Repository State
let allRepos = [];
let filteredRepos = [];
let repoPage = 1;
const reposPerPage = 9;

// Certification State
let currentCertFilter = 'all';
let certPage = 1;
const certsPerPage = 9;

// Repository function for github
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

//
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

//
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

// Certificate Function
const allCertifications = [
  {
    title: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
    tag: "dicoding",
    img: "../img/certifications/dicoding/Cloud Practitioner Essentials (Belajar Dasar AWS Cloud).jpg",
    desc: "Study the fundamentals of cloud computing using AWS, from core cloud computing concepts to the implementation of generative AI on AWS."
  },
  {
    title: "Belajar Dasar Pemrograman JavaScript",
    tag: "dicoding",
    img: "../img/certifications/dicoding/Belajar Dasar Pemrograman JavaScript.jpg",
    desc: "Study the fundamentals of JavaScript, from basic concepts, syntax, and ES6 features to the concept of automated testing using popular frameworks."
  },
  {
    title: "Memulai Pemrograman dengan Haskell",
    tag: "dicoding",
    img: "../img/certifications/dicoding/Memulai Pemrograman dengan Haskell.jpg",
    desc: "Learn Haskell programming, a purely functional language designed for education, research, and industrial applications."
  },{
    title: "Belajar Dasar Git dengan Github",
    tag: "dicoding",
    img: "../img/certifications/dicoding/Belajar Dasar Git dengan GitHub.jpg",
    desc: "Learn how to manage data or code using Git with GitHub, from the basics of Git to collaborating with a team."
  },{
    title: "Belajar Dasar Pemrograman Web",
    tag: "dicoding",
    img: "../img/certifications/dicoding/Belajar Dasar Pemrograman Web.jpg",
    desc: "Study the basic components of HTML and CSS, which are the main foundation for becoming a front-end web developer."
  },
  {
    title: "Belajar Membuat Front-End Web untuk Pemula",
    tag: "dicoding",
    img: "../img/certifications/dicoding/Belajar Membuat Front-End Web untuk Pemula.jpg",
    desc: "Study topics such as DOM manipulation, events, and web storage to enhance the functionality and interactivity of your website."
  },
  {
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    tag: "dicoding",
    img: "../img/certifications/dicoding/Memulai Dasar Pemrograman untuk Menjadi Pengembang Software.jpg",
    desc: "Learn the steps to become a software developer, from the analysis and planning stages to software modification and documentation."
  },
  {
    title: "Belajar Dasar AI",
    tag: "dicoding",
    img: "../img/certifications/dicoding/Belajar Dasar AI.jpg",
    desc: "Understand the fundamentals of Artificial Intelligence and its subfields, including Machine Learning and Deep Learning."
  },
  {
    title: "Belajar Dasar Structured Query Language (SQL)",
    tag: "dicoding",
    img: "../img/certifications/dicoding/Belajar Dasar Structured Query Language (SQL).jpg",
    desc: "Study the fundamental concepts of Structured Query Language (SQL), from an introduction to data and databases to practicing basic queries."
  },{
    title: "Finalist for UI/UX Competition in BASIC Challenge 2024",
    tag: "competition",
    img: "../img/certifications/competitions/Basic sibinus UI UX competition.jpg",
    desc: "For Outstanding Participation as a Finalist in the UI/UX Competition at the Business and System Innovation Challenge 2024."
  },
  {
    title: "Play It Competition 2024",
    tag: "competition",
    img: "../img/certifications/competitions/Play it competition UI_UX.jpg",
    desc: "As a UI/UX Challenge participant in the national Play IT competition, organized by the Information Technology Department of Politeknik Negeri Malang 2024."
  },
  {
    title: "Finalist SurabayaDev 2024",
    tag: "competition",
    img: "../img/certifications/competitions/Surabaya DEV 2024.jpg",
    desc: "In recognition of achievement as a Finalist in the University UI/UX Competition, held during SurabayaDev’s 10th Anniversary 2024"
  },
  {
    title: "Hack Fest 2024",
    tag: "competition",
    img: "../img/certifications/competitions/Hack fest 2024.jpg",
    desc: "As a participant in HackFest 2024, a hackathon organized by GDSC Indonesia for university students to develop solutions based on the United Nations’ 17 SDGs."
  },
  {
    title: "Flutter Mobile Expert",
    tag: "competition",
    img: "../img/certifications/competitions/It Festival 2025.jpg",
    desc: "In recognition of participation in the Software Development Competition at IT Festival 2025, innovation in developing software solutions."
  }

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
                    <img src="${cert.img}" alt="${cert.title}" loading="lazy">
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

// Filter charts
function filterCerts(tag) {
  currentCertFilter = tag;
  certPage = 1;
  document.querySelectorAll('.filter-tag').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${tag}'`));
  });
  renderCertifications();
}

// Lightbox for Certification Images
function zoomImg(container) {
  const lightbox = document.getElementById('cert-lightbox');
  const zoomedImg = document.getElementById('zoomed-img');
  zoomedImg.src = container.querySelector('img').src;
  lightbox.style.display = 'flex';
  setTimeout(() => lightbox.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';
}

// Close Zoom
function closeZoom() {
  const lightbox = document.getElementById('cert-lightbox');
  lightbox.classList.remove('active');
  setTimeout(() => { lightbox.style.display = 'none'; document.body.style.overflow = 'auto'; }, 300);
}

// Initialize AOS and Event Listeners
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