// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Add keyboard support
        this.themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update icon
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        
        // Update aria-label
        this.themeToggle.setAttribute('aria-label', 
            `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
        );
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Add visual feedback
        this.themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 150);
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.cards = document.querySelectorAll('.product-card');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Create intersection observer for fade-in animations
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );
        
        // Observe all cards
        this.cards.forEach(card => {
            this.observer.observe(card);
        });
        
        // Add initial fade-in animation
        this.animateCardsOnLoad();
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateCardsOnLoad() {
        // Trigger animations with staggered delay
        this.cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }
}

// Card Interaction Manager
class CardManager {
    constructor() {
        this.cards = document.querySelectorAll('.product-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            this.setupCardInteractions(card);
        });
    }
    
    setupCardInteractions(card) {
        const button = card.querySelector('.btn-primary');
        const image = card.querySelector('.card-image img');
        
        // Add click handler for view details button
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleViewDetails(card);
        });
        
        // Add keyboard support for cards
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleViewDetails(card);
            }
        });
        
        // Add loading state for images
        image.addEventListener('load', () => {
            card.classList.remove('loading');
        });
        
        // Add error handling for images
        image.addEventListener('error', () => {
            this.handleImageError(image);
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', () => {
            this.addHoverEffect(card);
        });
    }
    
    handleViewDetails(card) {
        const title = card.querySelector('.card-title').textContent;
        const price = card.querySelector('.card-price').textContent;
        
        // Add click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Show alert (in a real app, this would navigate to product page)
        alert(`Viewing details for: ${title}\nPrice: ${price}`);
    }
    
    handleImageError(image) {
        // Replace with placeholder if image fails to load
        image.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxNzVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K';
        image.alt = 'Image not found';
    }
    
    addHoverEffect(card) {
        // Add subtle pulse effect on hover
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = '';
        }, 10);
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            this.logPerformance();
        });
        
        // Add smooth scrolling for better UX
        this.addSmoothScrolling();
    }
    
    logPerformance() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }
    }
    
    addSmoothScrolling() {
        // Add smooth scrolling to any anchor links
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
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add focus management
        this.setupFocusManagement();
        
        // Add reduced motion support
        this.handleReducedMotion();
        
        // Add keyboard navigation
        this.setupKeyboardNavigation();
    }
    
    setupFocusManagement() {
        // Ensure focus is visible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    handleReducedMotion() {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    setupKeyboardNavigation() {
        // Add keyboard navigation for cards
        const cards = document.querySelectorAll('.product-card');
        
        cards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Product card ${index + 1}`);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new ThemeManager();
    new AnimationManager();
    new CardManager();
    new PerformanceMonitor();
    new AccessibilityManager();
    
    // Add loading class initially
    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.add('loading');
    });
    
    console.log('Product Gallery initialized successfully!');
});
