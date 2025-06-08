// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initPricingToggle();
    initSmoothScrolling();
    initParticleEffect();
    initStepsAnimation();

    initHeatmapToggle();
    initCarousel();
    initLightbox();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.header');
    const hamburger = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation (excluding .step - handled by initStepsAnimation)
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card');
    animateElements.forEach(el => observer.observe(el));
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    const monthlyPeriods = document.querySelectorAll('.monthly-period');
    const yearlyPeriods = document.querySelectorAll('.yearly-period');
    const monthlyTexts = document.querySelectorAll('.monthly-text');
    const yearlyTexts = document.querySelectorAll('.yearly-text');
    
    if (toggle) {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                // Show yearly prices and content
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'inline');
                monthlyPeriods.forEach(period => period.style.display = 'none');
                yearlyPeriods.forEach(period => period.style.display = 'inline');
                monthlyTexts.forEach(text => text.style.display = 'none');
                yearlyTexts.forEach(text => text.style.display = 'inline');
            } else {
                // Show monthly prices and content
                monthlyPrices.forEach(price => price.style.display = 'inline');
                yearlyPrices.forEach(price => price.style.display = 'none');
                monthlyPeriods.forEach(period => period.style.display = 'inline');
                yearlyPeriods.forEach(period => period.style.display = 'none');
                monthlyTexts.forEach(text => text.style.display = 'inline');
                yearlyTexts.forEach(text => text.style.display = 'none');
            }
        });
        
        console.log('✅ Pricing toggle initialized successfully!');
    } else {
        console.log('❌ Pricing toggle element missing');
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Particle effect for hero section
function initParticleEffect() {
    const particles = document.querySelector('.hero-particles');
    
    if (particles) {
        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particles.appendChild(particle);
        }
    }
}

// Button click handlers
document.addEventListener('click', function(e) {
    // CTA buttons
    if (e.target.matches('.btn-primary') || e.target.closest('.btn-primary')) {
        handleCTAClick(e);
    }
    
    // Demo button
    if (e.target.matches('.btn-outline') || e.target.closest('.btn-outline')) {
        handleDemoClick(e);
    }
});

function handleCTAClick(e) {
    const button = e.target.matches('.btn-primary') ? e.target : e.target.closest('.btn-primary');
    const originalText = button.innerHTML;
    
    // Add loading state
    button.innerHTML = '<span class="loading"></span> Загрузка...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Успешно!';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }, 1500);
}

function handleDemoClick(e) {
    // Simulate opening demo modal or video
    alert('Демо скоро будет доступно!');
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimizations
const debouncedScroll = debounce(function() {
    // Handle scroll events efficiently
    updateScrollProgress();
}, 10);

function updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const maxHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxHeight) * 100;
    
    // Update progress bar if exists
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

window.addEventListener('scroll', debouncedScroll);

// Stats counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const suffix = element.textContent.replace(/[\d]/g, '');
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 20);
}

// Initialize stats counter after DOM is loaded
setTimeout(initStatsCounter, 500);

// Form handling (if forms are added later)
function handleFormSubmit(formElement) {
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Отправка...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
            submitBtn.classList.add('success');
            
            // Reset form after success
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
            }, 3000);
        }, 2000);
    });
}

// Initialize forms
document.querySelectorAll('form').forEach(handleFormSubmit);

// Add CSS for mobile navigation
const mobileNavCSS = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 2rem;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-links {
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .nav-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;

// Inject mobile navigation CSS
const style = document.createElement('style');
style.textContent = mobileNavCSS;
document.head.appendChild(style);

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
        const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        const buttonText = button.textContent.trim();
        const buttonType = button.classList.contains('btn-primary') ? 'primary' : 'secondary';
        
        trackEvent('button_click', {
            button_text: buttonText,
            button_type: buttonType,
            page_section: getPageSection(button)
        });
    }
});

function getPageSection(element) {
    const section = element.closest('section');
    return section ? section.id || section.className : 'unknown';
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Log to external service in production
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    trackEvent('page_load', {
        load_time: loadTime
    });
});

// Accessibility improvements
function initAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Перейти к основному содержанию';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.id = 'main-content';
    }
}

// Initialize accessibility features
initAccessibility();

// Steps animation functionality
function initStepsAnimation() {
    const stepsSection = document.querySelector('.how-it-works');
    const steps = document.querySelectorAll('.step');
    
    console.log('🔍 Steps animation init - Section found:', !!stepsSection, 'Steps found:', steps.length);
    
    if (!stepsSection || steps.length === 0) {
        console.log('❌ Steps elements missing - check HTML');
        return;
    }

    // Function to animate steps sequentially
    function animateStepsSequentially() {
        console.log('🎯 Starting sequential steps animation');
        
        // Start with first step immediately
        if (steps[0]) {
            steps[0].classList.add('animate');
            console.log('✨ Step 1 started');
        }
        
        // Animate remaining steps one after another (3 seconds each)
        for (let i = 1; i < steps.length; i++) {
            setTimeout(() => {
                if (steps[i]) {
                    steps[i].classList.add('animate');
                    console.log(`✨ Step ${i + 1} started`);
                }
            }, i * 3000); // Each step starts 3 seconds after the previous one
        }
    }

    // Create intersection observer for steps section
    const stepsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('🎯 Steps section in view - starting sequential animation');
                
                // Start sequential animation
                animateStepsSequentially();
                
                // Stop observing after animation starts
                stepsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of section is visible
    });

    stepsObserver.observe(stepsSection);
    console.log('✅ Steps animation initialized successfully!');
}

// Heatmap toggle functionality
function initHeatmapToggle() {
    const toggle = document.getElementById('heatmap-toggle');
    const heatmapGradient = document.getElementById('hero-heatmap-gradient');
    const buttonGradient = document.getElementById('button-heatmap-gradient');
    
    console.log('🔍 Heatmap init - Toggle found:', !!toggle, 'Hero gradient found:', !!heatmapGradient, 'Button gradient found:', !!buttonGradient);
    
    if (toggle && heatmapGradient && buttonGradient) {
        // Убедимся, что градиенты скрыты при инициализации
        heatmapGradient.classList.remove('active');
        buttonGradient.classList.remove('active');
        
        toggle.addEventListener('change', function() {
            console.log('🎯 Heatmap toggle:', this.checked ? 'ON' : 'OFF');
            
            if (this.checked) {
                heatmapGradient.classList.add('active');
                buttonGradient.classList.add('active');
            } else {
                heatmapGradient.classList.remove('active');
                buttonGradient.classList.remove('active');
            }
        });
        console.log('✅ Heatmap toggle initialized successfully!');
        
    } else {
        console.log('❌ Heatmap elements missing - check HTML');
    }
}

// Carousel functionality
function initCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const originalSlides = document.querySelectorAll('.carousel-slide');
    
    if (!track || !prevBtn || !nextBtn || originalSlides.length === 0) {
        console.log('❌ Carousel elements missing');
        return;
    }
    
    // Clone slides for infinite effect
    const slidesToClone = 2; // Clone 2 slides at each end
    const clonesBefore = [];
    const clonesAfter = [];
    
    // Create clones for seamless infinite scroll
    for (let i = 0; i < slidesToClone; i++) {
        // Clone from end for beginning
        const cloneBefore = originalSlides[originalSlides.length - 1 - i].cloneNode(true);
        cloneBefore.classList.add('carousel-clone');
        clonesBefore.unshift(cloneBefore);
        
        // Clone from beginning for end
        const cloneAfter = originalSlides[i].cloneNode(true);
        cloneAfter.classList.add('carousel-clone');
        clonesAfter.push(cloneAfter);
    }
    
    // Insert clones
    clonesBefore.forEach(clone => track.insertBefore(clone, track.firstChild));
    clonesAfter.forEach(clone => track.appendChild(clone));
    
    const allSlides = track.querySelectorAll('.carousel-slide');
    const totalSlides = originalSlides.length;
    let currentSlide = slidesToClone; // Start after the cloned slides
    
    // Calculate slides per view based on screen size
    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }
    
    // Drag functionality
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let initialTransform = 0;
    let dragThreshold = 50; // Minimum distance to trigger slide change
    
    // Update carousel position
    function updateCarousel(instant = false) {
        const slideWidth = allSlides[0].offsetWidth + (window.innerWidth <= 768 ? 20 : 30);
        const translateX = -currentSlide * slideWidth;
        
        if (instant) {
            track.style.transition = 'none';
            track.style.transform = `translateX(${translateX}px)`;
            // Force reflow
            track.offsetHeight;
            track.style.transition = 'transform 0.5s ease';
        } else {
            track.style.transform = `translateX(${translateX}px)`;
        }
    }
    
    // Check for infinite scroll boundaries
    function checkInfiniteScroll() {
        // If we're at the cloned slides at the end, jump to the beginning
        if (currentSlide >= totalSlides + slidesToClone) {
            currentSlide = slidesToClone;
            updateCarousel(true);
        }
        // If we're at the cloned slides at the beginning, jump to the end
        else if (currentSlide < slidesToClone) {
            currentSlide = totalSlides + slidesToClone - 1;
            updateCarousel(true);
        }
    }
    
    // Navigation functions
    function nextSlide() {
        currentSlide++;
        updateCarousel();
        setTimeout(checkInfiniteScroll, 500); // Check after transition
    }
    
    function prevSlide() {
        currentSlide--;
        updateCarousel();
        setTimeout(checkInfiniteScroll, 500); // Check after transition
    }
    
    // Button event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Touch/Mouse drag functionality
    function handleStart(e) {
        isDragging = true;
        track.style.transition = 'none';
        
        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        startX = clientX;
        
        // Get current transform value
        const transform = track.style.transform;
        const matrix = transform.match(/translateX\(([^)]+)\)/);
        initialTransform = matrix ? parseFloat(matrix[1]) : 0;
        
        track.style.cursor = 'grabbing';
    }
    
    function handleMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        currentX = clientX - startX;
        
        const newTransform = initialTransform + currentX;
        track.style.transform = `translateX(${newTransform}px)`;
    }
    
    function handleEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        track.style.transition = 'transform 0.5s ease';
        track.style.cursor = 'grab';
        
        // Determine direction and distance
        if (Math.abs(currentX) > dragThreshold) {
            if (currentX > 0) {
                // Dragged right (previous slide)
                prevSlide();
            } else {
                // Dragged left (next slide)
                nextSlide();
            }
        } else {
            // Snap back to current position
            updateCarousel();
        }
        
        currentX = 0;
    }
    
    // Mouse events
    track.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    
    // Touch events
    track.addEventListener('touchstart', handleStart, { passive: false });
    track.addEventListener('touchmove', handleMove, { passive: false });
    track.addEventListener('touchend', handleEnd);
    
    // Prevent default drag behavior on images
    track.addEventListener('dragstart', (e) => e.preventDefault());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Window resize handler
    function handleResize() {
        updateCarousel();
    }
    
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Initialize carousel at the correct starting position
    updateCarousel(true);
    console.log('✅ Infinite carousel initialized successfully!');
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const triggers = document.querySelectorAll('.lightbox-trigger');
    
    if (!lightbox || !lightboxImage || !lightboxClose || !lightboxOverlay || triggers.length === 0) {
        console.log('❌ Lightbox elements missing');
        return;
    }
    
    // Open lightbox
    function openLightbox(imageSrc, imageAlt) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Add click listeners to all trigger images
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
    
    // Close lightbox events
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    console.log('✅ Lightbox initialized successfully!');
}

console.log('Aitracking Landing Page loaded successfully! 🚀'); 