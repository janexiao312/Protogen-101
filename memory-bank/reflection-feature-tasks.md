# Weekly Reflection Feature - Task Breakdown

**Project Goal:** Add an LLM-powered weekly reflection feature to Jane's profile website that prompts users with questions and generates personalized next steps using OpenAI API.

**Date Created:** November 12, 2025

---

## Task List Overview

### 🏗️ **Phase 1: Foundation (Tasks 1-3)**
Setting up the basic structure and files needed for the reflection feature.

### 🔄 **Phase 2: Core Functionality (Tasks 4-6)**
Implementing the question flow and AI integration.

### 🎨 **Phase 3: User Experience (Tasks 7-8)**
Creating the recommendation display and data export features.

### 🔗 **Phase 4: Integration & Polish (Tasks 9-10)**
Connecting everything together and final testing.

---

## Detailed Task Breakdown

### Task 1: Create reflection page HTML structure
**Files to create:** `reflection.html`
**Dependencies:** None
**Deliverables:**
- HTML5 document with proper structure
- Container for dynamic question content
- Links to CSS and JavaScript files
- Accessibility considerations (ARIA labels, semantic HTML)
- Mobile-responsive viewport meta tag

### Task 2: Create reflection page CSS styles  
**Files to create:** `reflection-styles.css`
**Dependencies:** Task 1 complete
**Deliverables:**
- Consistent styling with existing profile theme
- Question container and input field styles
- Navigation button styles (primary/secondary)
- Loading spinner animation
- Recommendation display cards
- Mobile responsive design

### Task 3: Build ReflectionApp class foundation
**Files to create:** `reflection-script.js`
**Dependencies:** Tasks 1-2 complete
**Deliverables:**
- ReflectionApp class with constructor
- Array of 5 reflection questions
- Basic initialization method
- Answer storage system
- Current question tracking

### Task 4: Implement question navigation system
**Files to modify:** `reflection-script.js`
**Dependencies:** Task 3 complete
**Deliverables:**
- Previous/Next navigation methods
- Answer persistence between questions
- Progress indicator
- Form validation
- Dynamic question rendering

### Task 5: Set up OpenAI API integration
**Files to modify:** `reflection-script.js`
**Dependencies:** Task 4 complete
**Deliverables:**
- API key management system
- HTTP request setup for OpenAI API
- Error handling for API failures
- Rate limiting considerations
- Security best practices

### Task 6: Build recommendation generation system
**Files to modify:** `reflection-script.js`
**Dependencies:** Task 5 complete
**Deliverables:**
- Prompt engineering for reflection analysis
- Response parsing (JSON and fallback)
- Loading state management
- Error recovery mechanisms

### Task 7: Design recommendation display UI
**Files to modify:** `reflection-script.js`, `reflection-styles.css`
**Dependencies:** Task 6 complete
**Deliverables:**
- Recommendation card layout
- Smooth transitions and animations
- Action button styling
- Success/error state displays

### Task 8: Add export and save functionality
**Files to modify:** `reflection-script.js`
**Dependencies:** Task 7 complete
**Deliverables:**
- JSON export functionality
- File download trigger
- Data formatting for export
- Restart/new reflection option

### Task 9: Integrate reflection link in profile page
**Files to modify:** `profile-script.js`
**Dependencies:** Tasks 1-8 complete
**Deliverables:**
- New button in contact section
- Icon and styling consistency
- Proper navigation link
- Accessible button implementation

### Task 10: Test and refine user experience
**Files to modify:** All created files as needed
**Dependencies:** All previous tasks complete
**Deliverables:**
- Cross-browser compatibility testing
- Mobile responsiveness verification
- User flow optimization
- Performance improvements
- Final bug fixes

---

## Technical Specifications

### Required Files:
- `reflection.html` - Main reflection page
- `reflection-styles.css` - Styling for reflection feature
- `reflection-script.js` - Core functionality and API integration
- `profile-script.js` - Modified to include navigation link

### API Requirements:
- OpenAI API key (user-provided)
- GPT-3.5-turbo model access
- Proper error handling for API limits

### Browser Support:
- Modern browsers with ES6+ support
- Mobile responsive design
- Accessibility compliance (WCAG 2.1)

---

## Success Criteria

✅ **Functional Requirements Met:**
- Users can navigate through 5 reflection questions
- Answers are properly stored and validated
- OpenAI API generates relevant recommendations
- Users can export their reflection data

✅ **Design Requirements Met:**
- Consistent visual design with existing profile
- Smooth animations and transitions
- Mobile-responsive layout
- Professional, polished appearance

✅ **Technical Requirements Met:**
- Secure API key handling
- Robust error handling
- Performance optimized
- Accessible to all users

---

## Notes & Considerations

### Security:
- API keys should be handled securely (consider backend proxy in production)
- Input validation for all user responses
- Rate limiting awareness for API calls

### Future Enhancements:
- Save reflections to local storage or database
- Email/calendar integration for weekly reminders
- Analytics on reflection patterns
- Multiple reflection templates
- Collaboration features

### Dependencies:
- OpenAI API access and billing setup
- Modern browser environment
- Internet connection for API calls

---

**Next Step:** Begin with Task 1 - Create reflection page HTML structure