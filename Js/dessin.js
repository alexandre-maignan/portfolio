const images = document.querySelectorAll(".drawing-card img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.getElementById("lightbox-close");


/* =========================
   OUVRIR L'IMAGE
========================= */

images.forEach(function(image) {

    image.addEventListener("click", function() {

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.style.display = "flex";

    });

});


/* =========================
   FERMER
========================= */

closeButton.addEventListener("click", function() {

    lightbox.style.display = "none";

});


/* =========================
   FERMER EN CLIQUANT AUTOUR
========================= */

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        lightbox.style.display = "none";

    }

});


/* =========================
   FERMER AVEC ÉCHAP
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        lightbox.style.display = "none";

    }

});