// gsap.method(element, vars obj)

gsap.set(".box", {
    opacity: 0,
    scale: 0,
})

gsap.to(".box", {
    duration: 4,
    scale: 0.6,
    opacity: 1,
})

// gsap.to(".glow-image", {
//     duration: 1.5,
//     boxShadow: "0 0 40px 20px rgba(255, 0, 255, 1)", 
//     repeat: -1, // Loop indefinitely
//     yoyo: true, // Animate back and forth
//     ease: "power1.inOut"
// });

// gsap.to(".glow-image", {
//     dropShadow: "0 0 100px rgba(52, 152, 219, 0)",
//     duration: 1.5,
//     repeat: -1,
//     yoyo: true,
//     ease: "power1.inOut",
// });

gsap.to(".glow-image", {
    filter: "drop-shadow(0 0 40px rgba(0, 255, 208, 0.97))", 
    duration: 1.5,
    repeat: -1, // Loop indefinitely
    yoyo: true, // Animate back and forth
    ease: "power1.inOut",
});