/* ==================================================
   MENU MOBILE
================================================== */

const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const navLinks = document.getElementById("nav-links");


if (menuToggle && menuClose && navLinks) {

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

}















/* ==================================================
   NAVBAR — SCROLL
================================================== */

const navbar = document.querySelector(".navbar");
const logo = document.querySelector(".logo");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    /* Logo */
    if (logo) {
        logo.classList.toggle("scrolled", currentScrollY > 50);
    }

    /* Navbar */
    if (
        navbar &&
        (!navLinks || !navLinks.classList.contains("active"))
    ) {
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            navbar.classList.add("navbar-hidden");
        } else {
            navbar.classList.remove("navbar-hidden");
        }
    }

    lastScrollY = currentScrollY;

}, { passive: true });