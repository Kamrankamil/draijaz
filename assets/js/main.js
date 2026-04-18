// Register Service Worker for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('Service Worker registration failed: ', err);
        });
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll to Appointment Function
function scrollToAppointment() {
    const appointmentSection = document.querySelector('.appointment-section');
    if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Appointment Form Handling
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            clinic: document.getElementById('clinic').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };

        // Here you would normally send this to a server
        console.log('Appointment Form Data:', formData);
        
        // Show success message
        alert(`Thank you, ${formData.name}! Your appointment request has been received. We will call you on ${formData.phone} to confirm.`);
        
        // Reset form
        appointmentForm.reset();
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            message: contactForm.querySelector('textarea').value
        };

        console.log('Contact Form Data:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll for elements
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

// Observe specialty cards and review cards
const cardElements = document.querySelectorAll('.specialty-card, .review-card, .service-item, .clinic-card');
cardElements.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Phone number click handler (for mobile)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow default behavior on mobile, prevent on desktop
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            e.preventDefault();
            alert('Phone number: ' + link.textContent);
        }
    });
});

// Dynamically add year to footer
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const footerBottomText = document.querySelector('.footer-bottom p');
    if (footerBottomText) {
        footerBottomText.innerHTML = `&copy; ${year} Dr. Aijaz Ahmed. All rights reserved. | PMDC Verified Professional`;
    }
});

// Prevent form submission in demo mode and provide feedback
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && (e.target.tagName === 'TEXTAREA')) {
        // Allow textarea to have new lines
        return;
    }
});

// Add typing animation for hero text
const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle && heroTitle.textContent) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            heroTitle.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, 50);
}

// Add scroll-to-top button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.className = 'scroll-to-top';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.style.display = 'flex';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseover', () => {
    scrollTopButton.style.backgroundColor = '#1e40af';
    scrollTopButton.style.transform = 'scale(1.1)';
});

scrollTopButton.addEventListener('mouseout', () => {
    scrollTopButton.style.backgroundColor = '#2563eb';
    scrollTopButton.style.transform = 'scale(1)';
});
