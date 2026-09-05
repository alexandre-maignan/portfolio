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
let ticking = false;


function handleNavbarScroll() {

    const currentScrollY = window.scrollY;

    /* =========================
       LOGO
    ========================= */

    if (logo) {

        if (currentScrollY > 50) {
            logo.classList.add("scrolled");
        } else {
            logo.classList.remove("scrolled");
        }
    }


    /* =========================
       NAVBAR
    ========================= */

    if (navbar) {

        /*
         * Ne rien faire si le menu mobile
         * est ouvert.
         */
        if (!navLinks || !navLinks.classList.contains("active")) {

            /* Tout en haut */
            if (currentScrollY <= 0) {

                navbar.classList.remove("navbar-hidden");

            }

            /* Descente */
            else if (currentScrollY > lastScrollY) {

                navbar.classList.add("navbar-hidden");

            }

            /* Remontée */
            else if (currentScrollY < lastScrollY) {

                navbar.classList.remove("navbar-hidden");

            }
        }
    }


    lastScrollY = currentScrollY;

    ticking = false;
}


window.addEventListener("scroll", () => {

    if (!ticking) {

        window.requestAnimationFrame(handleNavbarScroll);

        ticking = true;
    }

}, { passive: true });