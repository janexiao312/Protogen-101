// Profile Page JavaScript Functionality
// Author: Jane - Experience Designer
// Date: October 22, 2025

/**
 * DOM Elements
 */
const modal = document.getElementById('contactModal');
const profileImage = document.querySelector('.profile-image');
const aboutText = document.querySelector('.about-text');
const statNumbers = document.querySelectorAll('.stat-number');

/**
 * Initialize page functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupImageFallback();
    setupKeyboardNavigation();
    setupIntersectionObserver();
    console.log('✨ Profile page initialized successfully!');
});

/**
 * Handle contact button click - opens modal
 */
function handleContact() {
    showModal();
    
    // Analytics tracking (if you have analytics setup)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_click', {
            'event_category': 'engagement',
            'event_label': 'profile_page'
        });
    }
}

/**
 * Show contact modal with animation
 */
function showModal() {
    modal.classList.add('show');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Focus management for accessibility
    const closeButton = modal.querySelector('.close-modal');
    closeButton.focus();
    
    // Close modal on escape key
    document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Close contact modal
 */
function closeModal() {
    modal.classList.remove('show');
    
    // Smooth fade out
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
    
    // Return focus to contact button
    document.querySelector('.contact-button.primary').focus();
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
}

/**
 * Handle escape key press to close modal
 */
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

/**
 * Close modal when clicking outside content area
 */
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

/**
 * Setup profile image fallback if image fails to load
 */
function setupImageFallback() {
    profileImage.addEventListener('error', function() {
        // Create a styled placeholder with initials
        const placeholder = document.createElement('div');
        placeholder.className = 'profile-image-placeholder';
        placeholder.textContent = 'J'; // Jane's initial
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 48px;
            font-weight: 700;
            border: 6px solid var(--card-background);
        `;
        
        this.parentNode.appendChild(placeholder);
        this.style.display = 'none';
        
        console.log('📷 Using placeholder image for profile');
    });
}

/**
 * Enhanced keyboard navigation support
 */
function setupKeyboardNavigation() {
    // Tab navigation for social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
    
    // Modal keyboard navigation
    modal.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            trapFocusInModal(event);
        }
    });
}

/**
 * Trap focus within modal for accessibility
 */
function trapFocusInModal(event) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            event.preventDefault();
        }
    } else {
        if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            event.preventDefault();
        }
    }
}

/**
 * Initialize animations and interactions
 */
function initializeAnimations() {
    // Animate stats on page load
    animateStats();
    
    // Add smooth hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('fade-in-up');
    });
    
    // Profile image hover effect
    profileImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}

/**
 * Animate statistics numbers
 */
function animateStats() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

/**
 * Animate individual number counting up
 */
function animateNumber(element) {
    const finalNumber = parseInt(element.textContent);
    const duration = 1000; // 1 second
    const increment = finalNumber / (duration / 16); // 60fps
    let currentNumber = 0;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            element.textContent = finalNumber + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentNumber) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

/**
 * Setup intersection observer for scroll animations
 */
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.about-section, .stats-grid, .contact-section');
    elementsToAnimate.forEach(el => observer.observe(el));
}

/**
 * Copy contact information to clipboard
 */
function copyToClipboard(text, feedback = 'Copied!') {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(feedback);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Copied!');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showNotification('Unable to copy');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show notification toast
 */
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1001;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

/**
 * Handle social link clicks with analytics
 */
function handleSocialClick(platform, url) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            'event_category': 'engagement',
            'event_label': platform,
            'value': 1
        });
    }
    
    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Enhanced contact options with click handlers
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to contact options in modal
    const contactOptions = document.querySelectorAll('.contact-option');
    
    contactOptions.forEach(option => {
        option.addEventListener('click', function() {
            const contactInfo = this.querySelector('.contact-info p').textContent;
            const contactType = this.querySelector('.contact-info strong').textContent;
            
            if (contactType === 'Email') {
                window.location.href = `mailto:${contactInfo}`;
            } else if (contactType === 'LinkedIn') {
                window.open(`https://${contactInfo}`, '_blank');
            } else if (contactType === 'Portfolio') {
                window.open(`https://${contactInfo}`, '_blank');
            }
            
            // Close modal after interaction
            setTimeout(closeModal, 500);
        });
        
        // Add hover effect
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

/**
 * Add CSS animations dynamically
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fade-in-up 0.6s ease forwards;
    }
    
    .animate-in {
        animation: fade-in-up 0.8s ease forwards;
    }
`;
document.head.appendChild(style);

/**
 * Performance monitoring
 */
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`📊 Page load time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
        }, 0);
    });
}

/**
 * Error handling
 */
window.addEventListener('error', function(event) {
    console.error('💥 JavaScript error:', event.error);
    // Could send to analytics or error reporting service
});

/**
 * Service worker registration for PWA functionality (optional)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you create a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('🔧 SW registered'))
        //     .catch(error => console.log('❌ SW registration failed'));
    });
}

// Export functions for testing or external use
window.ProfilePage = {
    handleContact,
    closeModal,
    copyToClipboard,
    showNotification
};

/**
 * ==========================================
 * WEATHER WIDGET FUNCTIONALITY
 * ==========================================
 */

/**
 * Weather widget configuration and state
 */
const WeatherWidget = {
    // Mock data for demonstration (replace with real API)
    mockData: {
        current: {
            city: 'Houston',
            temperature: 28,
            feelsLike: 32,
            humidity: 78,
            windSpeed: 8,
            description: 'partly cloudy',
            emoji: '⛅'
        },
        forecast: [
            { day: 'Today', emoji: '⛅', high: 28, low: 22 },
            { day: 'Tomorrow', emoji: '☀️', high: 30, low: 24 },
            { day: 'Thursday', emoji: '🌧️', high: 26, low: 20 }
        ]
    },

    // Weather emoji mapping
    emojiMap: {
        'clear': '☀️',
        'sunny': '☀️',
        'partly cloudy': '⛅',
        'cloudy': '☁️',
        'overcast': '☁️',
        'rainy': '🌧️',
        'rain': '🌧️',
        'stormy': '⛈️',
        'snow': '❄️',
        'snowy': '❄️',
        'foggy': '🌫️',
        'windy': '🌬️'
    },

    /**
     * Initialize weather widget
     */
    init() {
        this.updateWeatherDisplay();
        this.startAutoRefresh();
        this.setupWeatherAnimations();
        console.log('🌤️ Weather widget initialized');
    },

    /**
     * Update weather display with current data
     */
    updateWeatherDisplay() {
        const { current, forecast } = this.mockData;
        
        // Update current weather
        document.getElementById('weather-city').textContent = current.city;
        document.getElementById('current-temp').textContent = current.temperature;
        document.getElementById('weather-description').textContent = current.description;
        document.getElementById('weather-emoji').textContent = current.emoji;
        document.getElementById('feels-like').textContent = `${current.feelsLike}°C`;
        document.getElementById('humidity').textContent = `${current.humidity}%`;
        document.getElementById('wind-speed').textContent = `${current.windSpeed} km/h`;
        
        // Update forecast
        const forecastItems = document.querySelectorAll('.forecast-item');
        forecast.forEach((day, index) => {
            if (forecastItems[index]) {
                forecastItems[index].querySelector('.forecast-day').textContent = day.day;
                forecastItems[index].querySelector('.forecast-icon').textContent = day.emoji;
                forecastItems[index].querySelector('.forecast-high').textContent = `${day.high}°`;
                forecastItems[index].querySelector('.forecast-low').textContent = `${day.low}°`;
            }
        });
        
        // Update timestamp
        document.getElementById('last-updated').textContent = 'Just now';
    },

    /**
     * Simulate weather data changes (for demonstration)
     */
    simulateWeatherChange() {
        const conditions = ['sunny', 'partly cloudy', 'cloudy', 'rainy'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        // Update temperature with slight variation
        this.mockData.current.temperature += Math.floor(Math.random() * 6) - 3;
        this.mockData.current.description = randomCondition;
        this.mockData.current.emoji = this.emojiMap[randomCondition];
        
        // Update humidity and wind
        this.mockData.current.humidity = Math.floor(Math.random() * 40) + 40;
        this.mockData.current.windSpeed = Math.floor(Math.random() * 20) + 5;
        this.mockData.current.feelsLike = this.mockData.current.temperature + Math.floor(Math.random() * 4);
        
        this.updateWeatherDisplay();
        console.log('🌤️ Weather updated:', randomCondition);
    },

    /**
     * Start auto-refresh timer
     */
    startAutoRefresh() {
        // Simulate weather updates every 30 seconds
        setInterval(() => {
            this.simulateWeatherChange();
        }, 30000);
    },

    /**
     * Setup weather-specific animations
     */
    setupWeatherAnimations() {
        const weatherIcon = document.querySelector('.weather-emoji');
        if (weatherIcon) {
            weatherIcon.addEventListener('click', () => {
                weatherIcon.style.animation = 'none';
                setTimeout(() => {
                    weatherIcon.style.animation = 'float 3s ease-in-out infinite';
                }, 100);
            });
        }

        // Add click handlers to forecast items
        document.querySelectorAll('.forecast-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.showForecastDetail(e.currentTarget);
            });
        });
    },

    /**
     * Show forecast detail (placeholder for future functionality)
     */
    showForecastDetail(forecastItem) {
        const day = forecastItem.querySelector('.forecast-day').textContent;
        console.log(`📅 Forecast clicked for: ${day}`);
        
        // Add visual feedback
        forecastItem.style.transform = 'scale(0.95)';
        setTimeout(() => {
            forecastItem.style.transform = '';
        }, 150);
    },

    /**
     * Get user's location and fetch weather (placeholder for future API integration)
     */
    async getUserLocation() {
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                
                const { latitude, longitude } = position.coords;
                console.log('📍 User location:', latitude, longitude);
                
                // Here you would typically call a weather API
                // await this.fetchWeatherData(latitude, longitude);
                
            } catch (error) {
                console.log('❌ Location access denied, using default location');
            }
        }
    }
};

// Initialize weather widget when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        WeatherWidget.init();
    }, 1000); // Delay to let page load animation complete
});