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
   NAVBAR
================================================== */

const navbar = document.querySelector(".navbar");

let lastScrollY = window.scrollY;


/* ==================================================
   APPARITION
================================================== */

if (navbar) {

    window.addEventListener("load", () => {

        requestAnimationFrame(() => {

            navbar.classList.add("navbar-loaded");

        });

    });


    /* ==================================================
       SCROLL
    ================================================== */

    window.addEventListener("scroll", () => {

        // Ne rien modifier pendant la transition de page
        if (document.body.classList.contains("page-exit")) {
            return;
        }


        const currentScrollY = window.scrollY;


        /* -----------------------------------------------
           Haut de page
        ----------------------------------------------- */

        if (currentScrollY <= 0) {

            navbar.classList.remove("navbar-hidden");

            lastScrollY = currentScrollY;

            return;

        }


        /* -----------------------------------------------
           Scroll vers le bas
        ----------------------------------------------- */

        if (currentScrollY > lastScrollY) {

            navbar.classList.add("navbar-hidden");

        }


        /* -----------------------------------------------
           Scroll vers le haut
        ----------------------------------------------- */

        else if (currentScrollY < lastScrollY) {

            navbar.classList.remove("navbar-hidden");

        }


        lastScrollY = currentScrollY;

    });

}



/* ==================================================
   LOGO
================================================== */

const logo = document.querySelector(".logo");


if (logo) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            logo.classList.add("scrolled");

        } else {

            logo.classList.remove("scrolled");

        }

    });

}

