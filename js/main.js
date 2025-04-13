/**
 * Solas Nutrition - GLP-1 Specialized Nutrition Therapy
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initFaqAccordion();
    initSmoothScroll();
    initFormSubmission();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle menu button appearance
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            nav ul.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: var(--white);
                box-shadow: var(--shadow-md);
                padding: 1rem 0;
                z-index: 1000;
            }
            
            nav ul.active li {
                width: 100%;
                text-align: center;
                padding: 0.5rem 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.toggle-icon');
        
        if (!question || !answer || !toggleIcon) return;
        
        // Set initial state for first item
        if (item === faqItems[0]) {
            item.classList.add('active');
            answer.style.display = 'block';
            toggleIcon.textContent = '−';
        }
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.display = 'none';
                faqItem.querySelector('.toggle-icon').textContent = '+';
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.display = 'block';
                toggleIcon.textContent = '−';
            }
        });
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Form Submission Handling
 */
function initFormSubmission() {
    const leadForm = document.querySelector('.lead-form');
    
    if (!leadForm) return;
    
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        
        if (!nameInput || !emailInput) return;
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        
        if (!name || !email) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('Processing...', 'info');
        
        // In a real implementation, you would send this data to your server
        // For demo purposes, we'll simulate a successful submission after a delay
        setTimeout(() => {
            // Reset form
            leadForm.reset();
            
            // Show success message
            showFormMessage('Thank you! Your guide has been sent to your email.', 'success');
            
            // In a real implementation, you might redirect to a thank you page
            // or show a modal with the download
        }, 1500);
    });
    
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Add styles
        messageElement.style.padding = '10px';
        messageElement.style.marginTop = '10px';
        messageElement.style.borderRadius = '4px';
        messageElement.style.textAlign = 'center';
        
        if (type === 'error') {
            messageElement.style.backgroundColor = '#f8d7da';
            messageElement.style.color = '#721c24';
        } else if (type === 'success') {
            messageElement.style.backgroundColor = '#d4edda';
            messageElement.style.color = '#155724';
        } else {
            messageElement.style.backgroundColor = '#d1ecf1';
            messageElement.style.color = '#0c5460';
        }
        
        // Insert after form
        leadForm.parentNode.insertBefore(messageElement, leadForm.nextSibling);
        
        // Auto remove success/info messages after 5 seconds
        if (type !== 'error') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
}

/**
 * Header Scroll Effect
 * Changes header appearance when scrolling down
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '16px 0';
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});