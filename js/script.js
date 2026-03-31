const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", this.window.scrollY > 120);
});
let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('active');
};

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

const searchBtn = document.getElementById("search-btn");
const searchModal = document.getElementById("search-modal");

searchBtn.onclick = () => {
    searchModal.classList.add("active");
};

searchModal.onclick = () => {
    searchModal.classList.remove("active");
};