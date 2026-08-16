const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
    smoothTouch: false
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);