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