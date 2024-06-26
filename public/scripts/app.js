/*
 * Registra o Service Worker.
 */
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("/scripts/sw.js").then(
            function (registration) {
                console.log(
                    `ServiceWorker registration successful with scope: ${registration.scope}`,
                );
            },
            function (err) {
                console.error(`ServiceWorker registration failed: ${err}`);
            },
        );
    });
}
