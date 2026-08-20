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



/* ==================================================
   TRANSITION DE PAGE
================================================== */

document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function (event) {

        const href = this.getAttribute("href");


        /* -----------------------------------------------
           Vérifications
        ----------------------------------------------- */

        if (!href) return;

        if (href.startsWith("#")) return;

        if (
            this.hostname &&
            this.hostname !== window.location.hostname
        ) {
            return;
        }

        if (this.target === "_blank") return;


        event.preventDefault();


        /* -----------------------------------------------
           Éviter plusieurs clics
        ----------------------------------------------- */

        if (document.body.classList.contains("page-exit")) {
            return;
        }


        /* -----------------------------------------------
           Préparer la navbar
           
           On la rend visible uniquement pour la
           transition de sortie.
        ----------------------------------------------- */

        if (navbar) {
            navbar.classList.remove("navbar-hidden");
        }


        /* -----------------------------------------------
           Attendre la fin de l'animation
        ----------------------------------------------- */

        const handlePageExit = (event) => {

            if (event.animationName !== "page-exit") {
                return;
            }


            document.body.removeEventListener(
                "animationend",
                handlePageExit
            );


            window.location.href = href;

        };


        document.body.addEventListener(
            "animationend",
            handlePageExit
        );


        /* -----------------------------------------------
           Lancer la sortie
        ----------------------------------------------- */

        document.body.classList.add("page-exit");

    });

});