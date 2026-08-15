document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", function (event) {

            const href = this.getAttribute("href");

            // Ignore les liens qui ne changent pas de page
            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                this.target === "_blank"
            ) {
                return;
            }

            event.preventDefault();

            // Fait disparaître toute la page
            document.body.classList.add("page-exit");

            // Attend la fin de l'animation
            setTimeout(() => {
                window.location.href = href;
            }, 400);

        });

    });

});