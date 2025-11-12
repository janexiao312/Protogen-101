// AI Portfolio Navigator JavaScript
// Author: Jane - Experience Designer
// Date: November 12, 2025

/**
 * PortfolioNavigator - AI-powered chat interface for portfolio exploration
 * Handles conversation flow, portfolio knowledge, and intelligent navigation
 */
class PortfolioNavigator {
    constructor() {
        this.messageHistory = [];
        this.isTyping = false;
        this.apiKey = null;
        this.currentConversationId = this.generateConversationId();
        this.isInitialized = false;
        
        // Portfolio knowledge base (will be expanded in Task 4)
        this.portfolioData = {
            personal: {
                name: "Jane",
                title: "Experience Designer",
                location: "Available for remote collaboration",
                expertise: ["UX/UI Design", "AI Integration", "Frontend Development", "User Research"],
                bio: "Experience Designer with a passion for integrating AI technology into human-centered design solutions."
            },
            projects: [
                {
                    id: "protogen-101",
                    name: "Protogen 101",
                    type: "AI Integration Project",
                    description: "AI-powered portfolio navigator demonstrating practical LLM integration in design workflows",
                    technologies: ["OpenAI API", "JavaScript", "CSS", "HTML"],
                    status: "In Development",
                    url: "#protogen-101"
                }
            ],
            skills: {
                design: ["User Experience Design", "User Interface Design", "User Research", "Prototyping", "Design Systems"],
                technical: ["JavaScript", "CSS3", "HTML5", "API Integration", "Responsive Design"],
                ai: ["LLM Integration", "Prompt Engineering", "AI-Human Interaction Design", "Conversational UI"]
            }
        };
        
        // DOM element references
        this.elements = {
            chatMessages: null,
            messageInput: null,
            sendButton: null,
            typingIndicator: null,
            portfolioPreview: null,
            helpModal: null,
            floatingWidget: null
        };
        
        // Event listeners
        this.boundHandlers = {
            sendMessage: this.handleSendMessage.bind(this),
            inputChange: this.handleInputChange.bind(this),
            keyPress: this.handleKeyPress.bind(this),
            suggestionClick: this.handleSuggestionClick.bind(this)
        };
        
        console.log('🤖 PortfolioNavigator initialized');
    }

    /**
     * Initialize the navigator after DOM content is loaded
     */
    async init() {
        if (this.isInitialized) return;
        
        try {
            // Get DOM element references
            this.setupDOMReferences();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Set up API key management
            this.setupAPIKey();
            
            // Initialize chat interface
            this.initializeChatInterface();
            
            // Set up accessibility features
            this.setupAccessibility();
            
            this.isInitialized = true;
            console.log('✅ PortfolioNavigator ready');
            
            // Track initialization
            this.trackEvent('navigator_initialized', {
                timestamp: Date.now(),
                conversationId: this.currentConversationId
            });
            
        } catch (error) {
            console.error('❌ Failed to initialize PortfolioNavigator:', error);
            this.showError('Failed to initialize chat interface. Please refresh the page.');
        }
    }

    /**
     * Set up DOM element references
     */
    setupDOMReferences() {
        this.elements = {
            chatMessages: document.getElementById('chat-messages'),
            messageInput: document.getElementById('message-input'),
            sendButton: document.getElementById('send-button'),
            typingIndicator: document.getElementById('typing-indicator'),
            portfolioPreview: document.getElementById('portfolio-preview'),
            helpModal: document.getElementById('help-modal'),
            floatingWidget: document.getElementById('floating-chat-widget'),
            characterCount: document.querySelector('.character-count'),
            clearButton: document.getElementById('clear-chat'),
            exportButton: document.getElementById('export-chat'),
            helpButton: document.querySelector('.help-button')
        };

        // Validate critical elements exist
        const criticalElements = ['chatMessages', 'messageInput', 'sendButton'];
        for (const elementKey of criticalElements) {
            if (!this.elements[elementKey]) {
                throw new Error(`Critical element not found: ${elementKey}`);
            }
        }
    }

    /**
     * Set up event listeners for chat interaction
     */
    setupEventListeners() {
        // Send button click
        if (this.elements.sendButton) {
            this.elements.sendButton.addEventListener('click', this.boundHandlers.sendMessage);
        }

        // Message input events
        if (this.elements.messageInput) {
            this.elements.messageInput.addEventListener('input', this.boundHandlers.inputChange);
            this.elements.messageInput.addEventListener('keypress', this.boundHandlers.keyPress);
        }

        // Suggestion chip clicks
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('suggestion-chip') || 
                event.target.classList.contains('widget-suggestion')) {
                this.boundHandlers.suggestionClick(event);
            }
        });

        // Control buttons
        if (this.elements.clearButton) {
            this.elements.clearButton.addEventListener('click', () => this.clearConversation());
        }
        
        if (this.elements.exportButton) {
            this.elements.exportButton.addEventListener('click', () => this.exportConversation());
        }

        if (this.elements.helpButton) {
            this.elements.helpButton.addEventListener('click', () => this.showHelp());
        }

        // Help modal close
        const helpCloseBtn = document.querySelector('.modal-close');
        const helpBackdrop = document.querySelector('.modal-backdrop');
        if (helpCloseBtn) {
            helpCloseBtn.addEventListener('click', () => this.hideHelp());
        }
        if (helpBackdrop) {
            helpBackdrop.addEventListener('click', () => this.hideHelp());
        }

        // Portfolio preview close
        const previewCloseBtn = document.querySelector('.preview-close');
        if (previewCloseBtn) {
            previewCloseBtn.addEventListener('click', () => this.hidePortfolioPreview());
        }

        // Floating widget toggle
        const widgetToggle = document.querySelector('.widget-toggle');
        const expandLink = document.querySelector('.expand-link');
        
        if (widgetToggle) {
            widgetToggle.addEventListener('click', () => this.toggleFloatingWidget());
        }
        
        if (expandLink) {
            expandLink.addEventListener('click', () => this.expandToFullChat());
        }

        // Escape key to close modals
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.hideHelp();
                this.hidePortfolioPreview();
                this.hideFloatingWidget();
            }
        });

        console.log('🔗 Event listeners set up');
    }

    /**
     * Set up API key management
     */
    setupAPIKey() {
        // Check for stored API key
        const storedApiKey = localStorage.getItem('portfolio_openai_key');
        if (storedApiKey) {
            this.apiKey = storedApiKey;
            console.log('🔑 API key loaded from storage');
        }
    }

    /**
     * Initialize chat interface with welcome message
     */
    initializeChatInterface() {
        // Enable send button based on input
        this.updateSendButtonState();
        
        // Focus message input for immediate interaction
        if (this.elements.messageInput) {
            this.elements.messageInput.focus();
        }

        // Set up character counting
        this.updateCharacterCount();

        console.log('💬 Chat interface initialized');
    }

    /**
     * Set up accessibility features
     */
    setupAccessibility() {
        // Announce when messages are added
        if (this.elements.chatMessages) {
            this.elements.chatMessages.setAttribute('aria-live', 'polite');
            this.elements.chatMessages.setAttribute('aria-atomic', 'false');
        }

        // Set up keyboard navigation hints
        if (this.elements.messageInput) {
            this.elements.messageInput.setAttribute('aria-describedby', 'input-help');
        }

        console.log('♿ Accessibility features enabled');
    }

    /**
     * Handle sending a message
     */
    async handleSendMessage(event) {
        event.preventDefault();
        
        const messageText = this.elements.messageInput.value.trim();
        if (!messageText || this.isTyping) return;

        try {
            // Add user message to chat
            this.addMessage('user', messageText);
            
            // Clear input
            this.elements.messageInput.value = '';
            this.updateCharacterCount();
            this.updateSendButtonState();
            
            // Track message sent
            this.trackEvent('message_sent', {
                messageLength: messageText.length,
                conversationId: this.currentConversationId
            });
            
            // Show typing indicator
            this.showTypingIndicator();
            
            // Process message (this will be enhanced in later tasks)
            await this.processUserMessage(messageText);
            
        } catch (error) {
            console.error('❌ Error sending message:', error);
            this.showError('Sorry, there was an error sending your message. Please try again.');
            this.hideTypingIndicator();
        }
    }

    /**
     * Handle input change events
     */
    handleInputChange(event) {
        this.updateCharacterCount();
        this.updateSendButtonState();
    }

    /**
     * Handle key press events
     */
    handleKeyPress(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.handleSendMessage(event);
        }
    }

    /**
     * Handle suggestion chip clicks
     */
    handleSuggestionClick(event) {
        const question = event.target.getAttribute('data-question');
        if (question && this.elements.messageInput) {
            this.elements.messageInput.value = question;
            this.updateCharacterCount();
            this.updateSendButtonState();
            
            // Auto-send the suggestion
            this.handleSendMessage(new Event('click'));
            
            // Track suggestion usage
            this.trackEvent('suggestion_used', {
                suggestion: question,
                conversationId: this.currentConversationId
            });
        }
    }

    /**
     * Add a message to the chat
     */
    addMessage(sender, text, options = {}) {
        if (!this.elements.chatMessages) return;

        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.setAttribute('role', 'article');
        
        // Create avatar
        const avatarElement = document.createElement('div');
        avatarElement.className = 'message-avatar';
        
        if (sender === 'ai') {
            avatarElement.innerHTML = `
                <div class="ai-avatar">
                    <svg class="ai-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9l-5.91 4.74L18 22l-6-3.27L6 22l1.91-8.26L2 9l6.91-.74L12 2z"></path>
                    </svg>
                </div>
            `;
        } else {
            avatarElement.innerHTML = `
                <div class="user-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            `;
        }

        // Create message content
        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        
        const textElement = document.createElement('div');
        textElement.className = 'message-text';
        textElement.textContent = text;

        contentElement.appendChild(textElement);
        messageElement.appendChild(avatarElement);
        messageElement.appendChild(contentElement);

        // Add to chat
        this.elements.chatMessages.appendChild(messageElement);

        // Store in history
        this.messageHistory.push({
            sender,
            text,
            timestamp: Date.now(),
            options
        });

        // Scroll to bottom
        this.scrollToBottom();

        console.log(`📝 ${sender} message added: ${text.substring(0, 50)}...`);
    }

    /**
     * Process user message (placeholder for AI integration)
     */
    async processUserMessage(message) {
        // Simulate processing delay
        await this.delay(1000 + Math.random() * 1000);
        
        // Hide typing indicator
        this.hideTypingIndicator();
        
        // Simple response for now (will be enhanced with AI in later tasks)
        const response = this.generateBasicResponse(message);
        this.addMessage('ai', response);
        
        console.log('🔄 Message processed:', message);
    }

    /**
     * Generate basic response (temporary, before AI integration)
     */
    generateBasicResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simple keyword-based responses
        if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
            return "Jane is an Experience Designer with expertise in UX/UI design, user research, and AI integration. She combines design thinking with technical implementation to create human-centered digital experiences.";
        }
        
        if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
            return "Jane specializes in integrating AI technology into design workflows. Her current project, Protogen 101, demonstrates practical LLM integration for portfolio navigation and user interaction.";
        }
        
        if (lowerMessage.includes('skills') || lowerMessage.includes('technical')) {
            return "Jane's technical skills include JavaScript, CSS3, HTML5, API integration, and responsive design. She also has expertise in prompt engineering and conversational UI design.";
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('work')) {
            return "Jane is available for design consultation and collaboration. You can reach out through the contact form on her portfolio page to discuss potential projects.";
        }
        
        if (lowerMessage.includes('projects') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
            return "Jane's current focus is on Protogen 101, an AI-powered portfolio navigator. She has experience in UX design, frontend development, and AI integration projects. Would you like to know more about any specific area?";
        }
        
        // Default response
        return "I'd be happy to help you learn more about Jane's work! You can ask me about her design experience, technical skills, AI projects, or how to get in touch for collaboration opportunities.";
    }

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        if (this.elements.typingIndicator) {
            this.elements.typingIndicator.setAttribute('aria-hidden', 'false');
            this.isTyping = true;
            this.scrollToBottom();
        }
    }

    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        if (this.elements.typingIndicator) {
            this.elements.typingIndicator.setAttribute('aria-hidden', 'true');
            this.isTyping = false;
        }
    }

    /**
     * Update character count display
     */
    updateCharacterCount() {
        if (this.elements.characterCount && this.elements.messageInput) {
            const count = this.elements.messageInput.value.length;
            const maxLength = this.elements.messageInput.maxLength || 500;
            this.elements.characterCount.textContent = `${count}/${maxLength} characters`;
            
            // Update color based on usage
            if (count > maxLength * 0.8) {
                this.elements.characterCount.style.color = 'var(--warning-color, #f56565)';
            } else {
                this.elements.characterCount.style.color = 'var(--text-muted)';
            }
        }
    }

    /**
     * Update send button state based on input
     */
    updateSendButtonState() {
        if (this.elements.sendButton && this.elements.messageInput) {
            const hasText = this.elements.messageInput.value.trim().length > 0;
            this.elements.sendButton.disabled = !hasText || this.isTyping;
        }
    }

    /**
     * Scroll chat to bottom
     */
    scrollToBottom() {
        if (this.elements.chatMessages) {
            this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
        }
    }

    /**
     * Clear conversation
     */
    clearConversation() {
        if (confirm('Are you sure you want to clear this conversation?')) {
            // Clear messages from DOM (keep welcome message)
            const welcomeMessage = this.elements.chatMessages.querySelector('.welcome-message');
            const typingIndicator = this.elements.chatMessages.querySelector('.typing-message');
            
            this.elements.chatMessages.innerHTML = '';
            if (welcomeMessage) {
                this.elements.chatMessages.appendChild(welcomeMessage);
            }
            if (typingIndicator) {
                this.elements.chatMessages.appendChild(typingIndicator);
            }
            
            // Clear history (keep system messages)
            this.messageHistory = [];
            
            // Generate new conversation ID
            this.currentConversationId = this.generateConversationId();
            
            // Track event
            this.trackEvent('conversation_cleared', {
                conversationId: this.currentConversationId
            });
            
            console.log('🗑️ Conversation cleared');
        }
    }

    /**
     * Export conversation
     */
    exportConversation() {
        const exportData = {
            conversationId: this.currentConversationId,
            timestamp: new Date().toISOString(),
            messages: this.messageHistory.map(msg => ({
                sender: msg.sender,
                text: msg.text,
                timestamp: new Date(msg.timestamp).toISOString()
            })),
            metadata: {
                portfolioData: this.portfolioData.personal,
                totalMessages: this.messageHistory.length
            }
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `portfolio-chat-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        // Track event
        this.trackEvent('conversation_exported', {
            conversationId: this.currentConversationId,
            messageCount: this.messageHistory.length
        });
        
        console.log('📄 Conversation exported');
    }

    /**
     * Show help modal
     */
    showHelp() {
        if (this.elements.helpModal) {
            this.elements.helpModal.setAttribute('aria-hidden', 'false');
            
            // Focus management
            const firstFocusable = this.elements.helpModal.querySelector('.modal-close');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }

    /**
     * Hide help modal
     */
    hideHelp() {
        if (this.elements.helpModal) {
            this.elements.helpModal.setAttribute('aria-hidden', 'true');
            
            // Return focus to help button
            if (this.elements.helpButton) {
                this.elements.helpButton.focus();
            }
        }
    }

    /**
     * Show portfolio preview
     */
    showPortfolioPreview(content) {
        if (this.elements.portfolioPreview) {
            const previewContent = this.elements.portfolioPreview.querySelector('.preview-content');
            if (previewContent) {
                previewContent.innerHTML = content;
            }
            
            this.elements.portfolioPreview.setAttribute('aria-hidden', 'false');
            
            // Track event
            this.trackEvent('portfolio_preview_shown', {
                conversationId: this.currentConversationId
            });
        }
    }

    /**
     * Hide portfolio preview
     */
    hidePortfolioPreview() {
        if (this.elements.portfolioPreview) {
            this.elements.portfolioPreview.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Toggle floating widget
     */
    toggleFloatingWidget() {
        if (this.elements.floatingWidget) {
            const isHidden = this.elements.floatingWidget.getAttribute('aria-hidden') === 'true';
            this.elements.floatingWidget.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
            
            const toggle = this.elements.floatingWidget.querySelector('.widget-toggle');
            if (toggle) {
                toggle.classList.toggle('open', !isHidden);
            }
        }
    }

    /**
     * Hide floating widget
     */
    hideFloatingWidget() {
        if (this.elements.floatingWidget) {
            this.elements.floatingWidget.setAttribute('aria-hidden', 'true');
            
            const toggle = this.elements.floatingWidget.querySelector('.widget-toggle');
            if (toggle) {
                toggle.classList.remove('open');
            }
        }
    }

    /**
     * Expand to full chat
     */
    expandToFullChat() {
        window.location.href = 'ai-navigator.html';
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorBoundary = document.getElementById('error-boundary');
        if (errorBoundary) {
            const errorContent = errorBoundary.querySelector('.error-content p');
            if (errorContent) {
                errorContent.textContent = message;
            }
            errorBoundary.setAttribute('aria-hidden', 'false');
        }
        
        // Also add as chat message
        this.addMessage('ai', `❌ ${message}`);
    }

    /**
     * Generate unique conversation ID
     */
    generateConversationId() {
        return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Utility delay function
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Track analytics events
     */
    trackEvent(event, data) {
        if (window.portfolioAnalytics && typeof window.portfolioAnalytics.trackEvent === 'function') {
            window.portfolioAnalytics.trackEvent(event, data);
        }
    }
}

/**
 * Initialize PortfolioNavigator when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const navigator = new PortfolioNavigator();
        await navigator.init();
        
        // Make navigator globally available for debugging
        window.portfolioNavigator = navigator;
        
        console.log('🚀 Portfolio Navigator loaded successfully');
        
    } catch (error) {
        console.error('❌ Failed to load Portfolio Navigator:', error);
        
        // Show fallback error
        const errorBoundary = document.getElementById('error-boundary');
        if (errorBoundary) {
            errorBoundary.setAttribute('aria-hidden', 'false');
        }
    }
});

/**
 * Handle page unload for cleanup
 */
window.addEventListener('beforeunload', function() {
    if (window.portfolioNavigator) {
        // Track session end
        window.portfolioNavigator.trackEvent('session_ended', {
            duration: Date.now() - performance.timing.navigationStart,
            messageCount: window.portfolioNavigator.messageHistory.length
        });
    }
});