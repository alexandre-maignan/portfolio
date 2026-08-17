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

        const duration = 800;

        const navigate = () => {
            window.location.href = href;
        };

        main.addEventListener("animationend", navigate, { once: true });

        // Sécurité si animationend ne se déclenche pas
        setTimeout(navigate, duration + 50);

    });

});