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
        
        // Portfolio knowledge base - Comprehensive structured data about Jane's work and skills
        this.portfolioData = {
            personal: {
                name: "Jane Xiao",
                title: "Experience Designer & AI Integration Specialist",
                location: "Available for remote collaboration",
                tagline: "Bridging human-centered design with artificial intelligence",
                expertise: ["UX/UI Design", "AI Integration", "Frontend Development", "User Research", "Design Systems"],
                bio: "Experience Designer with expertise in integrating AI technology into human-centered design solutions. Passionate about creating intuitive interfaces that leverage machine learning capabilities while maintaining exceptional user experiences.",
                contact: {
                    email: "Available through contact form",
                    linkedin: "Connect via portfolio",
                    portfolio: "Browse projects below"
                },
                availability: "Open to new opportunities and collaborations"
            },
            
            projects: [
                {
                    id: "protogen-101",
                    name: "Protogen 101",
                    type: "AI Integration Project",
                    description: "AI-powered portfolio navigator demonstrating practical LLM integration in design workflows. Features natural language portfolio exploration, intelligent content recommendations, and seamless user interaction.",
                    technologies: ["OpenAI API", "JavaScript ES6+", "CSS3", "HTML5", "Accessibility Standards"],
                    features: ["Natural Language Processing", "Portfolio Content Navigation", "Responsive Chat Interface", "Accessibility Compliance"],
                    challenges: ["API Integration", "Context Management", "Performance Optimization", "User Experience Design"],
                    status: "In Development",
                    url: "#protogen-101",
                    category: "frontend",
                    tags: ["AI", "Chat Interface", "Portfolio", "JavaScript"]
                },
                {
                    id: "design-system-ai",
                    name: "AI-Enhanced Design System",
                    type: "Design System Project",
                    description: "Comprehensive design system with AI-powered component suggestions and automated accessibility checks",
                    technologies: ["Figma", "Design Tokens", "CSS Variables", "JavaScript", "AI APIs"],
                    features: ["Component Library", "Automated A11y Testing", "AI Design Suggestions", "Token Management"],
                    status: "Concept",
                    url: "#design-system",
                    category: "design",
                    tags: ["Design System", "AI", "Accessibility", "Components"]
                },
                {
                    id: "user-research-platform",
                    name: "User Research Platform",
                    type: "UX Research Tool",
                    description: "Platform for conducting and analyzing user research with AI-assisted insights and pattern recognition",
                    technologies: ["React", "Node.js", "Machine Learning APIs", "Data Visualization"],
                    features: ["Interview Analysis", "Pattern Recognition", "Insight Generation", "Report Automation"],
                    status: "Concept",
                    url: "#research-platform",
                    category: "research",
                    tags: ["UX Research", "AI Analysis", "Data Visualization", "Platform"]
                }
            ],
            
            skills: {
                design: {
                    title: "Design & Research",
                    skills: [
                        { name: "User Experience Design", level: "Expert", description: "End-to-end UX design process from research to implementation" },
                        { name: "User Interface Design", level: "Expert", description: "Creating intuitive and accessible digital interfaces" },
                        { name: "User Research", level: "Advanced", description: "Qualitative and quantitative research methods" },
                        { name: "Prototyping", level: "Advanced", description: "Rapid prototyping and iterative design" },
                        { name: "Design Systems", level: "Advanced", description: "Scalable design system creation and maintenance" },
                        { name: "Information Architecture", level: "Advanced", description: "Content organization and navigation design" }
                    ]
                },
                technical: {
                    title: "Technical Skills",
                    skills: [
                        { name: "JavaScript ES6+", level: "Advanced", description: "Modern JavaScript development and API integration" },
                        { name: "CSS3 & Sass", level: "Advanced", description: "Advanced styling, animations, and responsive design" },
                        { name: "HTML5", level: "Expert", description: "Semantic markup and accessibility standards" },
                        { name: "React", level: "Intermediate", description: "Component-based frontend development" },
                        { name: "API Integration", level: "Advanced", description: "RESTful APIs and third-party service integration" },
                        { name: "Responsive Design", level: "Expert", description: "Mobile-first and cross-device compatibility" }
                    ]
                },
                ai: {
                    title: "AI & Machine Learning",
                    skills: [
                        { name: "LLM Integration", level: "Advanced", description: "OpenAI API and language model implementation" },
                        { name: "Prompt Engineering", level: "Advanced", description: "Optimizing AI prompts for specific use cases" },
                        { name: "AI-Human Interaction Design", level: "Advanced", description: "Designing intuitive AI-powered experiences" },
                        { name: "Conversational UI", level: "Advanced", description: "Chat interfaces and voice interaction design" },
                        { name: "Machine Learning Basics", level: "Intermediate", description: "Understanding ML concepts for design applications" }
                    ]
                }
            },
            
            experience: [
                {
                    title: "Senior UX Designer",
                    company: "Tech Innovation Lab",
                    period: "2022 - Present",
                    description: "Leading AI integration projects and designing human-centered solutions for complex technical challenges.",
                    achievements: [
                        "Designed AI-powered user interfaces improving task completion by 40%",
                        "Led cross-functional teams in implementing accessibility standards",
                        "Developed design system adopted across multiple product lines"
                    ]
                },
                {
                    title: "UX/UI Designer",
                    company: "Digital Design Studio",
                    period: "2020 - 2022", 
                    description: "Focused on user research, interface design, and frontend implementation for web applications.",
                    achievements: [
                        "Conducted user research informing product strategy decisions",
                        "Designed responsive interfaces for 15+ client projects",
                        "Mentored junior designers in design thinking methodologies"
                    ]
                }
            ],
            
            // Portfolio section mapping for navigation
            sections: {
                about: {
                    title: "About",
                    description: "Learn about Jane's background, expertise, and design philosophy",
                    keywords: ["about", "bio", "background", "experience", "philosophy", "approach"],
                    content: "personal"
                },
                projects: {
                    title: "Projects",
                    description: "Explore Jane's portfolio of design and development projects",
                    keywords: ["projects", "work", "portfolio", "cases", "examples", "protogen"],
                    content: "projects"
                },
                skills: {
                    title: "Skills",
                    description: "Technical and design capabilities across AI, UX, and development",
                    keywords: ["skills", "capabilities", "expertise", "technologies", "tools"],
                    content: "skills"
                },
                experience: {
                    title: "Experience",
                    description: "Professional background and career highlights",
                    keywords: ["experience", "work history", "career", "jobs", "roles"],
                    content: "experience"
                },
                contact: {
                    title: "Contact",
                    description: "Get in touch for collaboration opportunities",
                    keywords: ["contact", "email", "hire", "collaborate", "connect", "reach"],
                    content: "contact"
                }
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
     * Set up API key management with enhanced validation
     */
    setupAPIKey() {
        // Check for stored API key
        const storedApiKey = localStorage.getItem('portfolio_openai_key');
        if (storedApiKey && this.validateAPIKey(storedApiKey)) {
            this.apiKey = storedApiKey;
            console.log('🔑 API key loaded from storage');
        } else {
            console.log('🔓 No valid API key found - using basic responses');
        }
    }
    
    /**
     * Validate OpenAI API key format
     */
    validateAPIKey(key) {
        return key && typeof key === 'string' && key.startsWith('sk-') && key.length > 20;
    }
    
    /**
     * Set API key and save to localStorage
     */
    setAPIKey(key) {
        if (this.validateAPIKey(key)) {
            this.apiKey = key;
            localStorage.setItem('portfolio_openai_key', key);
            console.log('✅ API key set successfully');
            return true;
        } else {
            console.error('❌ Invalid API key format');
            return false;
        }
    }
    
    /**
     * Clear stored API key
     */
    clearAPIKey() {
        this.apiKey = null;
        localStorage.removeItem('portfolio_openai_key');
        console.log('🗑️ API key cleared');
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
     * Process user message with AI integration and portfolio context
     */
    async processUserMessage(message) {
        try {
            // Classify intent and prepare context
            const intent = this.classifyIntent(message.toLowerCase());
            let response;
            
            // Check for navigation intents first
            if (intent.type === 'navigation' || this.isNavigationRequest(message)) {
                response = await this.processNavigationIntent(message, intent);
            } else if (this.apiKey) {
                // Use OpenAI API with portfolio context
                response = await this.generateAIResponse(message, intent);
            } else {
                // Fall back to basic response generation
                response = this.generateBasicResponse(message);
            }
            
            // Simulate realistic processing delay
            await this.delay(500 + Math.random() * 1000);
            
            // Hide typing indicator and show response
            this.hideTypingIndicator();
            this.addMessage('ai', response);
            
            // Track successful message processing
            this.trackEvent('message_processed', {
                intent: intent.type,
                useAI: !!this.apiKey,
                hasNavigation: intent.type === 'navigation',
                conversationId: this.currentConversationId
            });
            
            console.log('🔄 Message processed:', message);
            
        } catch (error) {
            console.error('❌ Error processing message:', error);
            this.hideTypingIndicator();
            
            // Use enhanced error handling
            this.handleAPIError(error);
            
            // Fallback to basic response if not API-related error
            if (!error.message.includes('API') && !error.message.includes('rate limit')) {
                const fallbackResponse = this.generateBasicResponse(message);
                this.addMessage('ai', fallbackResponse);
            }
        }
    }
    
    /**
     * Check if message is a navigation request
     */
    isNavigationRequest(message) {
        const navigationKeywords = [
            'show me', 'take me', 'go to', 'navigate', 'visit',
            'preview', 'look at', 'see', 'view', 'display',
            'find', 'search', 'suggest', 'recommend'
        ];
        
        const lowerMessage = message.toLowerCase();
        return navigationKeywords.some(keyword => lowerMessage.includes(keyword));
    }
    
    /**
     * Generate AI-powered response using OpenAI API
     */
    async generateAIResponse(message, intent) {
        if (!this.apiKey) {
            throw new Error('No API key available');
        }
        
        try {
            const systemPrompt = this.buildSystemPrompt(intent);
            const contextualPrompt = this.buildContextualPrompt(message, intent);
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: contextualPrompt }
                    ],
                    max_tokens: 300,
                    temperature: 0.7,
                    presence_penalty: 0.1,
                    frequency_penalty: 0.1
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
            }
            
            const data = await response.json();
            const aiResponse = data.choices[0]?.message?.content?.trim();
            
            if (!aiResponse) {
                throw new Error('Empty response from API');
            }
            
            return aiResponse;
            
        } catch (error) {
            console.error('🚨 OpenAI API Error:', error);
            
            // Handle specific error types
            if (error.message.includes('API key')) {
                this.clearAPIKey();
                throw new Error('Invalid API key. Please check your OpenAI API key.');
            }
            
            if (error.message.includes('rate limit')) {
                throw new Error('Rate limit exceeded. Please try again in a moment.');
            }
            
            throw new Error('AI service temporarily unavailable. Using basic response.');
        }
    }
    
    /**
     * Build system prompt with portfolio context
     */
    buildSystemPrompt(intent) {
        const personalInfo = this.portfolioData.personal;
        const projects = this.portfolioData.projects;
        const skills = Object.entries(this.portfolioData.skills);
        
        return `You are an AI assistant helping visitors learn about ${personalInfo.name}, a ${personalInfo.title}.

PERSONA: Be helpful, professional, and enthusiastic about ${personalInfo.name}'s work. Keep responses conversational and engaging while being informative.

CORE INFORMATION:
- Name: ${personalInfo.name}
- Title: ${personalInfo.title}
- Bio: ${personalInfo.bio}
- Expertise: ${personalInfo.expertise.join(', ')}
- Availability: ${personalInfo.availability}

KEY PROJECTS:
${projects.map(p => `- ${p.name}: ${p.description}`).join('\n')}

SKILLS OVERVIEW:
${skills.map(([cat, data]) => `- ${data.title}: ${data.skills.slice(0, 3).map(s => s.name).join(', ')}`).join('\n')}

GUIDELINES:
- Keep responses under 250 words
- Be specific about ${personalInfo.name}'s capabilities
- Mention relevant projects when appropriate
- For contact requests, direct to portfolio contact form
- For navigation requests, reference specific portfolio sections
- Don't make up information not provided in the context`;
    }
    
    /**
     * Build contextual prompt based on user intent
     */
    buildContextualPrompt(message, intent) {
        let contextPrompt = `User question: "${message}"\n\n`;
        
        // Add intent-specific context
        switch (intent.type) {
            case 'projects':
                contextPrompt += `Context: User is asking about projects. Relevant projects:\n`;
                contextPrompt += this.portfolioData.projects.map(p => 
                    `- ${p.name} (${p.status}): ${p.description}`
                ).join('\n');
                break;
                
            case 'skills':
                contextPrompt += `Context: User is asking about skills. Detailed skills:\n`;
                Object.entries(this.portfolioData.skills).forEach(([cat, data]) => {
                    contextPrompt += `${data.title}:\n`;
                    contextPrompt += data.skills.map(s => `  - ${s.name} (${s.level}): ${s.description}`).join('\n') + '\n';
                });
                break;
                
            case 'experience':
                contextPrompt += `Context: User is asking about experience. Work history:\n`;
                contextPrompt += this.portfolioData.experience.map(exp =>
                    `- ${exp.title} at ${exp.company} (${exp.period}): ${exp.description}`
                ).join('\n');
                break;
                
            case 'about':
                contextPrompt += `Context: User wants to know about Jane personally. Include her design philosophy and approach.`;
                break;
                
            case 'contact':
                contextPrompt += `Context: User wants to contact Jane. She is ${this.portfolioData.personal.availability.toLowerCase()}`;
                break;
        }
        
        return contextPrompt;
    }

    /**
     * Generate intelligent response using portfolio knowledge system
     */
    generateBasicResponse(message) {
        const lowerMessage = message.toLowerCase();
        const intent = this.classifyIntent(lowerMessage);
        
        // Route to appropriate response handler
        switch (intent.type) {
            case 'about':
                return this.generateAboutResponse(intent);
            case 'skills':
                return this.generateSkillsResponse(intent);
            case 'projects':
                return this.generateProjectsResponse(intent);
            case 'experience':
                return this.generateExperienceResponse(intent);
            case 'contact':
                return this.generateContactResponse(intent);
            case 'ai':
                return this.generateAIResponse(intent);
            case 'navigation':
                return this.generateNavigationResponse(intent);
            default:
                return this.generateDefaultResponse();
        }
    }
    
    /**
     * Classify user intent from message
     */
    classifyIntent(message) {
        const keywords = {
            about: ['about', 'bio', 'background', 'who', 'jane', 'philosophy', 'approach'],
            skills: ['skills', 'capabilities', 'expertise', 'technologies', 'tools', 'technical', 'design'],
            projects: ['projects', 'work', 'portfolio', 'protogen', 'cases', 'examples', 'built', 'created'],
            experience: ['experience', 'career', 'history', 'jobs', 'roles', 'worked', 'professional'],
            contact: ['contact', 'hire', 'collaborate', 'email', 'reach', 'connect', 'available'],
            ai: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'openai', 'chatgpt'],
            navigation: ['show', 'take me', 'navigate', 'go to', 'see', 'view', 'find']
        };
        
        let bestMatch = { type: 'default', score: 0, keywords: [] };
        
        for (const [type, typeKeywords] of Object.entries(keywords)) {
            const matches = typeKeywords.filter(keyword => message.includes(keyword));
            const score = matches.length;
            
            if (score > bestMatch.score) {
                bestMatch = { type, score, keywords: matches };
            }
        }
        
        return bestMatch;
    }
    
    /**
     * Generate about response
     */
    generateAboutResponse(intent) {
        const personal = this.portfolioData.personal;
        
        if (intent.keywords.includes('philosophy') || intent.keywords.includes('approach')) {
            return `${personal.name}'s design philosophy centers on ${personal.tagline.toLowerCase()}. She believes in creating intuitive interfaces that leverage AI capabilities while maintaining exceptional user experiences.`;
        }
        
        return `${personal.name} is a ${personal.title} based ${personal.location}. ${personal.bio} Her expertise includes ${personal.expertise.slice(0, 3).join(', ')}, and more.`;
    }
    
    /**
     * Generate skills response
     */
    generateSkillsResponse(intent) {
        const skills = this.portfolioData.skills;
        
        if (intent.keywords.includes('technical')) {
            const techSkills = skills.technical.skills.slice(0, 4).map(s => s.name);
            return `Jane's technical skills include ${techSkills.join(', ')}. She specializes in modern web development and API integration for AI-powered applications.`;
        }
        
        if (intent.keywords.includes('design')) {
            const designSkills = skills.design.skills.slice(0, 4).map(s => s.name);
            return `Jane's design expertise covers ${designSkills.join(', ')}. She focuses on user-centered design processes and creating accessible digital experiences.`;
        }
        
        // General skills overview
        const categories = Object.keys(skills);
        return `Jane has expertise across ${categories.length} main areas: ${categories.map(cat => skills[cat].title).join(', ')}. Would you like to explore any specific skill area in detail?`;
    }
    
    /**
     * Generate projects response
     */
    generateProjectsResponse(intent) {
        const projects = this.portfolioData.projects;
        
        if (intent.keywords.includes('protogen')) {
            const protogen = projects.find(p => p.id === 'protogen-101');
            return `${protogen.name} is ${protogen.description} It features ${protogen.features.slice(0, 3).join(', ')}, and more. Currently ${protogen.status.toLowerCase()}.`;
        }
        
        // General projects overview
        const activeProjects = projects.filter(p => p.status !== 'Concept');
        const conceptProjects = projects.filter(p => p.status === 'Concept');
        
        return `Jane has ${projects.length} featured projects: ${activeProjects.length} in development and ${conceptProjects.length} in concept phase. Her work spans ${[...new Set(projects.map(p => p.category))].join(', ')} development. Would you like details about any specific project?`;
    }
    
    /**
     * Generate experience response
     */
    generateExperienceResponse(intent) {
        const experience = this.portfolioData.experience;
        
        if (experience.length > 0) {
            const current = experience[0];
            const totalYears = experience.reduce((years, exp) => {
                const duration = exp.period.includes('Present') ? 2 : 2; // Simplified calculation
                return years + duration;
            }, 0);
            
            return `Jane has ${totalYears}+ years of professional experience. Currently ${current.title} at ${current.company}, where she ${current.description.toLowerCase()} Key achievements include ${current.achievements[0].toLowerCase()}`;
        }
        
        return "Jane brings extensive experience in UX design and AI integration to her projects.";
    }
    
    /**
     * Generate contact response
     */
    generateContactResponse(intent) {
        const personal = this.portfolioData.personal;
        
        if (intent.keywords.includes('available') || intent.keywords.includes('hire')) {
            return `${personal.availability} ${personal.contact.email} You can also ${personal.contact.linkedin} or ${personal.contact.portfolio}`;
        }
        
        return `I'd be happy to help connect you with Jane! ${personal.contact.email} for collaboration opportunities. She's currently ${personal.availability.toLowerCase()}`;
    }
    
    /**
     * Generate AI-specific response
     */
    generateAIResponse(intent) {
        const aiSkills = this.portfolioData.skills.ai.skills;
        const protogen = this.portfolioData.projects.find(p => p.id === 'protogen-101');
        
        return `Jane specializes in ${aiSkills.slice(0, 3).map(s => s.name).join(', ')}. Her current project, ${protogen.name}, demonstrates ${protogen.description} This chat interface you're using is part of that project!`;
    }
    
    /**
     * Generate navigation response
     */
    generateNavigationResponse(intent) {
        const sections = this.portfolioData.sections;
        const sectionNames = Object.keys(sections);
        
        return `I can help you explore Jane's portfolio! Available sections include: ${sectionNames.map(s => sections[s].title).join(', ')}. Just ask about any area you'd like to learn more about, or say something like "show me projects" or "tell me about skills".`;
    }
    
    /**
     * Generate default response
     */
    generateDefaultResponse() {
        const suggestions = [
            "her design experience and technical skills",
            "current projects like Protogen 101",
            "AI integration expertise",
            "how to get in touch for collaboration"
        ];
        
        return `I'd be happy to help you learn more about Jane's work! You can ask me about ${suggestions.join(', ')}, or anything else you'd like to know.`;
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
     * Show API key setup prompt
     */
    showAPIKeyPrompt() {
        const apiKey = prompt(
            'To enable AI responses, please enter your OpenAI API key:\n\n' +
            '• Get your API key from: https://platform.openai.com/account/api-keys\n' +
            '• Key format: sk-...\n' +
            '• Your key is stored locally and never shared\n\n' +
            'Leave empty to continue with basic responses.'
        );
        
        if (apiKey) {
            if (this.setAPIKey(apiKey)) {
                this.addMessage('ai', '✅ API key set successfully! I can now provide more intelligent responses powered by AI.');
                return true;
            } else {
                this.showError('Invalid API key format. Please check your key and try again.');
                return false;
            }
        }
        
        return false;
    }
    
    /**
     * Check API key status and prompt if needed
     */
    checkAPIKeyStatus() {
        if (!this.apiKey) {
            const shouldSetup = confirm(
                'Would you like to set up AI-powered responses?\n\n' +
                'This requires an OpenAI API key for enhanced conversation capabilities.'
            );
            
            if (shouldSetup) {
                return this.showAPIKeyPrompt();
            }
        }
        
        return !!this.apiKey;
    }
    
    /**
     * Handle API errors with user-friendly messages
     */
    handleAPIError(error) {
        console.error('🚨 API Error:', error);
        
        if (error.message.includes('API key')) {
            this.addMessage('ai', 
                '🔑 API key issue detected. ' +
                'You can continue with basic responses, or set up your OpenAI API key for enhanced AI features.'
            );
            this.clearAPIKey();
        } else if (error.message.includes('rate limit')) {
            this.addMessage('ai', 
                '⏱️ Too many requests. Please wait a moment before sending another message.'
            );
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            this.addMessage('ai', 
                '🌐 Connection issue. Please check your internet connection and try again.'
            );
        } else {
            this.addMessage('ai', 
                '🤖 AI service temporarily unavailable. Switching to basic response mode.'
            );
        }
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
     * Get portfolio section metadata for navigation
     */
    getPortfolioSectionMetadata(sectionName) {
        const section = this.portfolioData.sections[sectionName];
        if (!section) return null;
        
        return {
            title: section.title,
            description: section.description,
            keywords: section.keywords,
            url: `#${sectionName}`,
            content: this.getPortfolioContent(section.content)
        };
    }
    
    /**
     * Get specific portfolio content by type
     */
    getPortfolioContent(contentType) {
        switch (contentType) {
            case 'personal':
                return this.portfolioData.personal;
            case 'projects':
                return this.portfolioData.projects;
            case 'skills':
                return this.portfolioData.skills;
            case 'experience':
                return this.portfolioData.experience;
            case 'contact':
                return this.portfolioData.personal.contact;
            default:
                return null;
        }
    }
    
    /**
     * Find related portfolio items based on keywords
     */
    findRelatedContent(keywords, excludeId = null) {
        const related = [];
        
        // Check projects
        this.portfolioData.projects.forEach(project => {
            if (excludeId && project.id === excludeId) return;
            
            const matches = keywords.filter(keyword => 
                project.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase())) ||
                project.description.toLowerCase().includes(keyword.toLowerCase())
            );
            
            if (matches.length > 0) {
                related.push({
                    type: 'project',
                    item: project,
                    relevance: matches.length
                });
            }
        });
        
        // Check skills
        Object.entries(this.portfolioData.skills).forEach(([category, skillData]) => {
            skillData.skills.forEach(skill => {
                const matches = keywords.filter(keyword =>
                    skill.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    skill.description.toLowerCase().includes(keyword.toLowerCase())
                );
                
                if (matches.length > 0) {
                    related.push({
                        type: 'skill',
                        category: category,
                        item: skill,
                        relevance: matches.length
                    });
                }
            });
        });
        
        // Sort by relevance
        return related.sort((a, b) => b.relevance - a.relevance);
    }
    
    /**
     * Search portfolio content
     */
    searchPortfolioContent(query) {
        const results = [];
        const searchTerms = query.toLowerCase().split(' ');
        
        // Search projects
        this.portfolioData.projects.forEach(project => {
            let score = 0;
            searchTerms.forEach(term => {
                if (project.name.toLowerCase().includes(term)) score += 3;
                if (project.description.toLowerCase().includes(term)) score += 2;
                if (project.technologies.some(tech => tech.toLowerCase().includes(term))) score += 2;
                if (project.tags.some(tag => tag.toLowerCase().includes(term))) score += 1;
            });
            
            if (score > 0) {
                results.push({
                    type: 'project',
                    item: project,
                    score: score
                });
            }
        });
        
        // Search skills
        Object.entries(this.portfolioData.skills).forEach(([category, skillData]) => {
            skillData.skills.forEach(skill => {
                let score = 0;
                searchTerms.forEach(term => {
                    if (skill.name.toLowerCase().includes(term)) score += 3;
                    if (skill.description.toLowerCase().includes(term)) score += 2;
                });
                
                if (score > 0) {
                    results.push({
                        type: 'skill',
                        category: category,
                        item: skill,
                        score: score
                    });
                }
            });
        });
        
        // Search experience
        this.portfolioData.experience.forEach(exp => {
            let score = 0;
            searchTerms.forEach(term => {
                if (exp.title.toLowerCase().includes(term)) score += 3;
                if (exp.company.toLowerCase().includes(term)) score += 2;
                if (exp.description.toLowerCase().includes(term)) score += 1;
            });
            
            if (score > 0) {
                results.push({
                    type: 'experience',
                    item: exp,
                    score: score
                });
            }
        });
        
        // Sort by score and return top results
        return results.sort((a, b) => b.score - a.score).slice(0, 5);
    }
    
    /**
     * Generate content suggestions based on current context
     */
    generateContentSuggestions(currentTopic = null) {
        const suggestions = [];
        
        // Add popular queries
        suggestions.push(
            "Tell me about Jane's AI integration experience",
            "What projects has Jane worked on?",
            "Show me Jane's technical skills",
            "How can I get in touch with Jane?"
        );
        
        // Add context-specific suggestions
        if (currentTopic) {
            if (currentTopic.includes('project')) {
                suggestions.push("What other projects has Jane created?");
            }
            if (currentTopic.includes('skill')) {
                suggestions.push("What technical skills does Jane have?");
            }
            if (currentTopic.includes('ai')) {
                suggestions.push("Tell me more about Jane's AI expertise");
            }
        }
        
        return suggestions.slice(0, 4); // Limit to 4 suggestions
    }

    // =====================================
    // INTELLIGENT NAVIGATION SYSTEM
    // =====================================
    
    /**
     * Process navigation intent and perform action
     */
    async processNavigationIntent(message, intent) {
        const navigationAction = this.extractNavigationAction(message);
        
        switch (navigationAction.type) {
            case 'deep_link':
                return await this.performDeepLink(navigationAction.target, navigationAction.context);
            case 'preview':
                return await this.generateContentPreview(navigationAction.target);
            case 'search':
                return await this.performPortfolioSearch(navigationAction.query);
            case 'suggest':
                return await this.generateSmartSuggestions(navigationAction.context);
            default:
                return this.generateNavigationHelp();
        }
    }
    
    /**
     * Extract navigation action from user message
     */
    extractNavigationAction(message) {
        const lowerMessage = message.toLowerCase();
        
        // Deep linking patterns
        if (lowerMessage.includes('show me') || lowerMessage.includes('take me to') || lowerMessage.includes('go to')) {
            if (lowerMessage.includes('project')) {
                const projectMatch = this.portfolioData.projects.find(p => 
                    lowerMessage.includes(p.name.toLowerCase()) || 
                    p.tags.some(tag => lowerMessage.includes(tag.toLowerCase()))
                );
                return { type: 'deep_link', target: 'project', context: projectMatch?.id };
            }
            
            if (lowerMessage.includes('skill') || lowerMessage.includes('technical')) {
                return { type: 'deep_link', target: 'skills', context: 'technical' };
            }
            
            if (lowerMessage.includes('about') || lowerMessage.includes('bio')) {
                return { type: 'deep_link', target: 'about', context: null };
            }
            
            if (lowerMessage.includes('contact') || lowerMessage.includes('hire')) {
                return { type: 'deep_link', target: 'contact', context: null };
            }
        }
        
        // Preview patterns
        if (lowerMessage.includes('preview') || lowerMessage.includes('look at') || lowerMessage.includes('see')) {
            return { type: 'preview', target: this.identifyPreviewTarget(lowerMessage) };
        }
        
        // Search patterns
        if (lowerMessage.includes('find') || lowerMessage.includes('search')) {
            const query = message.replace(/find|search|for/gi, '').trim();
            return { type: 'search', query: query };
        }
        
        // Suggestion patterns
        if (lowerMessage.includes('suggest') || lowerMessage.includes('recommend') || lowerMessage.includes('what should')) {
            return { type: 'suggest', context: lowerMessage };
        }
        
        return { type: 'unknown' };
    }
    
    /**
     * Perform deep linking to portfolio sections
     */
    async performDeepLink(target, context = null) {
        const linkData = this.generateDeepLinkData(target, context);
        
        if (!linkData) {
            return "I couldn't find that section. Try asking about 'projects', 'skills', 'about', or 'contact'.";
        }
        
        // Generate preview content for the target
        const previewContent = await this.generateContentPreview(linkData);
        
        // Show portfolio preview if UI element exists
        this.showPortfolioPreview(linkData);
        
        // Track navigation event
        this.trackEvent('navigation_performed', {
            target: target,
            context: context,
            conversationId: this.currentConversationId
        });
        
        return `📍 Here's ${linkData.title}: ${previewContent}`;
    }
    
    /**
     * Generate deep link data for portfolio sections
     */
    generateDeepLinkData(target, context) {
        switch (target) {
            case 'project':
                if (context) {
                    const project = this.portfolioData.projects.find(p => p.id === context);
                    return project ? {
                        title: project.name,
                        url: project.url,
                        type: 'project',
                        data: project
                    } : null;
                }
                return {
                    title: 'Projects Overview',
                    url: '#projects',
                    type: 'projects',
                    data: this.portfolioData.projects
                };
                
            case 'skills':
                const skillCategory = context || 'all';
                return {
                    title: `Skills - ${skillCategory}`,
                    url: `#skills-${skillCategory}`,
                    type: 'skills',
                    data: this.portfolioData.skills[skillCategory] || this.portfolioData.skills
                };
                
            case 'about':
                return {
                    title: 'About Jane',
                    url: '#about',
                    type: 'about',
                    data: this.portfolioData.personal
                };
                
            case 'contact':
                return {
                    title: 'Contact Information',
                    url: '#contact',
                    type: 'contact',
                    data: this.portfolioData.personal.contact
                };
                
            default:
                return null;
        }
    }
    
    /**
     * Generate dynamic content preview
     */
    async generateContentPreview(linkData) {
        if (!linkData) return "Content not found.";
        
        switch (linkData.type) {
            case 'project':
                const project = linkData.data;
                return `${project.description} Built with ${project.technologies.slice(0, 3).join(', ')}. Status: ${project.status}.`;
                
            case 'projects':
                const projectCount = linkData.data.length;
                const categories = [...new Set(linkData.data.map(p => p.category))];
                return `${projectCount} featured projects across ${categories.join(', ')} development. Recent focus: ${linkData.data[0].name}.`;
                
            case 'skills':
                if (linkData.data.skills) {
                    // Single category
                    const topSkills = linkData.data.skills.slice(0, 4);
                    return `Expertise in ${topSkills.map(s => s.name).join(', ')}. ${linkData.data.title} focus.`;
                } else {
                    // All categories
                    const categories = Object.keys(linkData.data);
                    return `Skills across ${categories.length} areas: ${categories.map(cat => linkData.data[cat].title).join(', ')}.`;
                }
                
            case 'about':
                const personal = linkData.data;
                return `${personal.title} specializing in ${personal.expertise.slice(0, 3).join(', ')}. ${personal.tagline}`;
                
            case 'contact':
                return `${this.portfolioData.personal.availability} Contact through portfolio for collaboration opportunities.`;
                
            default:
                return "Preview not available.";
        }
    }
    
    /**
     * Perform smart portfolio search
     */
    async performPortfolioSearch(query) {
        if (!query || query.length < 2) {
            return "Please provide a search term. You can search for projects, skills, technologies, or any content.";
        }
        
        const results = this.searchPortfolioContent(query);
        
        if (results.length === 0) {
            return `No results found for "${query}". Try searching for terms like "AI", "design", "JavaScript", or specific project names.`;
        }
        
        // Format search results
        let response = `🔍 Found ${results.length} result(s) for "${query}":\n\n`;
        
        results.slice(0, 3).forEach((result, index) => {
            switch (result.type) {
                case 'project':
                    response += `${index + 1}. **${result.item.name}** (Project)\n   ${result.item.description}\n\n`;
                    break;
                case 'skill':
                    response += `${index + 1}. **${result.item.name}** (${result.category} Skill)\n   ${result.item.description}\n\n`;
                    break;
                case 'experience':
                    response += `${index + 1}. **${result.item.title}** at ${result.item.company}\n   ${result.item.description}\n\n`;
                    break;
            }
        });
        
        if (results.length > 3) {
            response += `...and ${results.length - 3} more results.`;
        }
        
        // Track search event
        this.trackEvent('portfolio_search', {
            query: query,
            resultCount: results.length,
            conversationId: this.currentConversationId
        });
        
        return response;
    }
    
    /**
     * Generate smart suggestions based on conversation context
     */
    async generateSmartSuggestions(context) {
        const suggestions = [];
        
        // Analyze context for relevant suggestions
        if (context.includes('project')) {
            suggestions.push(
                "Explore Jane's latest AI integration project",
                "See the technical implementation of Protogen 101",
                "Learn about Jane's design system work"
            );
        } else if (context.includes('skill')) {
            suggestions.push(
                "Discover Jane's AI and machine learning expertise",
                "Explore her frontend development capabilities",
                "Learn about her UX research methodologies"
            );
        } else if (context.includes('contact') || context.includes('collaborate')) {
            suggestions.push(
                "View Jane's availability for new projects",
                "Learn about her collaboration approach",
                "See testimonials from previous clients"
            );
        } else {
            // General suggestions
            suggestions.push(
                "Explore Jane's AI portfolio navigator project",
                "Learn about her design and development expertise",
                "Discover her approach to human-centered AI design",
                "Find out how to collaborate with Jane"
            );
        }
        
        const randomSuggestions = suggestions.slice(0, 3);
        return `💡 Here are some suggestions:\n\n${randomSuggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    }
    
    /**
     * Identify preview target from message
     */
    identifyPreviewTarget(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific project names
        const project = this.portfolioData.projects.find(p => 
            lowerMessage.includes(p.name.toLowerCase())
        );
        
        if (project) {
            return this.generateDeepLinkData('project', project.id);
        }
        
        // Check for general categories
        if (lowerMessage.includes('skill')) {
            return this.generateDeepLinkData('skills', null);
        }
        
        if (lowerMessage.includes('project')) {
            return this.generateDeepLinkData('project', null);
        }
        
        if (lowerMessage.includes('about') || lowerMessage.includes('profile')) {
            return this.generateDeepLinkData('about', null);
        }
        
        return null;
    }
    
    /**
     * Generate navigation help
     */
    generateNavigationHelp() {
        return `🧭 I can help you navigate Jane's portfolio! Try saying:\n\n` +
               `• "Show me projects" or "Take me to the AI project"\n` +
               `• "Preview Jane's skills" or "Look at her design work"\n` +
               `• "Search for JavaScript" or "Find AI projects"\n` +
               `• "Suggest something interesting" for recommendations\n\n` +
               `What would you like to explore?`;
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