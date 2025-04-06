gsap.registerPlugin(ScrollTrigger);

// gsap animation
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.intro',
        start: 'top top',
        end: 'bottom center',
        scrub: true,
        markers: false,
        pin: true,
        pinSpacing: false
    }
});

tl.to('.intro', {
    y: -1000
});

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);