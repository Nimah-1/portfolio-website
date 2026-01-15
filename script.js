// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.classList.contains(current)) {
            // Optional: if classes match id strictly
        }
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        } else {
            entry.target.classList.remove('animate-in'); // Reset animation when out of view
        }
    });
}, observerOptions);

// Add animation class to sections
document.querySelectorAll('.section, .hero, .card, .timeline-item').forEach(el => {
    el.classList.add('fade-in-section');
    observer.observe(el);
});

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
