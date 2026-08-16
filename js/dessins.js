const images = document.querySelectorAll(".drawing-card img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.getElementById("lightbox-close");


/* =========================
   VARIABLES
========================= */

let zoom = 1;
let targetZoom = 1;

let positionX = 0;
let positionY = 0;

let isDragging = false;

let startX = 0;
let startY = 0;

let mouseX = 0;
let mouseY = 0;


/* =========================
   OUVRIR
========================= */

images.forEach(function(image) {

    image.addEventListener("click", function() {

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        zoom = 1;
        targetZoom = 1;

        positionX = 0;
        positionY = 0;

        lightboxImage.classList.remove("zoomed");

        lightbox.classList.add("active");

        updateImage();

    });

});


/* =========================
   ZOOM AVEC LA MOLETTE
========================= */

lightbox.addEventListener("wheel", function(event) {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    event.preventDefault();

    /*
       Position de la souris
       par rapport au centre de l'écran
    */

    const rect = lightboxImage.getBoundingClientRect();

    mouseX = event.clientX - (rect.left + rect.width / 2);
    mouseY = event.clientY - (rect.top + rect.height / 2);


    /*
       Sens du zoom
    */

    if (event.deltaY < 0) {

        targetZoom *= 1.15;

    } else {

        targetZoom /= 1.15;

    }


    /*
       Limites
    */

    targetZoom = Math.max(
        1,
        Math.min(4, targetZoom)
    );


    /*
       Si retour à 1x :
       on recentre
    */

    if (targetZoom === 1) {

        positionX = 0;
        positionY = 0;

        lightboxImage.classList.remove("zoomed");

    } else {

        lightboxImage.classList.add("zoomed");

    }

}, { passive: false });


/* =========================
   ANIMATION FLUIDE
========================= */

function animate() {

    /*
       Interpolation douce
    */

    zoom += (targetZoom - zoom) * 0.12;


    /*
       Évite les micro-décalages
    */

    if (Math.abs(targetZoom - zoom) < 0.001) {
        zoom = targetZoom;
    }


    updateImage();

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);


/* =========================
   MISE À JOUR
========================= */

function updateImage() {

    lightboxImage.style.transform =
        `translate3d(${positionX}px, ${positionY}px, 0) scale(${zoom})`;

}


/* =========================
   DÉPLACEMENT
========================= */

lightboxImage.addEventListener("mousedown", function(event) {

    if (zoom <= 1) {
        return;
    }

    isDragging = true;

    startX = event.clientX - positionX;
    startY = event.clientY - positionY;

    lightboxImage.style.cursor = "grabbing";

});


document.addEventListener("mousemove", function(event) {

    if (!isDragging) {
        return;
    }

    positionX = event.clientX - startX;
    positionY = event.clientY - startY;

    updateImage();

});


document.addEventListener("mouseup", function() {

    isDragging = false;

    if (zoom > 1) {
        lightboxImage.style.cursor = "grab";
    }

});


/* =========================
   FERMER
========================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    zoom = 1;
    targetZoom = 1;

    positionX = 0;
    positionY = 0;

    lightboxImage.classList.remove("zoomed");

    lightboxImage.style.transform =
        "translate3d(0, 0, 0) scale(1)";
}


/* =========================
   BOUTON FERMER
========================= */

closeButton.addEventListener("click", closeLightbox);


/* =========================
   CLIQUER SUR LE FOND
========================= */

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* =========================
   ÉCHAP
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeLightbox();
    }

});
















/* ==================================================
   LAZY LOADING — GALERIE
================================================== */

const galleryImages = document.querySelectorAll(".drawing-card img");

galleryImages.forEach((image, index) => {

    if (index >= 3) {
        image.setAttribute("loading", "lazy");
    }

});