// Axion Scripts Documentation - JavaScript
// Modern, interactive features for the documentation website

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're using component system
    const isComponentSystem = document.getElementById('navbar-container');
    
    if (isComponentSystem) {
        // Wait for components to load, then initialize
        setTimeout(() => {
            initNavigation();
            initFAQ();
            initSearch();
            initAnimations();
            initCodeBlocks();
            initScrollEffects();
            initMobileOptimizations();
            initSyntaxHighlighting();
        }, 100);
    } else {
        // Initialize immediately for non-component pages
        initNavigation();
        initFAQ();
        initSearch();
        initAnimations();
        initCodeBlocks();
        initScrollEffects();
        initMobileOptimizations();
        initSyntaxHighlighting();
    }
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Check if we're using component system
    const isComponentSystem = document.getElementById('navbar-container');
    
    // Only initialize if not using component system or if components are already loaded
    if (isComponentSystem && !navToggle) {
        // Components will be loaded later, skip initialization
        return;
    }

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Handle dropdown navigation
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            const menu = dropdown.querySelector('.dropdown-menu');
            
            // Close other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    const otherDropdown = otherToggle.parentElement;
                    const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                    otherMenu.style.display = 'none';
                }
            });
            
            // Toggle current dropdown
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            const dropdownMenus = document.querySelectorAll('.dropdown-menu');
            dropdownMenus.forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        }
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('faq-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3');
                const answer = item.querySelector('.faq-answer');
                
                if (question && answer) {
                    const questionText = question.textContent.toLowerCase();
                    const answerText = answer.textContent.toLowerCase();
                    
                    if (searchTerm === '' || questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                        item.style.display = 'block';
                        item.classList.add('animate-fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('animate-fade-in');
                    }
                }
            });
            
            // Show/hide section headers based on visible items
            const sections = document.querySelectorAll('.faq-section');
            sections.forEach(section => {
                const visibleItems = section.querySelectorAll('.faq-item[style*="block"], .faq-item:not([style*="none"])');
                if (visibleItems.length === 0 && searchTerm !== '') {
                    section.style.display = 'none';
                } else {
                    section.style.display = 'block';
                }
            });
        });
        
        // Clear search on escape key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input'));
                this.blur();
            }
        });
    }
}

// Animation initialization
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .script-overview-card, .step-card, .command-card, .api-example, .integration-example, .tip-card, .practice-card, .troubleshoot-card, .support-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Staggered animation for grid items
    const grids = document.querySelectorAll('.features-grid, .scripts-grid, .quick-start-steps, .prerequisites-grid, .config-grid');
    
    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Code block functionality
function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        // Add copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        
        // Position the copy button
        block.style.position = 'relative';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '10px';
        copyButton.style.right = '10px';
        copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        copyButton.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        copyButton.style.borderRadius = '4px';
        copyButton.style.padding = '8px';
        copyButton.style.color = 'white';
        copyButton.style.cursor = 'pointer';
        copyButton.style.transition = 'all 0.2s ease';
        
        copyButton.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        copyButton.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        // Copy functionality
        copyButton.addEventListener('click', function() {
            const code = block.querySelector('pre, code');
            if (code) {
                const text = code.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    // Show success feedback
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    this.style.background = 'rgba(16, 185, 129, 0.2)';
                    this.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                    
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                        this.style.background = 'rgba(255, 255, 255, 0.1)';
                        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                });
            }
        });
        
        block.appendChild(copyButton);
    });
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for navbar styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Progress bar for page reading
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #6366f1, #8b5cf6)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


// Keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('faq-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            if (navToggle && navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        }
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    
    initKeyboardShortcuts();
    
    // Add loading animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100%';
    loader.style.height = '100%';
    loader.style.background = 'white';
    loader.style.display = 'flex';
    loader.style.alignItems = 'center';
    loader.style.justifyContent = 'center';
    loader.style.zIndex = '9999';
    loader.style.transition = 'opacity 0.5s ease';
    
    const spinner = loader.querySelector('.loader-spinner');
    spinner.style.width = '40px';
    spinner.style.height = '40px';
    spinner.style.border = '4px solid #f3f4f6';
    spinner.style.borderTop = '4px solid #6366f1';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    // Remove loader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500);
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Mobile optimizations
function initMobileOptimizations() {
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouchDevice) {
        document.body.classList.add('mobile-device');
    }

    // Prevent zoom on input focus (iOS Safari)
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (isMobile) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            }
        });

        input.addEventListener('blur', function() {
            if (isMobile) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                }
            }
        });
    });

    // Improve touch scrolling
    if (isTouchDevice) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }

    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate heights after orientation change
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.style.height = 'calc(100vh - 70px)';
            }
        }, 100);
    });

    // Close mobile menu when scrolling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }, 150);
        }
    });

    // Improve dropdown behavior on mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('touchstart', function(e) {
            if (isMobile) {
                e.preventDefault();
                const dropdown = this.parentElement;
                const menu = dropdown.querySelector('.dropdown-menu');
                
                if (menu.style.display === 'block') {
                    menu.style.display = 'none';
                } else {
                    // Close other dropdowns
                    dropdownToggles.forEach(otherToggle => {
                        if (otherToggle !== this) {
                            const otherDropdown = otherToggle.parentElement;
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            otherMenu.style.display = 'none';
                        }
                    });
                    menu.style.display = 'block';
                }
            }
        });
    });

    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.btn, .copy-btn, .faq-question');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// Lua Syntax Highlighting
function initSyntaxHighlighting() {
    const codeBlocks = document.querySelectorAll('.code-block pre code');
    
    codeBlocks.forEach(block => {
        // Check if this looks like Lua code
        const text = block.textContent;
        if (text.includes('Config') || text.includes('function') || text.includes('local') || text.includes('--')) {
            highlightLuaCode(block);
        }
    });
}

function highlightLuaCode(element) {
    const text = element.textContent;
    const parent = element.parentElement;
    const grandParent = parent.parentElement;
    
    // Add lua class to the code block
    grandParent.classList.add('lua');
    
    // Lua keywords
    const keywords = [
        'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'if',
        'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while'
    ];
    
    // Lua functions and built-ins
    const functions = [
        'print', 'type', 'tostring', 'tonumber', 'pairs', 'ipairs', 'next', 'getmetatable',
        'setmetatable', 'rawget', 'rawset', 'rawequal', 'pcall', 'xpcall', 'error', 'assert'
    ];
    
    let highlightedText = text;
    
    // Process in order of specificity to avoid nesting issues
    
    // 1. First, protect already highlighted content by replacing spans with placeholders
    const spanPlaceholders = [];
    let spanIndex = 0;
    
    // 2. Highlight comments first (they're line-based and won't conflict)
    highlightedText = highlightedText.replace(/--.*$/gm, (match) => {
        const placeholder = `__COMMENT_${spanIndex++}__`;
        spanPlaceholders.push({ placeholder, replacement: `<span class="lua-comment">${match}</span>` });
        return placeholder;
    });
    
    // 3. Highlight strings (protect them from other processing)
    highlightedText = highlightedText.replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, (match) => {
        const placeholder = `__STRING_${spanIndex++}__`;
        spanPlaceholders.push({ placeholder, replacement: `<span class="lua-string">${match}</span>` });
        return placeholder;
    });
    
    // 4. Highlight numbers
    highlightedText = highlightedText.replace(/\b\d+\.?\d*\b/g, (match) => {
        const placeholder = `__NUMBER_${spanIndex++}__`;
        spanPlaceholders.push({ placeholder, replacement: `<span class="lua-number">${match}</span>` });
        return placeholder;
    });
    
    // 5. Highlight boolean values
    highlightedText = highlightedText.replace(/\b(true|false)\b/g, (match) => {
        const placeholder = `__BOOLEAN_${spanIndex++}__`;
        spanPlaceholders.push({ placeholder, replacement: `<span class="lua-boolean">${match}</span>` });
        return placeholder;
    });
    
    // 6. Highlight Config patterns
    highlightedText = highlightedText.replace(/\bConfig\b/g, (match) => {
        const placeholder = `__CONFIG_${spanIndex++}__`;
        spanPlaceholders.push({ placeholder, replacement: `<span class="lua-table">${match}</span>` });
        return placeholder;
    });
    
    // 7. Highlight keywords
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        highlightedText = highlightedText.replace(regex, (match) => {
            const placeholder = `__KEYWORD_${spanIndex++}__`;
            spanPlaceholders.push({ placeholder, replacement: `<span class="lua-keyword">${match}</span>` });
            return placeholder;
        });
    });
    
    // 8. Highlight functions
    functions.forEach(func => {
        const regex = new RegExp(`\\b${func}\\b`, 'g');
        highlightedText = highlightedText.replace(regex, (match) => {
            const placeholder = `__FUNCTION_${spanIndex++}__`;
            spanPlaceholders.push({ placeholder, replacement: `<span class="lua-function">${match}</span>` });
            return placeholder;
        });
    });
    
    // 9. Highlight operators (but avoid conflicts with already highlighted content)
    highlightedText = highlightedText.replace(/([=+\-*/%<>~!&|]+)/g, (match) => {
        // Only highlight if not already part of a placeholder
        if (!match.includes('__') && !match.includes('_')) {
            const placeholder = `__OPERATOR_${spanIndex++}__`;
            spanPlaceholders.push({ placeholder, replacement: `<span class="lua-operator">${match}</span>` });
            return placeholder;
        }
        return match;
    });
    
    // 10. Highlight punctuation
    highlightedText = highlightedText.replace(/([{}[\]();,])/g, (match) => {
        const placeholder = `__PUNCTUATION_${spanIndex++}__`;
        spanPlaceholders.push({ placeholder, replacement: `<span class="lua-punctuation">${match}</span>` });
        return placeholder;
    });
    
    // 11. Highlight table access patterns (but avoid conflicts)
    highlightedText = highlightedText.replace(/(\w+)\.(\w+)/g, (match, var1, var2) => {
        // Only if not already highlighted
        if (!match.includes('__')) {
            const placeholder = `__TABLE_ACCESS_${spanIndex++}__`;
            spanPlaceholders.push({ 
                placeholder, 
                replacement: `<span class="lua-variable">${var1}</span><span class="lua-punctuation">.</span><span class="lua-variable">${var2}</span>` 
            });
            return placeholder;
        }
        return match;
    });
    
    // 12. Restore all placeholders with their HTML
    spanPlaceholders.forEach(({ placeholder, replacement }) => {
        highlightedText = highlightedText.replace(new RegExp(placeholder, 'g'), replacement);
    });
    
    element.innerHTML = highlightedText;
}

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
