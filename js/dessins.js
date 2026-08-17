/* ==================================================
   APPARITION PROGRESSIVE DES IMAGES
================================================== */

const drawingCards = document.querySelectorAll(".drawing-card");

drawingCards.forEach((card, index) => {

    card.style.transitionDelay = `calc(${index} * var(--gallery-stagger))`;

    requestAnimationFrame(() => {
        card.classList.add("visible");
    });

});




/* ==================================================
   LAZY LOADING DES IMAGES DE LA GALERIE
================================================== */

const galleryImages = document.querySelectorAll(".gallery img");

const imagesToLoadImmediately = window.innerWidth <= 600 ? 1 : 3;

galleryImages.forEach((image, index) => {

    if (index >= imagesToLoadImmediately) {
        image.loading = "lazy";
    }

});


































document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LIGHTBOX
    ========================= */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxClose = document.getElementById("lightbox-close");

    const galleryImages = document.querySelectorAll(".drawing-card img");

    if (!lightbox || !lightboxImage || !lightboxClose) {
        return;
    }


    /* =========================
       ZOOM
    ========================= */

    let scale = 1;
    let targetScale = 1;

    const minScale = 1;
    const maxScale = 4;

    let animationFrame = null;


    /* =========================
       DÉPLACEMENT
    ========================= */

    let translateX = 0;
    let translateY = 0;

    let isDragging = false;

    let startX = 0;
    let startY = 0;

    let initialX = 0;
    let initialY = 0;


    /* =========================
       POSITION IMAGE
    ========================= */

    function updateImage() {

        lightboxImage.style.transform =
            `translate(${translateX}px, ${translateY}px) scale(${scale})`;

    }


    /* =========================
       ANIMATION ZOOM
    ========================= */

    function animateZoom() {

        scale += (targetScale - scale) * 0.12;

        updateImage();

        if (Math.abs(targetScale - scale) > 0.001) {

            animationFrame =
                requestAnimationFrame(animateZoom);

        } else {

            scale = targetScale;

            updateImage();

            animationFrame = null;

        }

    }


    function startZoomAnimation() {

        if (!animationFrame) {

            animationFrame =
                requestAnimationFrame(animateZoom);

        }

    }


    /* =========================
       BLOQUER LE SCROLL
    ========================= */

    function lockScroll() {

        document.body.classList.add("lightbox-open");

        if (typeof lenis !== "undefined") {
            lenis.stop();
        }

    }


    /* =========================
       RÉACTIVER LE SCROLL
    ========================= */

    function unlockScroll() {

        document.body.classList.remove("lightbox-open");

        if (typeof lenis !== "undefined") {
            lenis.start();
        }

    }


    /* =========================
       OUVRIR
    ========================= */

    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            scale = 1;
            targetScale = 1;

            translateX = 0;
            translateY = 0;

            updateImage();

            lightbox.classList.add("active");

            lockScroll();

        });

    });


    /* =========================
       ZOOM
    ========================= */

    lightboxImage.addEventListener("wheel", event => {

        event.preventDefault();
        event.stopPropagation();


        if (event.deltaY < 0) {

            targetScale += 0.15;

        } else {

            targetScale -= 0.15;

        }


        targetScale = Math.max(
            minScale,
            Math.min(maxScale, targetScale)
        );


        /*
         * Si on revient à 100 %,
         * on recentre l'image.
         */

        if (targetScale === minScale) {

            translateX = 0;
            translateY = 0;

        }


        startZoomAnimation();

    }, { passive: false });


    /* =========================
       COMMENCER LE DÉPLACEMENT
    ========================= */

    lightboxImage.addEventListener("mousedown", event => {

        /*
         * Déplacement uniquement
         * lorsque l'image est zoomée.
         */

        if (scale <= 1) {
            return;
        }


        isDragging = true;


        startX = event.clientX;
        startY = event.clientY;


        initialX = translateX;
        initialY = translateY;


        lightboxImage.style.cursor = "grabbing";


        event.preventDefault();

    });


    /* =========================
       DÉPLACER L'IMAGE
    ========================= */

    document.addEventListener("mousemove", event => {

        if (!isDragging) {
            return;
        }


        translateX =
            initialX +
            (event.clientX - startX);


        translateY =
            initialY +
            (event.clientY - startY);


        updateImage();

    });


    /* =========================
       ARRÊTER LE DÉPLACEMENT
    ========================= */

    document.addEventListener("mouseup", () => {

        if (!isDragging) {
            return;
        }


        isDragging = false;


        lightboxImage.style.cursor =
            scale > 1
                ? "grab"
                : "default";

    });


    /* =========================
       FERMER
    ========================= */

    function closeLightbox() {

        lightbox.classList.remove("active");


        scale = 1;
        targetScale = 1;


        translateX = 0;
        translateY = 0;


        isDragging = false;


        if (animationFrame) {

            cancelAnimationFrame(animationFrame);

            animationFrame = null;

        }


        updateImage();


        lightboxImage.style.cursor = "default";


        unlockScroll();

    }


    /* =========================
       BOUTON FERMER
    ========================= */

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    /* =========================
       CLIC SUR LE FOND
    ========================= */

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    /* =========================
       ESC
    ========================= */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    });

});