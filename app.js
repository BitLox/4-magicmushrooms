// Register plugins at the top
gsap.registerPlugin(ScrollToPlugin);

// Initialize Thpace background
const canvas = document.querySelector("#thpace-bg");
const settings = {
  colors: ["#310078", "#000000", "#681884"],
  triangleSize: 90,
};
try {
  if (typeof Thpace !== 'undefined') {
    Thpace.create(canvas, settings);
  } else {
    console.error("Thpace not loaded. Check CDN or script inclusion.");
  }
} catch (e) {
  console.error("Error initializing Thpace:", e);
}

// Function to create and animate spores
function createSpores() {
  const container = document.querySelector(".spores-container");
  const numSpores = 5; // Reduced for performance
  const frag = document.createDocumentFragment();
  for (let i = 0; i < numSpores; i++) {
    const spore = document.createElement("div");
    spore.className = "spore";
    // Initial position at center of the page
    gsap.set(spore, {
      left: "50%", // Center horizontally
      top: "50%", // Center vertically
      x: -2.5, // Center offset for spore size
      y: -2.5,
      scale: 0.5, // Start small
      opacity: 0,
    });
    frag.appendChild(spore);
  }
  container.appendChild(frag); // Add all spores at once
  // Animate each spore
  const spores = gsap.utils.toArray(".spore");
  spores.forEach((spore, index) => {
    gsap.to(spore, {
      opacity: 1, // Fade in
      x: Math.random() * 200 - 100, // Random horizontal movement
      y: Math.random() * -200 - 100, // Move upward and outward
      scale: 1.5, // Grow slightly
      duration: Math.random() * 2 + 2, // Random duration 2-4s
      delay: Math.random() * 1 + index * 0.2, // Staggered start
      ease: "power1.out",
      repeat: -1,
      yoyo: false,
      onRepeat: () => {
        // Reset position for next cycle
        gsap.set(spore, { opacity: 0, x: 0, y: 0, scale: 0.5 });
      },
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
  delay: 0,
});
gsap.to(".bottom-text", {
  textShadow: "0 0 100px rgba(0, 255, 208, 1), 0 0 20px rgba(0, 255, 208, 0.8)",
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
  delay: 0.75,
});
// Animate the glow effect for main image
gsap.to(".glow-image", {
  filter: "drop-shadow(0 0 80px rgba(0, 255, 208, 1))",
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});
// Set initial halo position and animate rotation
gsap.set(".halo-image", {
  xPercent: -50,
  yPercent: -50,
  transformOrigin: "center center"
});
gsap.to(".halo-image", {
  // rotation: 360, // Full rotation in degrees
  rotationY: 360,
  duration: 2, // 20 RPM = 1 rotation every 3 seconds
  // repeat: 1, // Infinite loop
  ease: "none", // Steady rotation
  force3D: true, // Enable hardware acceleration
});

gsap.to(".halo-image", {
  rotation: 360, // Full rotation in degrees
  duration: 3, // 20 RPM = 1 rotation every 3 seconds
  repeat: -1, // Infinite loop
  ease: "none", // Steady rotation
  force3D: true, // Enable hardware acceleration
  onStart: () => console.log("Halo rotation animation started"),
  onUpdate: () => {
    const style = window.getComputedStyle(document.querySelector(".halo-image"));
    const transform = style.transform || style.webkitTransform;
    console.log("Halo transform:", transform); // Log full transform matrix
  }
});



// Set initial text state
gsap.set(".top-text, .bottom-text", {
  opacity: 0,
  y: 20,
});
// Handle image loads (wait for both)
const glowImage = document.querySelector(".glow-image");
const haloImage = document.querySelector(".halo-image");

function startAnimations() {
  gsap.to(".mushroom-box", {
    duration: 2,
    scale: 0.7,
    opacity: 1,
    onComplete: () => {
      gsap.to(".top-text, .bottom-text", {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
      });
    },
  });
  createSpores(); // Create and animate spores
}

// Wait for both images to load
Promise.all([
  glowImage.complete ? Promise.resolve() : new Promise(resolve => glowImage.addEventListener("load", resolve)),
  haloImage.complete ? Promise.resolve() : new Promise(resolve => haloImage.addEventListener("load", resolve))
]).then(() => {
  startAnimations();
}).catch(e => {
  console.error("Error loading images:", e);
  startAnimations(); // Proceed anyway to avoid stalling
});

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
  preventDefault: true,
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
    },
  });
}