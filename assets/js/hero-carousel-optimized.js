// Optimized Hero Carousel JavaScript
function initOptimizedHeroCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    const track = document.querySelector('.hero-carousel-track');
    const slides = carousel ? carousel.querySelectorAll('.hero-carousel-slide img') : [];
    
    if (!carousel || !track || slides.length === 0) return;
    
    // Handle image clicks for lightbox
    slides.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openHeroLightbox(this.src, this.alt);
        });
    });
    
    // Optional: Add keyboard navigation
    let isPaused = false;
    
    // Pause on hover is already handled by CSS
    // Add keyboard controls for accessibility
    carousel.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            togglePause();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartY = 0;
    let touchStartX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;
        
        // Only handle swipes, not taps
        if (Math.abs(diffY) > 50 || Math.abs(diffX) > 50) {
            // Pause animation on swipe
            track.style.animationPlayState = 'paused';
            setTimeout(() => {
                track.style.animationPlayState = 'running';
            }, 3000);
        }
    }, { passive: true });
    
    // Function to toggle pause
    function togglePause() {
        isPaused = !isPaused;
        track.style.animationPlayState = isPaused ? 'paused' : 'running';
    }
    
    // Ensure images are loaded for smooth animation
    const imagePromises = Array.from(slides).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
        });
    });
    
    // Start animation after all images are loaded
    Promise.all(imagePromises).then(() => {
        carousel.classList.add('loaded');
    });
}

// Simple lightbox function for hero carousel
function openHeroLightbox(src, alt) {
    const existingLightbox = document.getElementById('hero-lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    const lightbox = document.createElement('div');
    lightbox.id = 'hero-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${src}" alt="${alt}" class="lightbox-image">
        </div>
    `;
    
    // Styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const overlay = lightbox.querySelector('.lightbox-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        cursor: pointer;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        z-index: 1;
    `;
    
    const img = lightbox.querySelector('.lightbox-image');
    img.style.cssText = `
        max-width: 100%;
        max-height: 90vh;
        width: auto;
        height: auto;
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -20px;
        right: -20px;
        width: 40px;
        height: 40px;
        background: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        font-weight: bold;
        color: #666;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    `;
    
    // Event handlers
    const closeLightbox = () => lightbox.remove();
    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    
    // Keyboard support
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeydown);
        }
    };
    document.addEventListener('keydown', handleKeydown);
    
    // Add to DOM
    document.body.appendChild(lightbox);
    
    // Fade in effect
    requestAnimationFrame(() => {
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s ease';
        requestAnimationFrame(() => {
            lightbox.style.opacity = '1';
        });
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOptimizedHeroCarousel);
} else {
    initOptimizedHeroCarousel();
} 