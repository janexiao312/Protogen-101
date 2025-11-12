# GitHub Copilot Rules & Guidelines

**Project:** Jane's Portfolio Website (Protogen 101)  
**Author:** Jane - Experience Designer  
**Date:** November 12, 2025  
**Purpose:** Guidelines for AI-assisted development and code quality standards across the entire portfolio website

---

## 🎯 **Portfolio Project Overview**

This document covers development guidelines for Jane's complete portfolio ecosystem:

### **Core Portfolio Components:**
- **`index.html`** - Main profile page with interactive features
- **`profile-script.js`** - Profile functionality and animations
- **`profile-styles.css`** - Main portfolio styling and design system
- **`ai-navigator.html`** - AI-powered portfolio navigation interface
- **`ai-navigator-script.js`** - Conversational AI and navigation logic
- **`ai-navigator-styles.css`** - Chat interface styling
- **`reflection.html`** - Weekly reflection feature (legacy/alternate)
- **`reflection-styles.css`** - Reflection page styling

### **Supporting Files:**
- **`picture.jpg`** - Profile image and branding
- **Memory Bank** - Documentation, PRDs, and project guidelines
- **Weather Widget** - Real-time weather integration
- **Contact Modal** - Professional contact interface

---

## 🤖 **Copilot Usage Guidelines**

### **When to Use Copilot:**
- ✅ **Portfolio enhancements** - New interactive features, animations, widgets
- ✅ **Boilerplate code generation** - HTML structure, CSS templates, JS functions
- ✅ **Code completion** - Function parameters, method implementations
- ✅ **Documentation writing** - JSDoc comments, README sections, feature specs
- ✅ **Test case generation** - Unit tests, integration tests, accessibility tests
- ✅ **Refactoring suggestions** - Code optimization and performance improvements
- ✅ **API integration patterns** - OpenAI API calls, weather APIs, third-party services
- ✅ **Design system expansion** - CSS variables, component styling, responsive design
- ✅ **Accessibility improvements** - ARIA labels, keyboard navigation, screen reader support

### **When to Review Carefully:**
- ⚠️ **Security-sensitive code** - API key management, data validation, user input handling
- ⚠️ **Accessibility features** - ARIA labels, keyboard navigation, focus management
- ⚠️ **Performance-critical sections** - Animation loops, scroll handlers, resize events
- ⚠️ **Cross-browser compatibility** - CSS vendor prefixes, JS polyfills, mobile optimization
- ⚠️ **Business logic** - Portfolio data management, navigation flow, user experience
- ⚠️ **Design system consistency** - Color variables, spacing, typography hierarchy
- ⚠️ **Mobile responsiveness** - Touch interactions, viewport handling, orientation changes
- ⚠️ **Third-party integrations** - Weather APIs, analytics, external services

### **Never Auto-Accept:**
- ❌ **API keys or secrets** - Always use environment variables or secure storage
- ❌ **Personal information** - Real contact details, private data, location info
- ❌ **External dependencies** - Unvetted libraries, frameworks, or CDN links
- ❌ **Complex algorithms** - Without understanding the implementation and performance impact
- ❌ **Database queries** - SQL injection risks, data privacy concerns
- ❌ **Analytics tracking** - Ensure privacy compliance and user consent
- ❌ **SEO meta tags** - Verify accuracy of descriptions and keywords
- ❌ **Social media integrations** - Privacy implications and data sharing

---

## 📋 **Code Quality Standards**

### **JavaScript Guidelines:**

```javascript
// ✅ Good: Clear function documentation for portfolio features
/**
 * Initialize interactive profile animations
 * @param {HTMLElement} container - Profile container element
 * @param {Object} options - Animation configuration
 * @returns {Promise<void>} Animation initialization promise
 */
async function initializeProfileAnimations(container, options) {
    // Implementation with error handling
}

/**
 * Process user message in AI navigator
 * @param {string} message - User input message
 * @param {Object} portfolioContext - Current portfolio context
 * @returns {Promise<string>} AI response
 */
async function processAIMessage(message, portfolioContext) {
    // Implementation
}

// ❌ Bad: No documentation or unclear purpose
function doStuff(data) {
    return api.call(data);
}
```

### **CSS Guidelines:**

```css
/* ✅ Good: Semantic class names with clear component hierarchy */
.portfolio-profile {
    /* Main profile page styles */
}

.portfolio-profile__header {
    /* Profile header component */
}

.portfolio-profile__stats {
    /* Statistics section */
}

.ai-navigator {
    /* AI navigator component */
}

.ai-navigator__message {
    /* Individual message styles */
}

.ai-navigator__message--user {
    /* User message variant */
}

.ai-navigator__message--ai {
    /* AI message variant */
}

/* ❌ Bad: Generic or unclear naming */
.blue-box {
    /* What is this for? */
}

.container2 {
    /* Which container? */
}
```

### **HTML Guidelines:**

```html
<!-- ✅ Good: Semantic markup for profile page -->
<main class="portfolio-profile" role="main" aria-labelledby="profile-title">
    <header class="profile-header">
        <h1 id="profile-title">Jane - Experience Designer</h1>
        <p class="profile-subtitle">AI Integration & Human-Centered Design</p>
    </header>
    
    <section class="profile-stats" aria-labelledby="stats-title">
        <h2 id="stats-title" class="sr-only">Professional Statistics</h2>
        <div class="stat-card" role="group" aria-label="Years of experience">
            <span class="stat-number">5+</span>
            <span class="stat-label">Years Experience</span>
        </div>
    </section>
</main>

<!-- ✅ Good: Semantic markup for AI navigator -->
<section class="ai-navigator" role="complementary" aria-labelledby="chat-title">
    <h2 id="chat-title">AI Portfolio Navigator</h2>
    <div class="chat-messages" role="log" aria-live="polite" aria-label="Conversation history">
        <!-- Messages -->
    </div>
    <form class="chat-input" role="form" aria-label="Send message">
        <input type="text" aria-label="Type your message" />
        <button type="submit" aria-label="Send message">Send</button>
    </form>
</section>

<!-- ❌ Bad: Generic divs without semantic meaning -->
<div class="container">
    <div class="title">Profile</div>
    <div class="content">
        <div class="box">Some content</div>
    </div>
</div>
```

---

## 🔒 **Security Guidelines**

### **API Key Management:**
```javascript
// ✅ Good: Secure API key handling for portfolio services
class PortfolioServices {
    constructor() {
        this.openaiKey = null;
        this.weatherKey = null;
        this.analyticsKey = null;
    }
    
    setAPIKey(service, key) {
        if (this.validateAPIKey(service, key)) {
            this[`${service}Key`] = key;
            // Consider encryption for sensitive keys
            localStorage.setItem(`${service}_api_key`, key);
        }
    }
    
    validateAPIKey(service, key) {
        const patterns = {
            openai: /^sk-[A-Za-z0-9]{48}$/,
            weather: /^[A-Za-z0-9]{32}$/,
            analytics: /^GA-[A-Z0-9-]+$/
        };
        return patterns[service]?.test(key) || false;
    }
}

// ❌ Bad: Hardcoded secrets in portfolio
const OPENAI_KEY = 'sk-1234567890abcdef'; // Never do this!
const WEATHER_KEY = 'abc123def456'; // Exposed to users!
```

### **Input Validation:**
```javascript
// ✅ Good: Comprehensive input sanitization for portfolio
function sanitizeUserInput(input, context = 'general') {
    if (typeof input !== 'string') return '';
    
    const maxLengths = {
        message: 500,
        name: 100,
        email: 254,
        subject: 200
    };
    
    const maxLength = maxLengths[context] || 500;
    
    return input
        .trim()
        .slice(0, maxLength)
        .replace(/[<>]/g, '') // Basic XSS prevention
        .replace(/javascript:/gi, '') // Prevent JS injection
        .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

function validateContactForm(data) {
    return {
        name: sanitizeUserInput(data.name, 'name'),
        email: validateEmail(data.email) ? data.email : '',
        subject: sanitizeUserInput(data.subject, 'subject'),
        message: sanitizeUserInput(data.message, 'message')
    };
}

// ❌ Bad: Direct usage without validation
function processContactForm(data) {
    return `<p>Thanks ${data.name}!</p>`; // XSS vulnerability
}
```

---

## ♿ **Accessibility Requirements**

### **Required ARIA Attributes:**
- `role` - Define element purpose
- `aria-label` - Accessible name when text isn't sufficient
- `aria-describedby` - Reference to descriptive text
- `aria-live` - Announce dynamic content changes
- `aria-hidden` - Hide decorative elements from screen readers

### **Keyboard Navigation:**
```javascript
// ✅ Good: Comprehensive keyboard support for portfolio
function setupPortfolioKeyboardNavigation() {
    // Profile page navigation
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'Tab':
                handleTabNavigation(event);
                break;
            case 'Enter':
            case ' ':
                handleActivation(event);
                break;
            case 'Escape':
                closeModals();
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                navigateMenuItems(event);
                break;
        }
    });
}

function setupChatKeyboardNavigation() {
    const chatInput = document.getElementById('message-input');
    chatInput?.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'Enter':
                if (!event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                }
                break;
            case 'ArrowUp':
                if (chatInput.value === '') {
                    loadPreviousMessage();
                }
                break;
        }
    });
}
```

### **Focus Management:**
```javascript
// ✅ Good: Proper focus management across portfolio
function setupFocusManagement() {
    // Modal focus trapping
    function trapFocusInModal(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
    
    // Chat widget focus management
    function manageChatFocus() {
        const chatToggle = document.querySelector('.chat-toggle');
        const chatInput = document.querySelector('.chat-input');
        
        chatToggle?.addEventListener('click', () => {
            if (chatInput) {
                setTimeout(() => chatInput.focus(), 100);
            }
        });
    }
    
    // Return focus after modals close
    function returnFocus(trigger) {
        if (trigger && typeof trigger.focus === 'function') {
            trigger.focus();
        }
    }
}
```

---

## 📱 **Responsive Design Standards**

### **Breakpoints:**
```css
/* Mobile First Approach for Portfolio */
.portfolio-component {
    /* Base mobile styles (320px+) */
    padding: 16px;
    font-size: 14px;
}

@media (min-width: 480px) {
    .portfolio-component {
        /* Large mobile styles */
        padding: 20px;
        font-size: 15px;
    }
}

@media (min-width: 768px) {
    .portfolio-component {
        /* Tablet styles */
        padding: 24px;
        font-size: 16px;
        display: grid;
        grid-template-columns: 1fr 300px;
    }
}

@media (min-width: 1024px) {
    .portfolio-component {
        /* Desktop styles */
        padding: 32px;
        max-width: 1200px;
        margin: 0 auto;
    }
}

@media (min-width: 1440px) {
    .portfolio-component {
        /* Large desktop styles */
        padding: 40px;
        max-width: 1400px;
    }
}
```

### **Touch-Friendly Design:**
```css
/* ✅ Good: Touch-friendly portfolio interactions */
.portfolio-button,
.chat-send-button,
.contact-button {
    min-height: 44px; /* iOS minimum touch target */
    min-width: 44px;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.portfolio-card {
    padding: 20px;
    margin: 16px 0;
    touch-action: manipulation; /* Prevent zoom on double-tap */
}

.chat-input {
    padding: 16px;
    font-size: 16px; /* Prevent zoom on iOS */
    line-height: 1.4;
}

/* Hover states only for non-touch devices */
@media (hover: hover) {
    .portfolio-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
}

/* ❌ Bad: Too small for touch */
.tiny-button {
    padding: 2px 4px;
    font-size: 10px;
    width: 20px;
    height: 20px;
}
```

---

## 🚀 **Performance Guidelines**

### **JavaScript Performance:**
```javascript
// ✅ Good: Optimized event handlers for portfolio
const debouncedScrollHandler = debounce((event) => {
    updateScrollIndicator();
    checkElementsInViewport();
}, 100);

const debouncedResizeHandler = debounce(() => {
    recalculateLayout();
    updateChatWidgetPosition();
}, 250);

const debouncedSearchHandler = debounce((query) => {
    performPortfolioSearch(query);
}, 300);

// Efficient intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px 0px'
};

const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            portfolioObserver.unobserve(entry.target); // Stop observing after animation
        }
    });
}, observerOptions);

// Lazy loading for portfolio images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ❌ Bad: Unbounded event handlers
window.addEventListener('scroll', () => {
    expensiveScrollCalculation(); // Called every scroll event!
});

window.addEventListener('resize', () => {
    heavyLayoutRecalculation(); // Called on every pixel change!
});
```

### **CSS Performance:**
```css
/* ✅ Good: Efficient selectors */
.chat-message {
    /* Direct class selector */
}

/* ❌ Bad: Expensive selectors */
div > div > div > span {
    /* Avoid deep nesting */
}

* {
    /* Avoid universal selectors in performance-critical code */
}
```

---

## 🧪 **Testing Requirements**

### **Required Test Types:**
- **Unit Tests** - Individual function testing for portfolio components and AI chat features
- **Integration Tests** - Component interaction testing between profile page and AI navigator
- **API Tests** - OpenAI API integration testing with mock and live responses
- **Accessibility Tests** - Screen reader and keyboard testing for all portfolio features
- **Performance Tests** - Load time, AI response speed, and responsiveness across devices
- **Cross-Browser Tests** - Chrome, Firefox, Safari, Edge compatibility for all features
- **Security Tests** - Input validation, XSS prevention, secure API communication
- **Mobile Tests** - iOS Safari, Android Chrome responsive behavior and touch interactions

### **Test Documentation:**
```javascript
// ✅ Good: Descriptive test cases
describe('PortfolioNavigator', () => {
    it('should handle user messages with proper sanitization', () => {
        const navigator = new PortfolioNavigator();
        const maliciousInput = '<script>alert("xss")</script>';
        const result = navigator.processMessage(maliciousInput);
        expect(result).not.toContain('<script>');
    });
});
```

---

## 📝 **Documentation Standards**

### **Code Comments:**
```javascript
// ✅ Good: Explain why, not what
function calculateRelevanceScore(message, portfolioData) {
    // Use TF-IDF to determine portfolio section relevance
    // This helps route users to the most relevant portfolio content
    const score = tfidf.calculate(message, portfolioData.keywords);
    return score;
}

// ❌ Bad: Obvious comments
function addNumbers(a, b) {
    return a + b; // Adds two numbers together
}
```

### **README Sections Required:**
- **Project Description** - What the AI Navigator does
- **Installation Instructions** - How to set up locally
- **Usage Examples** - How to interact with the system
- **API Documentation** - Available methods and parameters
- **Contributing Guidelines** - How to contribute to the project

---

## 🔄 **Code Review Checklist**

### **Before Submitting:**
- [ ] **Functionality** - Code works as intended
- [ ] **Security** - No hardcoded secrets or vulnerabilities
- [ ] **Accessibility** - WCAG 2.1 AA compliance
- [ ] **Performance** - No unnecessary re-renders or calculations
- [ ] **Documentation** - Clear comments and documentation
- [ ] **Testing** - Adequate test coverage
- [ ] **Browser Support** - Works across target browsers

### **Copilot-Generated Code Review:**
- [ ] **Understand the suggestion** - Don't accept without comprehension
- [ ] **Test the implementation** - Verify it works correctly
- [ ] **Check for security issues** - Especially with external APIs
- [ ] **Verify accessibility** - Ensure ARIA attributes are correct
- [ ] **Validate performance** - No performance regressions

---

## 🎯 **Project-Specific Rules**

### **AI Portfolio Navigator Specific:**
- **Portfolio Data** - Keep Jane's information current and accurate
- **Conversation Flow** - Maintain natural, helpful dialogue
- **Navigation Logic** - Ensure smooth transitions between portfolio sections
- **Response Quality** - AI responses should be informative and actionable
- **Privacy** - Respect user privacy and data handling best practices

### **OpenAI API Usage:**
- **Rate Limiting** - Implement proper request throttling
- **Error Handling** - Graceful degradation when API is unavailable
- **Cost Management** - Monitor token usage and implement limits
- **Context Management** - Maintain conversation context efficiently

---

## 📊 **Analytics & Monitoring**

### **Required Metrics:**
- **User Engagement** - Message count, session duration
- **Navigation Success** - Successful portfolio section visits
- **Error Rates** - API failures, JavaScript errors
- **Performance** - Page load times, interaction responsiveness
- **Accessibility Usage** - Screen reader and keyboard navigation

### **Privacy-First Analytics:**
```javascript
// ✅ Good: Anonymous analytics
function trackEvent(event, data) {
    const anonymizedData = {
        event,
        timestamp: Date.now(),
        sessionId: generateAnonymousId(),
        // No personal information
    };
    sendToAnalytics(anonymizedData);
}
```

---

## 🔧 **Development Workflow**

### **Git Commit Messages:**
```
✅ Good examples:
feat: add AI response generation with OpenAI API
fix: resolve accessibility issue in chat input
docs: update API integration guidelines
style: improve mobile responsiveness for chat interface

❌ Bad examples:
fixed stuff
update
changes
wip
```

### **Branch Naming:**
- `feature/ai-integration` - New features
- `fix/accessibility-improvements` - Bug fixes
- `docs/copilot-guidelines` - Documentation updates
- `refactor/chat-performance` - Code improvements

---

**Remember: AI assistance is a powerful tool, but human judgment and review are essential for quality, security, and accessibility. Always understand and test AI-generated code before implementing it in production.**