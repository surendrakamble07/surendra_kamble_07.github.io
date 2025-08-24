// 3D Cloud Portfolio - Interactive JavaScript

class CloudPortfolio {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.createParticles();
        this.setupParallax();
        this.animateSkills();
    }

    init() {
        // Initialize variables
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.contactForm = document.getElementById('contact-form');
        this.particles = document.getElementById('particles');
        
        // Mouse position for parallax
        this.mouseX = 0;
        this.mouseY = 0;
        
        // Performance optimization
        this.ticking = false;
        
        // Mobile detection
        this.isMobile = window.innerWidth <= 768;
        
        console.log('Cloud Portfolio initialized');
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Mobile menu toggle
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Contact form submission
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                this.handleFormSubmit(e);
            });
        }

        // Mouse movement for parallax (desktop only)
        if (!this.isMobile) {
            document.addEventListener('mousemove', (e) => {
                this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                this.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
                this.requestTick();
            });
        }

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Project card interactions
        this.setupProjectCards();

        // CTA button interactions
        this.setupCTAButtons();
    }

    setupIntersectionObserver() {
        // Create intersection observer for animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.skill-item, .project-card, .contact-card, .about-card');
        animateElements.forEach(el => {
            this.observer.observe(el);
        });
    }

    createParticles() {
        if (!this.particles || this.isMobile) return;

        // Create floating data particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00ccff;
                border-radius: 50%;
                box-shadow: 0 0 10px #00ccff;
                opacity: 0.7;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${5 + Math.random() * 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            this.particles.appendChild(particle);
        }

        // Add particle animation keyframes
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes particleFloat {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px) scale(1);
                        opacity: 0.7;
                    }
                    25% { 
                        transform: translateY(-20px) translateX(10px) scale(1.2);
                        opacity: 1;
                    }
                    50% { 
                        transform: translateY(-10px) translateX(-5px) scale(0.8);
                        opacity: 0.5;
                    }
                    75% { 
                        transform: translateY(-30px) translateX(15px) scale(1.1);
                        opacity: 0.9;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupParallax() {
        if (this.isMobile) return;

        this.parallaxElements = [
            { el: document.querySelector('.cloud-1'), speed: 0.5 },
            { el: document.querySelector('.cloud-2'), speed: -0.3 },
            { el: document.querySelector('.cloud-3'), speed: 0.7 },
            { el: document.querySelector('.cloud-4'), speed: -0.4 },
            { el: document.querySelector('.server-1'), speed: 0.2 },
            { el: document.querySelector('.server-2'), speed: -0.2 },
            { el: document.querySelector('.hero-visual'), speed: 0.1 }
        ];
    }

    updateParallax() {
        if (this.isMobile || !this.parallaxElements) return;

        this.parallaxElements.forEach(item => {
            if (item.el) {
                const x = this.mouseX * item.speed * 20;
                const y = this.mouseY * item.speed * 20;
                item.el.style.transform += ` translate3d(${x}px, ${y}px, 0)`;
            }
        });
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateParallax();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    animateElement(element) {
        if (element.classList.contains('.skill-item')) {
            this.animateSkillBar(element);
        }
        
        // Add entrance animations
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    animateSkillBar(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        if (progressBar) {
            const level = skillItem.dataset.level;
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.transition = 'width 2s ease';
                progressBar.style.width = level + '%';
            }, 500);
        }
    }

    setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add hover sound effect simulation
            card.addEventListener('mouseenter', () => {
                if (!this.isMobile) {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                    card.style.transition = 'all 0.3s ease';
                    
                    // Add glow effect
                    card.style.boxShadow = '0 20px 40px rgba(0, 204, 255, 0.3)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (!this.isMobile) {
                    card.style.transform = 'translateY(0) scale(1)';
                    card.style.boxShadow = 'none';
                }
            });

            // Touch events for mobile
            if (this.isMobile) {
                card.addEventListener('touchstart', (e) => {
                    card.classList.add('touch-active');
                });

                card.addEventListener('touchend', (e) => {
                    setTimeout(() => {
                        card.classList.remove('touch-active');
                    }, 150);
                });
            }
        });
    }

    setupCTAButtons() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.animateButton(button);
            });

            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    animateButton(button) {
        const glow = button.querySelector('.btn-glow');
        if (glow) {
            glow.style.left = '-100%';
            setTimeout(() => {
                glow.style.transition = 'left 0.6s ease';
                glow.style.left = '100%';
            }, 50);
        }
    }

    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Add ripple animation if not exists
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = this.hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.transform = this.navMenu.classList.contains('active') 
                ? `rotate(${index === 1 ? 0 : index === 0 ? 45 : -45}deg) translate(${index === 1 ? 0 : index === 0 ? 6 : -6}px, ${index === 1 ? 0 : index === 0 ? 6 : -6}px)`
                : 'none';
        });

        // Close menu when clicking on links
        if (this.navMenu.classList.contains('active')) {
            const navLinks = this.navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.toggleMobileMenu();
                });
            });
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;

        // Navbar background opacity
        if (this.navbar) {
            const opacity = Math.min(scrollTop / 100, 1);
            this.navbar.style.background = `rgba(255, 255, 255, ${0.05 + opacity * 0.1})`;
        }

        // Parallax scrolling for background elements
        if (!this.isMobile) {
            const clouds = document.querySelectorAll('.floating-cloud');
            clouds.forEach((cloud, index) => {
                const speed = 0.5 + (index * 0.1);
                cloud.style.transform += ` translateY(${scrollTop * speed}px)`;
            });
        }

        // Update active navigation link
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simulate form submission
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #00cc66, #00ff88)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                this.contactForm.reset();
            }, 2000);
        }, 1500);

        console.log('Form submitted:', { name, email, message });
    }

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;

        // Reinitialize particles if switching from mobile to desktop
        if (wasMobile && !this.isMobile) {
            this.createParticles();
            this.setupParallax();
        }

        // Clear particles if switching to mobile
        if (!wasMobile && this.isMobile && this.particles) {
            this.particles.innerHTML = '';
        }
    }

    // Utility function for smooth animations
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    // Add floating animation to elements
    addFloatingAnimation(element, duration = 6000, distance = 20) {
        let start = null;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = (elapsed % duration) / duration;
            
            const y = Math.sin(progress * Math.PI * 2) * distance;
            element.style.transform += ` translateY(${y}px)`;
            
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }

    // Performance monitoring
    checkPerformance() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
        }
    }
}

// Global utility functions
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Cloud Portfolio...');
    window.cloudPortfolio = new CloudPortfolio();
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Add CSS for touch interactions and loading states
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .project-card.touch-active {
        transform: translateY(-5px) scale(1.02) !important;
        box-shadow: 0 15px 30px rgba(0, 204, 255, 0.2) !important;
    }
    
    .nav-link.active {
        color: var(--neon-blue) !important;
        text-shadow: 0 0 10px var(--neon-blue) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
    
    @media (max-width: 768px) {
        .floating-cloud, .server-rack {
            display: none;
        }
        
        .hero-visual {
            transform: scale(0.8);
        }
        
        .project-card {
            height: auto;
        }
        
        .project-card:hover .project-card-inner {
            transform: none;
        }
        
        .project-back {
            position: relative;
            transform: none;
            margin-top: 1rem;
            height: auto;
        }
    }
`;
document.head.appendChild(additionalStyles);

// Add service worker for performance (if supported)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // This would register a service worker in a production environment
        console.log('Service Worker support detected');
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CloudPortfolio;
}