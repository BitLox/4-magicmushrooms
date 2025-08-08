// Function to create the starry background
function createStarryBackground() {
    const container = document.querySelector('.stars-container');
    const numStars = 300; // Adjust for more/less stars
    const frag = document.createDocumentFragment(); // For performance: batch DOM additions

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position
        gsap.set(star, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0.5 // Start small
        });

        frag.appendChild(star);
    }

    container.appendChild(frag); // Add all at once

    // Animate the stars
    const stars = gsap.utils.toArray('.star');
    stars.forEach(star => {
        gsap.to(star, {
            opacity: 1,
            scale: 1,
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

// Initialize starry background
createStarryBackground();

// Animate the text glows immediately
gsap.to(".top-text", {
    textShadow: "0 0 100px rgba(0, 255, 208, 1), 0 0 20px rgba(0, 255, 208, 0.8)", // 5x stronger, layered glow
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    delay: 0,
    onStart: () => console.log("Top text glow started"),
    onUpdate: () => console.log("Top text glow updating: ", gsap.getProperty(".top-text", "textShadow"))
});

gsap.to(".bottom-text", {
    textShadow: "0 0 100px rgba(0, 255, 208, 1), 0 0 20px rgba(0, 255, 208, 0.8)", // 5x stronger, layered glow
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    delay: 0.75,
    onStart: () => console.log("Bottom text glow started"),
    onUpdate: () => console.log("Bottom text glow updating: ", gsap.getProperty(".bottom-text", "textShadow"))
});

// Animate the mushroom box
gsap.set(".mushroom-box", {
    opacity: 0,
    scale: 0,
});

// Wait for the image to load before animating
const image = document.querySelector('.glow-image');
image.addEventListener('load', () => {
    gsap.to(".mushroom-box", {
        duration: 4,
        scale: 1,
        opacity: 1,
        onComplete: () => {
            gsap.to(".top-text, .bottom-text", {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power2.out",
                onStart: () => console.log("Text fade-in started")
            });
        }
    });
});

// Animate the glow effect
gsap.to(".glow-image", {
    filter: "drop-shadow(0 0 80px rgba(0, 255, 208, 1))", // Increased to match text
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    onStart: () => console.log("Image glow started")
});

// Set initial text state
gsap.set(".top-text, .bottom-text", {
    opacity: 0,
    y: 20,
});