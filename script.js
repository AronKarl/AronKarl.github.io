// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun theme-icon';
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.className = 'fas fa-robot theme-icon';
}

// Heavy Rain Effect Function with Dark Clouds
function createRainEffect() {
    const rainContainer = document.getElementById('rain-container');
    if (!rainContainer) return;
    
    // Clear existing rain
    const existingDrops = rainContainer.querySelectorAll('.rain-drop');
    existingDrops.forEach(drop => drop.remove());
    
    // Create heavy rain drops (more drops for heavy rain)
    const rainCount = 200;
    for (let i = 0; i < rainCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 0.8 + 0.3) + 's';
        drop.style.animationDelay = Math.random() * 1 + 's';
        drop.style.opacity = Math.random() * 0.4 + 0.5;
        drop.style.width = (Math.random() * 2 + 2) + 'px';
        drop.style.height = (Math.random() * 10 + 20) + 'px';
        rainContainer.appendChild(drop);
    }
    
    // Create dark clouds
    const cloudsContainer = document.getElementById('clouds-container');
    if (cloudsContainer) {
        cloudsContainer.innerHTML = '';
        for (let i = 1; i <= 4; i++) {
            const cloud = document.createElement('div');
            cloud.className = `cloud cloud-${i}`;
            cloudsContainer.appendChild(cloud);
        }
    }
}

// Thunderstorm Effect Function with Clouds
function createThunderstormEffect() {
    const thunderContainer = document.getElementById('thunderstorm-container');
    if (!thunderContainer) return;
    
    // Clear existing thunder drops
    const existingDrops = thunderContainer.querySelectorAll('.thunder-drop');
    existingDrops.forEach(drop => drop.remove());
    
    // Create thunder rain drops
    const thunderCount = 180;
    for (let i = 0; i < thunderCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'thunder-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 0.6 + 0.3) + 's';
        drop.style.animationDelay = Math.random() * 1 + 's';
        drop.style.opacity = Math.random() * 0.3 + 0.4;
        drop.style.width = (Math.random() * 2 + 3) + 'px';
        drop.style.height = (Math.random() * 10 + 25) + 'px';
        thunderContainer.appendChild(drop);
    }
    
    // Create dark clouds for thunderstorm
    const darkCloudsContainer = document.getElementById('dark-clouds-container');
    if (darkCloudsContainer) {
        darkCloudsContainer.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const cloud = document.createElement('div');
            cloud.className = `dark-cloud dark-cloud-${i}`;
            darkCloudsContainer.appendChild(cloud);
        }
    }
}

// Lightning Flash Effect
function triggerLightning() {
    const lightning = document.querySelector('.lightning');
    if (!lightning) return;
    
    // Random lightning flashes
    setInterval(() => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            lightning.style.opacity = '0';
            setTimeout(() => {
                lightning.style.opacity = '0.8';
                lightning.style.boxShadow = '0 0 200px rgba(255, 255, 255, 0.9)';
            }, 50);
            setTimeout(() => {
                lightning.style.opacity = '0';
            }, 100);
        }
    }, Math.random() * 3000 + 2000);
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.className = 'fas fa-robot theme-icon';
        createRainEffect();
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.className = 'fas fa-sun theme-icon';
        createThunderstormEffect();
        triggerLightning();
    }
});

// Initialize effects based on current theme
document.addEventListener('DOMContentLoaded', () => {
    if (currentTheme === 'light') {
        createRainEffect();
    } else {
        createThunderstormEffect();
        triggerLightning();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // About content (includes description and grid)
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        observer.observe(aboutContent);
    }

    // Skills categories
    const skillsCategories = document.querySelectorAll('.skills-category');
    skillsCategories.forEach((category, index) => {
        setTimeout(() => {
            observer.observe(category);
        }, index * 100);
    });

    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 200);
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Form submission handler
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        // Validate form
        if (!name || !email || !message) {
            return;
        }
        
        // Show sending state
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;
        
        // Simulate form submission (same logic as PHP version)
        setTimeout(() => {
            // Show success message (same as PHP version)
            successMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = 'Send Message';
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }, 1000);
    });
}


// Profile image hover effect enhancement
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('mouseenter', () => {
        profileImage.style.transform = 'scale(1.05) rotate(5deg)';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Skill card click animation
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    });
});

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add ripple effect to buttons
document.querySelectorAll('button, .social-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
