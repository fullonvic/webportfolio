// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Active Navigation Link Highlight =====
const sections = document.querySelectorAll('.section, .hero');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (name && email && message) {
        // Show success message (you can replace with actual form submission)
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

(function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    const icon = darkModeToggle.querySelector('i');
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    } else if (prefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateIcon('dark');
        localStorage.setItem('theme', 'dark');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
        
        // Optional: Add a smooth transition animation
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
    
    // Optional: Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            updateIcon(newTheme);
        }
    });
})();

// ===== CV Download Functionality =====
(function() {
    const cvButtons = document.querySelectorAll('[download]');
    
    cvButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track CV download (optional analytics)
            console.log('CV Download initiated');
            
            // Add a small animation or feedback
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = 'none';
                setTimeout(() => {
                    icon.style.animation = 'bounce 0.5s ease';
                }, 10);
            }
            
            // Optional: Show a success message
            showDownloadNotification('Downloading CV...');
            
            // Let the download proceed naturally
            // The download attribute will handle the file download
        });
    });
    
    // Optional: Show notification
    function showDownloadNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: var(--color-primary);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(50px)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
})();

// ===== Intersection Observer for Animations (optional) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards and skill categories
document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

console.log('🚀 Portfolio loaded successfully!');