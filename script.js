// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Typing Animation
const typingText = document.querySelector('.typing-text');
const textArray = [
    'Web Developer | Problem Solver | Tech Enthusiast',
    'HTML5 | CSS3 | JavaScript Developer',
    'Building Amazing Web Experiences',
    'Always Learning, Always Growing'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    
    typingText.textContent = currentText.substring(0, charIndex);
    
    let typingSpeed = 100;
    
    if (isDeleting) {
        typingSpeed = 50;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeAnimation, typingSpeed);
}

// Start typing animation
typeAnimation();

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Show success message
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            
            // Clear form
            this.reset();
            
            // In a real application, you would send this data to a server
            console.log({
                name,
                email,
                subject,
                message
            });
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Download Resume Button
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Resume download started! (This is a demo)', 'success');
        // In a real application, you would initiate an actual file download
    });
}

// Active navigation link indicator
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style to nav links
const style2 = document.createElement('style');
style2.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
`;
document.head.appendChild(style2);

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

body.style.opacity = '0';
body.style.transition = 'opacity 0.5s ease-in';

setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

// Prevent right-click context menu (optional)
// Uncomment if you want to protect your portfolio
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
//     showNotification('Right-click is disabled on this page', 'error');
// });

console.log('Portfolio website loaded successfully! 🚀');