// ===== Professional JavaScript Enhancements =====

// 1. Typing Effect for Hero Title
class TypeWriter {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isDeleting = false;
        this.pauseDuration = 2000;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const current = this.isDeleting ? 
            this.text.substring(0, this.index - 1) : 
            this.text.substring(0, this.index + 1);

        this.element.textContent = current;

        if (!this.isDeleting && current === this.text) {
            setTimeout(() => {
                this.isDeleting = true;
                this.type();
            }, this.pauseDuration);
        } else if (this.isDeleting && current === '') {
            this.isDeleting = false;
            this.index = 0;
            setTimeout(() => this.type(), 500);
        } else {
            this.index = this.isDeleting ? this.index - 1 : this.index + 1;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// 2. Scroll Progress Indicator
class ScrollProgress {
    constructor() {
        this.progressBar = this.createProgressBar();
        this.updateProgress();
        this.init();
    }

    createProgressBar() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        bar.innerHTML = '<div class="scroll-progress__bar"></div>';
        document.body.appendChild(bar);
        return bar;
    }

    updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        this.progressBar.querySelector('.scroll-progress__bar').style.width = scrollPercent + '%';
    }

    init() {
        window.addEventListener('scroll', () => this.updateProgress());
    }
}

// 3. Advanced Smooth Scroll with Easing
class SmoothScroll {
    constructor() {
        this.init();
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    scrollTo(target, duration = 800) {
        const startPosition = window.pageYOffset;
        const targetPosition = target - document.querySelector('#header').offsetHeight - 20;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = this.easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    init() {
        // Apply to all navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    this.scrollTo(target.offsetTop);
                }
            });
        });
    }
}

// 4. Intersection Observer for Performance
class PerformanceObserver {
    constructor() {
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        this.init();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Lazy load images if needed
                    if (entry.target.tagName === 'IMG' && entry.target.dataset.src) {
                        entry.target.src = entry.target.dataset.src;
                        entry.target.removeAttribute('data-src');
                    }
                }
            });
        }, this.options);

        // Observe all sections and cards
        document.querySelectorAll('section, .section-group, .degree-card, .job-card').forEach(el => {
            observer.observe(el);
        });
    }

    init() {
        this.observeElements();
    }
}

// 5. Keyboard Navigation Enhancement
class KeyboardNavigation {
    constructor() {
        this.init();
    }

    handleKeyboard(e) {
        // Press '/' to focus search (if search exists)
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            // Focus search input or show search overlay
        }

        // Press 'Escape' to close modals/menus
        if (e.key === 'Escape') {
            document.querySelector('.nav__menu.active')?.classList.remove('active');
        }

        // Press 'Home' to scroll to top
        if (e.key === 'Home' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Press 'End' to scroll to bottom
        if (e.key === 'End' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
}

// 6. Professional Loading Animation
class LoadingAnimation {
    constructor() {
        this.loader = this.createLoader();
        this.init();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-dots">
                    <div class="loader-dot"></div>
                    <div class="loader-dot"></div>
                    <div class="loader-dot"></div>
                </div>
                <div class="loader-text">Đang tải</div>
            </div>
        `;
        document.body.appendChild(loader);
        return loader;
    }

    hide() {
        this.loader.classList.add('hide');
        setTimeout(() => {
            this.loader.remove();
        }, 500);
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => this.hide(), 1000);
        });
    }
}

// 7. Professional Analytics Tracker
class AnalyticsTracker {
    constructor() {
        this.events = [];
        this.init();
    }

    trackEvent(category, action, label = '') {
        const event = {
            category,
            action,
            label,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        this.events.push(event);
        console.log('Analytics Event:', event);
        
        // Send to analytics service (placeholder)
        this.sendToAnalytics(event);
    }

    trackPageView() {
        const pageView = {
            type: 'pageview',
            url: window.location.href,
            title: document.title,
            timestamp: new Date().toISOString(),
            referrer: document.referrer
        };
        
        console.log('Page View:', pageView);
        this.sendToAnalytics(pageView);
    }

    sendToAnalytics(data) {
        // Placeholder for actual analytics service integration
        // In production, this would send to Google Analytics, Mixpanel, etc.
    }

    init() {
        // Track page view
        this.trackPageView();
        
        // Track button clicks
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackEvent('Button', 'Click', btn.textContent.trim());
            });
        });
        
        // Track section views
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.tracked) {
                    entry.target.dataset.tracked = 'true';
                    this.trackEvent('Section', 'View', entry.target.id || entry.target.className);
                }
            });
        });
        
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
}

// 8. Professional Error Handler
class ErrorHandler {
    constructor() {
        this.errors = [];
        this.init();
    }

    handleError(error, context = '') {
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            context,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            userId: this.getUserId()
        };
        
        this.errors.push(errorInfo);
        console.error('Application Error:', errorInfo);
        
        // Send to error tracking service
        this.reportError(errorInfo);
    }

    getUserId() {
        // Generate or retrieve user ID for tracking
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }

    reportError(errorInfo) {
        // Placeholder for error reporting service
        // In production, this would send to Sentry, Bugsnag, etc.
    }

    init() {
        window.addEventListener('error', (e) => {
            this.handleError(e.error, 'Global Error');
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            this.handleError(e.reason, 'Unhandled Promise Rejection');
        });
    }
}

// ===== Initialize All Professional Features =====
const initProfessionalFeatures = () => {
    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero__title--highlight');
    if (heroTitle) {
        new TypeWriter(heroTitle, heroTitle.textContent, 100);
    }
    
    // Initialize scroll progress
    new ScrollProgress();
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Initialize performance observer
    new PerformanceObserver();
    
    // Initialize keyboard navigation
    new KeyboardNavigation();
    
    // Initialize loading animation
    new LoadingAnimation();
    
    // Initialize analytics tracker
    new AnalyticsTracker();
    
    // Initialize error handler
    new ErrorHandler();
};

// Call professional features initialization
initProfessionalFeatures();

// ===== DOM Elements =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const backToTopButton = document.getElementById('back-to-top');
const revealElements = document.querySelectorAll('.reveal');

// Performance optimization variables
let ticking = false;
let lastScrollY = window.scrollY;
const headerHeight = header ? header.offsetHeight : 0;

// ===== Mobile Menu Toggle =====
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// ===== Close Mobile Menu on Link Click =====
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            const icon = navToggle ? navToggle.querySelector('i') : null;
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// ===== Optimized Header Scroll Effect =====
const updateHeader = () => {
    const currentScrollY = window.scrollY;
    
    // Update header class
    if (header) {
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
};

// Throttled scroll handler with requestAnimationFrame
const onScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
};

// Initial call
updateHeader();

// Add optimized scroll event listener with passive: true for better performance
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Back to Top Button =====
// Show/hide button based on scroll position
window.addEventListener('scroll', throttle(() => {
    if (!backToTopButton) return;
    
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}, 100));

// Smooth scroll to top when clicked
if (backToTopButton) {
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Scroll Reveal Animation with Highlights =====
const revealOnScroll = () => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const sections = document.querySelectorAll('section');
    const sectionGroups = document.querySelectorAll('.section-group');
    const cards = document.querySelectorAll('.degree-card, .job-card, .martial-belt-card');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
    
    // Apply highlight effects to sections
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 50 && sectionTop > -windowHeight/2) {
            // Add section highlight classes
            section.classList.add('section-highlight', 'active');
            
            // Special effects for specific sections
            if (section.classList.contains('education-career')) {
                section.classList.add('section-glow');
            }
            
            // Apply effects to section groups within this section
            const groupsInSection = section.querySelectorAll('.section-group');
            groupsInSection.forEach((group, index) => {
                setTimeout(() => {
                    group.classList.add('active');
                }, index * 200);
            });
            
            // Apply effects to cards within this section
            const cardsInSection = section.querySelectorAll('.degree-card, .job-card');
            cardsInSection.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('card-highlight', 'active');
                }, index * 100);
            });
            
            // Special effect for martial arts belt
            const beltCard = section.querySelector('.martial-belt-card');
            if (beltCard) {
                setTimeout(() => {
                    beltCard.classList.add('section-pulse', 'active');
                }, 400);
            }
        } else {
            // Remove classes when section is out of view
            section.classList.remove('section-highlight', 'active', 'section-glow');
        }
    });
};

// Initialize reveal classes
const initRevealAnimations = () => {
    // Hero section
    const heroContent = document.querySelector('.hero__content');
    const heroImage = document.querySelector('.hero__image');
    
    if (heroContent) heroContent.classList.add('reveal-left');
    if (heroImage) heroImage.classList.add('reveal-right');
    
    // Education & Martial Arts
    const educationColumn = document.querySelector('.education-martial__column:first-child');
    const martialColumn = document.querySelector('.education-martial__column:last-child');
    
    if (educationColumn) educationColumn.classList.add('reveal-left');
    if (martialColumn) martialColumn.classList.add('reveal-right');
    
    // Experience cards
    const experienceCards = document.querySelectorAll('.experience__card');
    experienceCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // TikTok items
    const tiktokItems = document.querySelectorAll('.tiktok__item');
    tiktokItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Footer sections
    const footerSections = document.querySelectorAll('.footer__info, .footer__qr, .footer__social');
    footerSections.forEach((section, index) => {
        section.classList.add('reveal');
        section.style.transitionDelay = `${index * 0.1}s`;
    });
};

// ===== Optimized Smooth Scrolling for Navigation Links =====
const smoothScroll = () => {
    if (!navLinks.length) return;
    
    const scrollToElement = (element, duration = 800) => {
        if (!element) return;
        
        const start = window.pageYOffset;
        const target = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        const distance = target - start;
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function (easeInOutCubic)
            const easeInOutCubic = t => t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
            
            window.scrollTo(0, start + distance * easeInOutCubic(progress));
            
            if (timeElapsed < duration) {
                window.requestAnimationFrame(animation);
            }
        };
        
        window.requestAnimationFrame(animation);
    };
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = navToggle ? navToggle.querySelector('i') : null;
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                scrollToElement(targetElement);
            }
        });
    });
};

// ===== Navbar Highlight Effect =====
let activeNavItem = null;
const navMenu = document.querySelector('.nav__menu');
const navHighlight = document.createElement('div');

// Create and style the highlight element
navHighlight.classList.add('nav__highlight');
if (navMenu) {
    navMenu.appendChild(navHighlight);
}

const updateNavHighlight = (element) => {
    if (!element) return;
    
    const navRect = navMenu.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    navHighlight.style.width = `${elementRect.width}px`;
    navHighlight.style.left = `${elementRect.left - navRect.left}px`;
    navHighlight.style.opacity = '1';
};

const updateActiveNavItem = () => {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    // Find current section
    for (const section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
            break;
        }
    }

    // Update active nav item
    if (currentSection) {
        const newActiveItem = document.querySelector(`.nav__link[href="#${currentSection}"]`);
        if (newActiveItem && newActiveItem !== activeNavItem) {
            if (activeNavItem) {
                activeNavItem.classList.remove('active');
            }
            newActiveItem.classList.add('active');
            activeNavItem = newActiveItem;
            updateNavHighlight(newActiveItem);
        }
    }
};

// Initial setup
const initNavHighlight = () => {
    // Set initial active item
    const firstNavItem = document.querySelector('.nav__link');
    if (firstNavItem) {
        firstNavItem.classList.add('active');
        activeNavItem = firstNavItem;
        updateNavHighlight(firstNavItem);
    }
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateActiveNavItem);
    }, { passive: true });
    
    // Update on window resize
    window.addEventListener('resize', () => {
        if (activeNavItem) {
            updateNavHighlight(activeNavItem);
        }
    });
};

// Start the highlight effect
if (navMenu) {
    initNavHighlight();
}

// ===== Lazy Loading for Images =====
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });
};

// ===== Performance Monitoring =====
const measurePerformance = () => {
    // Check page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Log performance metrics
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            console.log('DNS lookup time:', navigation.domainLookupEnd - navigation.domainLookupStart, 'ms');
            console.log('TCP connection time:', navigation.connectEnd - navigation.connectStart, 'ms');
            console.log('Server response time:', navigation.responseEnd - navigation.requestStart, 'ms');
            console.log('DOM processing time:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
        }
    });
};

// ===== Accessibility Enhancements =====
const enhanceAccessibility = () => {
    // Add keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            navToggle.focus();
        }
    });
    
    // Add ARIA labels dynamically
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');
    
    navToggle.addEventListener('click', () => {
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });
};

// ===== Error Handling =====
const handleError = () => {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // You could send this to an error tracking service
    });
    
    // Handle image loading errors
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            console.warn(`Failed to load image: ${img.src}`);
        });
    });
    
    // Handle TikTok script loading errors specifically
    window.addEventListener('error', (e) => {
        if (e.filename && e.filename.includes('tiktok.com/embed.js')) {
            console.warn('TikTok embed script blocked - this is expected with ad blockers');
            // Don't crash the page, just log the warning
            e.preventDefault();
        }
    }, true);
};

// ===== Initialize Everything =====
const init = () => {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeApp();
        });
    } else {
        initializeApp();
    }
};

const initializeApp = () => {
    try {
        initRevealAnimations();
        smoothScroll();
        lazyLoadImages();
        enhanceAccessibility();
        handleError();
        measurePerformance();
        
        // Event listeners
        window.addEventListener('scroll', () => {
            revealOnScroll();
            highlightActiveSection();
        });
        
        // Initial checks
        revealOnScroll();
        highlightActiveSection();
        
        console.log('Website initialized successfully');
        
    } catch (error) {
        console.error('Error initializing website:', error);
    }
};

// ===== Utility Functions =====
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== Service Worker Registration (for PWA) =====
const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
};

// Initialize the application
init();

// Optional: Register service worker for offline capabilities
// registerServiceWorker();
