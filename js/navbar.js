/* =========================
   MENU MOBILE
========================= */

const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const navLinks = document.getElementById("nav-links");


/* =========================
   OUVRIR
========================= */

menuToggle.addEventListener("click", () => {

    navLinks.classList.add("active");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fermer le menu");

});


/* =========================
   FERMER
========================= */

menuClose.addEventListener("click", () => {

    navLinks.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");

});














const navbar = document.querySelector(".navbar");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const navbarHeight = navbar.offsetHeight;

    if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
        // Scroll vers le bas
        navbar.classList.add("navbar-hidden");
    } else {
        // Scroll vers le haut
        navbar.classList.remove("navbar-hidden");
    }

    lastScrollY = currentScrollY;
});

























document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function (event) {

        const href = this.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            this.target === "_blank"
        ) {
            return;
        }

        event.preventDefault();

        const main = document.querySelector("main");

        if (!main) {
            window.location.href = href;
            return;
        }

        main.classList.add("page-exit");

        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });

});