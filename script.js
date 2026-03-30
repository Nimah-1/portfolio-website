// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');


hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a, .pill-btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});



// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // No need for sectionHeight in this logic if we just check >= top-150
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            const href = a.getAttribute('href');
            if (current && href === `#${current}`) {
                a.classList.add('active');
            }
        });

        scrollTimeout = null;
    }, 100); // Throttle to run at most every 100ms
});

const observerOptions = {
    threshold: 0.01, // Trigger as soon as 1px is visible
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('is-hidden');
            entry.target.classList.add('animate-in');
        } else {
            // Re-hide when scrolling away to allow repeating animations
            entry.target.classList.remove('animate-in');
            entry.target.classList.add('is-hidden');
        }
    });
}, observerOptions);

// Initialize animations safely
function initAnimations() {
    // Only animate on Desktop
    if (window.innerWidth > 768) {
        document.querySelectorAll('.section, .hero, .card, .timeline-item').forEach(el => {
            if (el.id === 'canva-designs') return;

            el.classList.add('fade-in-section');

            // Check if element is already in viewport
            const rect = el.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.bottom < 0) {
                // Not in view - hide it for animation
                el.classList.add('is-hidden');
            } else {
                // In view - show immediately
                el.classList.add('animate-in');
            }

            observer.observe(el);
        });
    }
}

// Run init on load
window.addEventListener('load', initAnimations);

// Dynamic Greeting based on time (Optional enhancement)
const greetingSpan = document.querySelector('.greeting');
const hour = new Date().getHours();
let greetingText = "Hello, I'm";

if (hour >= 5 && hour < 12) {
    greetingText = "Good Morning, I'm";
} else if (hour >= 12 && hour < 18) {
    greetingText = "Good Afternoon, I'm";
} else {
    greetingText = "Good Evening, I'm";
}

greetingSpan.textContent = greetingText;

// Video Facade Logic
document.querySelectorAll('.video-facade').forEach(facade => {
    const videoSrc = facade.getAttribute('data-src');

    // Auto-generate Cloudinary thumbnail
    if (videoSrc && videoSrc.includes('res.cloudinary.com')) {
        // Replace video extension with .jpg for thumbnail
        // Handles .mp4, .mov, .webm, etc.
        const thumbnailSrc = videoSrc.replace(/\.(mp4|mov|webm|mkv)$/i, '.jpg');

        facade.style.backgroundImage = `url('${thumbnailSrc}')`;
        facade.style.backgroundSize = 'cover';
        facade.style.backgroundPosition = 'center';
    }

    facade.addEventListener('click', function () {
        if (!videoSrc) return;
        const videoElement = document.createElement('video');
        videoElement.src = videoSrc;
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.playsInline = true; // Better mobile experience
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.borderRadius = '15px';

        this.innerHTML = ''; // Clear the placeholder content
        this.appendChild(videoElement);

        // Explicitly call play() which is often required on mobile even with autoplay
        videoElement.play().catch(error => {
            console.log("Video play failed:", error);
        });

        this.classList.remove('video-facade'); // Remove class to prevent re-triggering style
        this.style.cursor = 'default';
        this.style.backgroundImage = 'none';
    }, { once: true });
});
