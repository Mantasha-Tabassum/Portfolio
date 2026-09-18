// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// EmailJS setup
emailjs.init('rY9NGa9OW6lyPBtZJ');

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
    if (!typingText) return;

    const currentText = textArray[textIndex];
    charIndex += isDeleting ? -1 : 1;
    typingText.textContent = currentText.substring(0, charIndex);

    let typingSpeed = isDeleting ? 50 : 100;

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

typeAnimation();

// EmailJS contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.from_name.value.trim();
        const email = this.from_email.value.trim();
        const title = this.subject.value.trim();
        const message = this.message.value.trim();
        const submitButton = this.querySelector('button[type="submit"]');

        if (!name || !email || !title || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // These variable names match the EmailJS template shown in your screenshot:
        // {{name}}, {{email}}, {{title}}, and {{message}}.
        emailjs.send('service_wh6u03r', 'template_05vfvae', {
            name,
            email,
            title,
            message
        })
            .then(() => {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                showNotification('Message could not be sent. Please try again.', 'error');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
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
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Download Resume Button
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        showNotification('Downloading your resume...', 'success');
    });
}

// Active navigation link indicator
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href')?.slice(1) === current
        );
    });
});

const style2 = document.createElement('style');
style2.textContent = `.nav-link.active { color: var(--primary-color); }`;
document.head.appendChild(style2);

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

console.log('Portfolio website loaded successfully! 🚀');
