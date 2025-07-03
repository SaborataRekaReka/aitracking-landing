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
    // initHeroCarousel(); // Отключено - используется оптимизированная версия
    initResourceTabs();
    initLanguageSwitcher();
    initStatsAnimation();
    initTabs();
    initPromoCodeForm();
});

// Detect current language from page
let currentLanguage = document.documentElement.lang || 'ru';

// Language switcher functionality
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = window.location.pathname.includes('/en/') ? 'en' : 'ru';
    
    // Desktop language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // Handle mobile language dropdown
    const mobileDropdown = document.querySelector('.mobile-lang-dropdown');
    const mobileCurrentBtn = document.getElementById('mobile-lang-current');
    const mobileOptions = document.getElementById('mobile-lang-options');
    const mobileLangOptions = document.querySelectorAll('.mobile-lang-option');
    
    if (mobileCurrentBtn && mobileOptions && mobileDropdown) {
        // Set initial active state
        mobileLangOptions.forEach(option => {
            const lang = option.getAttribute('data-lang');
            if (lang === currentLang) {
                option.classList.add('active');
                updateMobileCurrentLang(option);
            }
        });
        
        // Toggle dropdown
        mobileCurrentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileDropdown.classList.toggle('open');
        });
        
        // Handle language selection
        mobileLangOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const lang = option.getAttribute('data-lang');
                
                // Update active state
                mobileLangOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Update current button display
                updateMobileCurrentLang(option);
                
                // Close dropdown
                mobileDropdown.classList.remove('open');
                
                // Switch language
                switchLanguage(lang);
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileDropdown && !mobileDropdown.contains(e.target)) {
                mobileDropdown.classList.remove('open');
            }
        });
    }
}

// Update mobile current language display
function updateMobileCurrentLang(selectedOption) {
    const currentBtn = document.getElementById('mobile-lang-current');
    const flag = selectedOption.querySelector('.mobile-lang-flag').textContent;
    const name = selectedOption.querySelector('.mobile-lang-name').textContent;
    
    if (currentBtn) {
        const currentFlag = currentBtn.querySelector('.mobile-lang-flag');
        const currentName = currentBtn.querySelector('.mobile-lang-name');
        
        if (currentFlag) currentFlag.textContent = flag;
        if (currentName) currentName.textContent = name;
    }
}

function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    
    // Determine current path and redirect accordingly
    const currentPath = window.location.pathname;
    
    if (lang === 'en') {
        if (currentPath.includes('/en/')) {
            // Already on English page
            return;
        } else {
            // Go to English version
            window.location.href = '/en/';
        }
    } else if (lang === 'ru') {
        if (currentPath.includes('/en/')) {
            // Go from English to Russian
            window.location.href = '/';
        } else {
            // Already on Russian page
            return;
        }
    }
    
    console.log(`✅ Redirecting to ${lang} version`);
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.header');
    const hamburger = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    let scrollPosition = 0;
    
    // Fix z-index issue by moving nav-menu outside of header on mobile
    if (navMenu && window.innerWidth <= 768) {
        document.body.appendChild(navMenu);
        console.log('✅ Nav menu moved to body for proper z-index layering');
    }
    
    // Mobile menu toggle
    if (hamburger && navMenu && menuOverlay) {
        hamburger.addEventListener('click', function() {
            const isOpening = !navMenu.classList.contains('active');
            
            if (isOpening) {
                // Save current scroll position
                scrollPosition = window.pageYOffset;
                // Set body top to negative scroll position to maintain visual position
                document.body.style.top = `-${scrollPosition}px`;
            }
            
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('nav-menu-open');
            document.documentElement.classList.toggle('nav-menu-open');
            
            if (!isOpening) {
                // Restore scroll position when closing
                document.body.style.top = '';
                window.scrollTo(0, scrollPosition);
            }
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
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
            }
            document.body.classList.remove('nav-menu-open');
            document.documentElement.classList.remove('nav-menu-open');
            // Restore scroll position
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        });
    });

    // Close mobile menu when clicking on mobile auth buttons
    const mobileAuthButtons = document.querySelectorAll('.btn-mobile-ghost, .btn-mobile-primary');
    mobileAuthButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
            }
            document.body.classList.remove('nav-menu-open');
            document.documentElement.classList.remove('nav-menu-open');
            // Restore scroll position
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        });
    });

    // Close mobile menu when clicking on overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('nav-menu-open');
            document.documentElement.classList.remove('nav-menu-open');
            // Restore scroll position
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        });
    }
    
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

// Steps animation
function initStepsAnimation() {
    const steps = document.querySelectorAll('.step');
    let isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        initMobileStepsAnimation();
    } else {
        initDesktopStepsAnimation();
    }
    
    // Handle resize
    window.addEventListener('resize', debounce(() => {
        const isNowMobile = window.innerWidth <= 768;
        if (isNowMobile !== isMobile) {
            isMobile = isNowMobile;
            location.reload(); // Simple solution to handle layout change
        }
    }, 300));
    
    function initDesktopStepsAnimation() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStepsSequentially();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 });
        
        if (steps.length > 0) {
            observer.observe(steps[0]);
        }
        
        function animateStepsSequentially() {
            const steps = document.querySelectorAll('.step');
            function animateStep(index) {
                if (index >= steps.length) return;
                const step = steps[index];
                step.classList.add('animate');
                const progressFill = step.querySelector('.step-progress-fill');
                if (progressFill) {
                    progressFill.style.width = '100%';
                    // Ждём окончания transition, затем запускаем следующий шаг
                    progressFill.addEventListener('transitionend', function handler(e) {
                        if (e.propertyName === 'width') {
                            progressFill.removeEventListener('transitionend', handler);
                            animateStep(index + 1);
                        }
                    });
                } else {
                    animateStep(index + 1);
                }
            }
            animateStep(0);
        }
    }
    
    function initMobileStepsAnimation() {
        const stepsContainer = document.querySelector('.steps-container');
        if (!stepsContainer) return;
        
        // Create mobile indicators
        const indicatorContainer = document.createElement('div');
        indicatorContainer.className = 'mobile-step-indicator';
        
        const counterContainer = document.createElement('div');
        counterContainer.className = 'mobile-step-counter';
        
        // Insert before steps container
        stepsContainer.parentNode.insertBefore(counterContainer, stepsContainer);
        stepsContainer.parentNode.insertBefore(indicatorContainer, stepsContainer);
        
        // Create dots
        steps.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'mobile-step-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showMobileStep(index));
            indicatorContainer.appendChild(dot);
        });
        
        let currentStepIndex = 0;
        let animationInterval;
        
        // Initialize steps - hide all except first
        steps.forEach((step, index) => {
            step.classList.remove('mobile-active', 'animate');
            const progressFill = step.querySelector('.step-progress-fill');
            if (progressFill) {
                progressFill.style.width = '0%';
            }
        });
        
        // Show first step
        if (steps.length > 0) {
            steps[0].classList.add('mobile-active', 'animate');
            const progressFill = steps[0].querySelector('.step-progress-fill');
            if (progressFill) {
                progressFill.style.width = '100%';
            }
            updateCounter();
        }
        
        // Observer to start animation when visible
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startMobileStepsAnimation();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(stepsContainer);
        
        function startMobileStepsAnimation() {
            // Start automatic cycling
            animationInterval = setInterval(() => {
                const nextIndex = (currentStepIndex + 1) % steps.length;
                showMobileStep(nextIndex);
            }, 4000); // Change every 4 seconds
        }
        
        function showMobileStep(index) {
            if (index === currentStepIndex) return;
            
            // Clear any existing interval
            if (animationInterval) {
                clearInterval(animationInterval);
            }
            
            // Hide current step completely
            steps[currentStepIndex].classList.remove('mobile-active', 'animate');
            const currentProgressFill = steps[currentStepIndex].querySelector('.step-progress-fill');
            if (currentProgressFill) {
                currentProgressFill.style.width = '0%';
            }
            
            // Update dots
            const dots = document.querySelectorAll('.mobile-step-dot');
            dots[currentStepIndex].classList.remove('active');
            dots[index].classList.add('active');
            
            // Show new step
            setTimeout(() => {
                currentStepIndex = index;
                const currentStep = steps[currentStepIndex];
                currentStep.classList.add('mobile-active', 'animate');
                
                const progressFill = currentStep.querySelector('.step-progress-fill');
                if (progressFill) {
                    progressFill.style.width = '0%';
                    // Small delay for smooth animation
                    setTimeout(() => {
                        progressFill.style.width = '100%';
                    }, 100);
                }
                
                updateCounter();
                
                // Restart automatic cycling after manual interaction
                setTimeout(() => {
                    startMobileStepsAnimation();
                }, 1000);
            }, 250);
        }
        
        function updateCounter() {
            const isEnglish = window.location.pathname.includes('/en/');
            const text = isEnglish 
                ? `${currentStepIndex + 1} of ${steps.length}`
                : `${currentStepIndex + 1} из ${steps.length}`;
            counterContainer.textContent = text;
        }
        
        // Pause animation on user interaction
        stepsContainer.addEventListener('touchstart', () => {
            if (animationInterval) {
                clearInterval(animationInterval);
            }
        });
        
        // Resume after a delay
        stepsContainer.addEventListener('touchend', () => {
            setTimeout(() => {
                startMobileStepsAnimation();
            }, 2000);
        });
    }
}

// Heatmap toggle functionality
function initHeatmapToggle() {
    const toggle = document.getElementById('heatmap-toggle');
    const heatmapBlobs = document.getElementById('heatmap-blobs');
    const heatmapGradients = document.querySelectorAll('.hero-heatmap-gradient, .button-heatmap-gradient');
    
    console.log('🔥 Heatmap init - Toggle found:', !!toggle, 'Blobs found:', !!heatmapBlobs);
    
    if (toggle && heatmapBlobs) {
        toggle.addEventListener('change', function() {
            console.log('🔥 Heatmap toggle:', this.checked ? 'ON' : 'OFF');
            
            if (this.checked) {
                heatmapBlobs.classList.add('active');
                heatmapGradients.forEach(gradient => gradient.classList.add('active'));
            } else {
                heatmapBlobs.classList.remove('active');
                heatmapGradients.forEach(gradient => gradient.classList.remove('active'));
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
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let isTransitioning = false;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    // Clone slides for infinite scroll
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });
    
    function getSlidesPerView() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    function updateCarousel(instant = false) {
        const slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView;
        const translateX = -currentIndex * slideWidth;
        
        if (instant) {
            setTranslate(translateX, false);
        } else {
            setTranslate(translateX, true);
            isTransitioning = true;
            setTimeout(() => {
                isTransitioning = false;
                checkInfiniteScroll();
            }, 300);
        }
    }
    
    function checkInfiniteScroll() {
        if (currentIndex >= totalSlides) {
            currentIndex = 0;
            updateCarousel(true);
        } else if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
            updateCarousel(true);
        }
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        currentIndex++;
        updateCarousel();
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        currentIndex--;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Modern drag functionality with smooth UX
    let dragState = {
        isDragging: false,
        startX: 0,
        currentX: 0,
        startTime: 0,
        velocity: 0,
        lastMoveTime: 0,
        startTranslate: 0,
        currentTranslate: 0,
        hasMoved: false
    };
    
    function getTranslateX() {
        const slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView;
        return -currentIndex * slideWidth;
    }
    
    function setTranslate(value, transition = true) {
        track.style.transition = transition ? 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
        track.style.transform = `translateX(${value}%)`;
    }
    
    function handleDragStart(e) {
        if (isTransitioning) return;
        
        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        
        dragState = {
            isDragging: true,
            startX: clientX,
            currentX: clientX,
            startTime: Date.now(),
            velocity: 0,
            lastMoveTime: Date.now(),
            startTranslate: getTranslateX(),
            currentTranslate: getTranslateX(),
            hasMoved: false
        };
        
        track.style.cursor = 'grabbing';
        setTranslate(dragState.startTranslate, false);
    }
    
    function handleDragMove(e) {
        if (!dragState.isDragging) return;
        
        e.preventDefault();
        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const currentTime = Date.now();
        
        // Calculate drag distance and velocity
        const dragDistance = clientX - dragState.startX;
        const timeDiff = currentTime - dragState.lastMoveTime;
        
        // Mark that user has moved (threshold: 5px to avoid accidental movements)
        if (Math.abs(dragDistance) > 5) {
            dragState.hasMoved = true;
        }
        
        if (timeDiff > 0) {
            dragState.velocity = (clientX - dragState.currentX) / timeDiff;
        }
        
        dragState.currentX = clientX;
        dragState.lastMoveTime = currentTime;
        
        // Convert pixels to percentage for smooth dragging
        const containerWidth = track.parentElement.offsetWidth;
        const dragPercent = (dragDistance / containerWidth) * 100;
        
        dragState.currentTranslate = dragState.startTranslate + dragPercent;
        setTranslate(dragState.currentTranslate, false);
    }
    
    function handleDragEnd() {
        if (!dragState.isDragging) return;
        
        const hasMoved = dragState.hasMoved;
        dragState.isDragging = false;
        track.style.cursor = 'grab';
        
        // If user moved during drag, temporarily block clicks on images
        if (hasMoved) {
            blockImageClicks();
        }
        
        const dragDistance = dragState.currentX - dragState.startX;
        const dragDuration = Date.now() - dragState.startTime;
        const containerWidth = track.parentElement.offsetWidth;
        const slidesPerView = getSlidesPerView();
        
        // Calculate how many slides to move based on drag distance
        const slideWidth = containerWidth / slidesPerView;
        const rawSlidesMoved = Math.abs(dragDistance) / slideWidth;
        
        // Determine number of slides to change
        let slidesToMove = 0;
        const velocityThreshold = 0.5;
        const minDistanceThreshold = slideWidth * 0.3; // 30% of slide width minimum
        
        if (Math.abs(dragDistance) < minDistanceThreshold && Math.abs(dragState.velocity) < velocityThreshold) {
            // Too small movement - snap back to current slide
            slidesToMove = 0;
        } else if (Math.abs(dragState.velocity) > velocityThreshold) {
            // Fast swipe - move at least 1 slide, but respect distance if greater
            slidesToMove = Math.max(1, Math.round(rawSlidesMoved));
        } else {
            // Normal drag - round to nearest slide based on distance
            slidesToMove = Math.round(rawSlidesMoved);
        }
        
        // Apply the movement
        if (slidesToMove > 0) {
            const direction = dragDistance > 0 ? -1 : 1; // Right drag = prev slides, Left drag = next slides
            
            if (direction > 0) {
                // Move forward (next slides)
                for (let i = 0; i < slidesToMove; i++) {
                    currentIndex++;
                }
            } else {
                // Move backward (prev slides)
                for (let i = 0; i < slidesToMove; i++) {
                    currentIndex--;
                }
            }
            updateCarousel();
        } else {
            // Snap back to current slide
            updateCarousel();
        }
    }
    
    // Block clicks on images temporarily after drag
    function blockImageClicks() {
        window.carouselClicksBlocked = true;
        setTimeout(() => {
            window.carouselClicksBlocked = false;
        }, 100); // Block for 100ms to prevent accidental lightbox opening
    }
    
    // Mouse events
    track.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    
    // Touch events (passive for better performance)
    track.addEventListener('touchstart', handleDragStart, { passive: false });
    track.addEventListener('touchmove', handleDragMove, { passive: false });
    track.addEventListener('touchend', handleDragEnd, { passive: true });
    
    // Prevent image dragging
    track.addEventListener('dragstart', e => e.preventDefault());
    
    // Auto-slide
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
    
    // Handle resize
    function handleResize() {
        updateCarousel(true);
    }
    
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Initialize
    updateCarousel(true);
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const triggers = document.querySelectorAll('.lightbox-trigger');
    
    if (!lightbox) return;
    
    function openLightbox(imageSrc, imageAlt) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImage.src = '';
        }, 300);
    }
    
    // Event listeners
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Проверяем, что это не изображение из hero-carousel
            if (trigger.closest('.hero-carousel')) {
                return;
            }
            
            // Check if clicks are blocked (after drag operation)
            if (window.carouselClicksBlocked) {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            e.stopPropagation(); // Предотвращаем всплытие
            const img = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Hero carousel functionality
function initHeroCarousel() {
    const track = document.querySelector('.hero-carousel-track');
    const slides = document.querySelectorAll('.hero-carousel-slide');
    const carousel = document.querySelector('.hero-carousel');
    if (!track || slides.length === 0) return;
    
    const slideCount = slides.length;
    let offset = 0;
    let paused = false;
    const speed = 0.7; // px per frame
    
    function isHorizontalMode() {
        return window.innerWidth <= 992;
    }
    
    function loop() {
        if (!paused) {
            if (isHorizontalMode()) {
                // Horizontal scrolling for mobile/tablet
                const slideWidth = slides[0].offsetWidth + 20; // width + margin
                const totalWidth = slideWidth * slideCount;
                const containerWidth = carousel.offsetWidth;
                
                offset += speed;
                if (offset >= totalWidth - containerWidth) {
                    offset = 0;
                }
                track.style.transition = 'none';
                track.style.transform = `translateX(-${offset}px)`;
            } else {
                // Vertical scrolling for desktop
                const visibleSlides = 3;
                const slideHeight = slides[0].offsetHeight;
                const totalHeight = slideHeight * slideCount;
                
                offset += speed;
                if (offset >= totalHeight - slideHeight * visibleSlides) {
                    offset = 0;
                }
                track.style.transition = 'none';
                track.style.transform = `translateY(-${offset}px)`;
            }
        }
        requestAnimationFrame(loop);
    }
    
    function handleResize() {
        // Reset offset when switching modes
        offset = 0;
        track.style.transform = isHorizontalMode() ? 'translateX(0)' : 'translateY(0)';
    }
    
    window.addEventListener('resize', debounce(handleResize, 250));
    
    requestAnimationFrame(loop);
    
    if (carousel) {
        carousel.addEventListener('mouseenter', () => { paused = true; });
        carousel.addEventListener('mouseleave', () => { paused = false; });
        
        // Add touch/drag support for horizontal mode
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        let initialOffset = 0;
        
        function handleTouchStart(e) {
            if (!isHorizontalMode()) return;
            
            isDragging = true;
            paused = true;
            startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            initialOffset = offset;
            
            carousel.style.cursor = 'grabbing';
        }
        
        function handleTouchMove(e) {
            if (!isDragging || !isHorizontalMode()) return;
            
            e.preventDefault();
            currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const deltaX = currentX - startX;
            
            // Update offset based on drag
            const newOffset = Math.max(0, initialOffset - deltaX);
            const slideWidth = slides[0].offsetWidth + 20;
            const totalWidth = slideWidth * slideCount;
            const containerWidth = carousel.offsetWidth;
            const maxOffset = Math.max(0, totalWidth - containerWidth);
            
            offset = Math.min(newOffset, maxOffset);
            track.style.transform = `translateX(-${offset}px)`;
        }
        
        function handleTouchEnd() {
            if (!isDragging || !isHorizontalMode()) return;
            
            isDragging = false;
            paused = false;
            carousel.style.cursor = 'grab';
        }
        
        // Mouse events
        carousel.addEventListener('mousedown', handleTouchStart);
        document.addEventListener('mousemove', handleTouchMove);
        document.addEventListener('mouseup', handleTouchEnd);
        
        // Touch events
        carousel.addEventListener('touchstart', handleTouchStart, { passive: false });
        carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
        carousel.addEventListener('touchend', handleTouchEnd);
        
        // Prevent image dragging
        carousel.addEventListener('dragstart', e => e.preventDefault());
    }
}

// Resource tabs functionality
function initResourceTabs() {
    const resourceTabs = document.querySelectorAll('.resource-item');
    const resourceImage = document.getElementById('resource-image');
    
    if (resourceTabs.length > 0 && resourceImage) {
        resourceTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                // Don't switch tabs if clicking on the button
                if (e.target.classList.contains('resource-btn')) {
                    return;
                }
                
                // Remove active class from all tabs
                resourceTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Change image with fade effect
                const newImageSrc = this.getAttribute('data-image');
                if (newImageSrc) {
                    resourceImage.style.opacity = '0';
                    
                    setTimeout(() => {
                        resourceImage.src = newImageSrc;
                        resourceImage.style.opacity = '1';
                    }, 150);
                }
            });
        });
        
        // Add smooth scrolling for resource buttons
        const resourceBtns = document.querySelectorAll('.resource-btn');
        resourceBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
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
        
        console.log('✅ Resource tabs initialized successfully!');
    } else {
        console.log('❌ Resource tabs elements missing');
    }
}

// Анимация статистических столбцов
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number, .inline-stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.textContent);
                animateNumber(element, 0, finalValue, 2000);
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(el => {
        observer.observe(el);
    });
    
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const isNegative = end < 0;
        const absoluteEnd = Math.abs(end);
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (absoluteEnd - start) * easeOut);
            
            element.textContent = isNegative ? `-${current}%` : 
                                 element.textContent.includes('%') ? `${current}%` : current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
}

// Tabs functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0 || tabContents.length === 0) {
        console.log('❌ Tab elements not found');
        return;
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Remove active class from all content
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content immediately
            const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    console.log('✅ Tabs initialized successfully!');
}

// Promo code form handler
function initPromoCodeForm() {
    console.log('🔧 === FORM INITIALIZATION DEBUG ===');
    
    const form = document.querySelector('.download-form');
    const emailInput = document.querySelector('.download-input');
    const submitBtn = document.querySelector('.download-btn');
    const checkboxInput = document.querySelector('.download-agreement input[type="checkbox"]');
    
    console.log('📋 Form elements found:', {
        form: !!form,
        emailInput: !!emailInput,
        submitBtn: !!submitBtn,
        checkboxInput: !!checkboxInput
    });
    
    if (!form || !emailInput || !submitBtn) {
        console.error('❌ Critical form elements not found!');
        console.error('Missing elements:', {
            form: !form ? 'MISSING' : 'OK',
            emailInput: !emailInput ? 'MISSING' : 'OK',
            submitBtn: !submitBtn ? 'MISSING' : 'OK'
        });
        return;
    }
    

    
    // Alternative form handler - manual submission
    async function handleFormSubmission(e) {
        console.log('🔧 === FORM SUBMISSION DEBUG START ===');
        if (e) e.preventDefault();
        
        // Double-check that submitBtn is the download form button
        if (!submitBtn || !submitBtn.classList.contains('download-btn')) {
            console.log('❌ Invalid submit button, aborting form submission');
            return;
        }
        
        const email = emailInput.value.trim();
        const isAgreed = checkboxInput ? checkboxInput.checked : true;
        
        console.log('📝 Form data:', {
            email: email,
            isAgreed: isAgreed,
            emailValid: isValidEmail(email)
        });
        
        // Validation
        if (!email) {
            console.log('❌ Validation failed: empty email');
            showMessage('Пожалуйста, введите ваш email', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            console.log('❌ Validation failed: invalid email format');
            showMessage('Пожалуйста, введите корректный email', 'error');
            return;
        }
        
        if (!isAgreed) {
            console.log('❌ Validation failed: agreement not checked');
            showMessage('Пожалуйста, согласитесь с политикой конфиденциальности', 'error');
            return;
        }
        
        console.log('✅ All validations passed');
        
        // Show loading state
        const originalText = submitBtn.textContent;
        console.log('🔄 Setting loading state, original text:', originalText);
        submitBtn.textContent = 'Отправляем...';
        submitBtn.disabled = true;
        
        try {
            // Generate unique promo code
            const promoCode = generatePromoCode();
            console.log('🎫 Promo code generated:', promoCode);
            
            // Send email (auto-detects EmailJS vs PHP)
            console.log('📧 Calling sendPromoCodeEmail...');
            const result = await sendPromoCodeEmail(email, promoCode);
            console.log('📧 sendPromoCodeEmail completed:', result);
            console.log('🔧 === EMAIL SENDING DEBUG END ===');
            
            // Success
            console.log('✅ Email sent successfully, showing success message');
            showMessage('✅ Промокод отправлен на ваш email! Проверьте почту.', 'success');
            emailInput.value = '';
            
        } catch (error) {
            console.log('🔧 === FORM ERROR HANDLING ===');
            console.error('❌ Form submission error:', error);
            console.error('❌ Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            console.log('🔧 === EMAIL SENDING ERROR DEBUG END ===');
            showMessage('❌ Произошла ошибка. Попробуйте еще раз.', 'error');
        } finally {
            // Restore button state
            console.log('🔄 Restoring button state to:', originalText);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            console.log('🔧 === FORM SUBMISSION DEBUG END ===');
        }
    }
    
    form.addEventListener('submit', handleFormSubmission);
    
    // Also add click handler as backup
    submitBtn.addEventListener('click', async function(e) {
        console.log('🔧 === BACKUP CLICK HANDLER ===');
        
        // Ensure this is the correct download button, not auth buttons
        if (!e.target.classList.contains('download-btn')) {
            console.log('❌ Not a download button, ignoring');
            return;
        }
        
        // Check if HTML5 validation is blocking
        const isFormValid = form.checkValidity();
        console.log('📋 Form validity:', isFormValid);
        
        if (!isFormValid) {
            console.log('❌ HTML5 validation failed, showing validation messages');
            form.reportValidity();
            return;
        }
        
        // If form is valid but submit didn't fire, handle manually
        setTimeout(() => {
            console.log('⏰ Checking if submit event fired...');
            // If we reach here, submit likely didn't fire, so handle manually
            e.preventDefault();
            handleFormSubmission(e);
        }, 100);
        
        console.log('🔧 === BACKUP CLICK HANDLER END ===');
    });
    

    
    // Ensure auth buttons don't trigger form submission
    const authButtons = document.querySelectorAll('.nav-auth .btn, .footer-auth .btn, .mobile-auth-buttons .btn');
    authButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Stop any potential event bubbling that might trigger form handlers
            e.stopPropagation();
            console.log('🔒 Auth button clicked, not triggering form submission');
        });
    });
    
    console.log('✅ Promo code form initialized successfully!');
    console.log('🔧 === FORM INITIALIZATION DEBUG END ===');
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Generate unique promo code
function generatePromoCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const prefix = 'AI1FREE';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix + code;
}

// Send promo code email - Direct PHP implementation
async function sendPromoCodeEmail(email, promoCode) {
    console.log('🔧 === EMAIL SENDING DEBUG START ===');
    console.log('📧 Input email:', email);
    console.log('🎫 Generated promo code:', promoCode);
    console.log('🐘 Using PHP backend for email sending...');
    
    const emailData = {
        email: email,
        promo_code: promoCode
    };
    
    console.log('📨 PHP data prepared:', emailData);
    
    try {
        const response = await fetch('send-promocode.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        
        console.log('📊 Response status:', response.status);
        
        const result = await response.json();
        console.log('📊 Response data:', result);
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! status: ${response.status}`);
        }
        
        if (result.success) {
            console.log('✅ Email sent successfully via PHP!');
            return result;
        } else {
            throw new Error(result.error || 'Unknown error occurred');
        }
        
    } catch (error) {
        console.error('❌ PHP backend error:', error);
        throw error;
    }
}

// Show message to user
function showMessage(text, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `form-message form-message-${type}`;
    message.textContent = text;
    
    // Insert after download agreement
    const agreement = document.querySelector('.download-agreement');
    if (agreement && agreement.parentNode) {
        agreement.parentNode.insertBefore(message, agreement.nextSibling);
        
        // Auto-remove after 6 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 6000);
    }
}



console.log('Aitracking Landing Page loaded successfully! 🚀'); 