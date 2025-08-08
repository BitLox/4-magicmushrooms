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

// Function to create and animate spores
function createSpores() {
    const container = document.querySelector('.spores-container');
    const numSpores = 5; // Reduced for performance
    const frag = document.createDocumentFragment();

    for (let i = 0; i < numSpores; i++) {
        const spore = document.createElement('div');
        spore.className = 'spore';

        // Initial position at center of the page
        gsap.set(spore, {
            left: '50%', // Center horizontally
            top: '50%', // Center vertically
            x: -2.5, // Center offset for spore size
            y: -2.5,
            scale: 0.5, // Start small
            opacity: 0
        });

        frag.appendChild(spore);
    }

    container.appendChild(frag); // Add all spores at once

    // Animate each spore
    const spores = gsap.utils.toArray('.spore');
    spores.forEach((spore, index) => {
        gsap.to(spore, {
            opacity: 1, // Fade in
            x: Math.random() * 200 - 100, // Random horizontal movement
            y: Math.random() * -200 - 100, // Move upward and outward
            scale: 1.5, // Grow slightly
            duration: Math.random() * 2 + 2, // Random duration 2-4s
            delay: Math.random() * 1 + index * 0.2, // Staggered start
            ease: 'power1.out',
            repeat: -1,
            yoyo: false,
            onRepeat: () => {
                // Reset position for next cycle
                gsap.set(spore, { opacity: 0, x: 0, y: 0, scale: 0.5 });
            }
        });
    });
}

// Animate the mushroom box
gsap.set(".mushroom-box", {
    opacity: 0,
    scale: 0,
});

// Animate the text glows immediately
gsap.to(".top-text", {
    textShadow: "0 0 100px rgba(0, 255, 208, 1), 0 0 20px rgba(0, 255, 208, 0.8)",
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    delay: 0
});

gsap.to(".bottom-text", {
    textShadow: "0 0 100px rgba(0, 255, 208, 1), 0 0 20px rgba(0, 255, 208, 0.8)",
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    delay: 0.75
});

// Animate the glow effect
gsap.to(".glow-image", {
    filter: "drop-shadow(0 0 80px rgba(0, 255, 208, 1))",
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

// Set initial text state
gsap.set(".top-text, .bottom-text", {
    opacity: 0,
    y: 20
});

// Handle image load to trigger animations and spores
const image = document.querySelector('.glow-image');

function startAnimations() {
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
            });
        }
    });
    createSpores(); // Create and animate spores
}

// If image is already loaded (cached), trigger immediately
if (image.complete) {
    startAnimations();
} else {
    image.addEventListener('load', startAnimations);
}

// Smooth scroll snap with GSAP Observer
let animating = false;
let currentIndex = 0;
const sections = gsap.utils.toArray(".section");
let lastScrollTime = 0;
const debounceTime = 200; // Debounce duration in ms

Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -0.5, // Reduced sensitivity
    onDown: () => {
        const now = Date.now();
        if (!animating && now - lastScrollTime > debounceTime) {
            lastScrollTime = now;
            gotoSection(currentIndex - 1, -1);
        }
    },
    onUp: () => {
        const now = Date.now();
        if (!animating && now - lastScrollTime > debounceTime) {
            lastScrollTime = now;
            gotoSection(currentIndex + 1, 1);
        }
    },
    tolerance: 50, // Increased for less sensitivity
    preventDefault: true
});

function gotoSection(index, direction) {
    index = gsap.utils.clamp(0, sections.length - 1, index); // Clamp to valid range
    if (index === currentIndex) return; // Prevent re-snapping to same section
    animating = true;
    currentIndex = index;
    gsap.to(window, {
        scrollTo: { y: sections[index].offsetTop, autoKill: false },
        duration: 1.2, // Slightly longer for smoother feel
        ease: "power2.inOut",
        onComplete: () => {
            animating = false;
        }
    });
}