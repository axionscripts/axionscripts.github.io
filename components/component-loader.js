/**
 * Component Loader for Axion Scripts Documentation
 * Loads reusable components (navbar, footer) into pages
 */

// Embedded components (fallback for local file access)
const EMBEDDED_COMPONENTS = {
    navbar: `<!-- Navigation -->
<nav class="navbar">
    <div class="nav-container">
        <div class="nav-logo">
            <i class="fas fa-code"></i>
            <span>Axion Scripts</span>
        </div>
        <div class="nav-menu" id="nav-menu">
            <a href="../index.html" class="nav-link">Home</a>
            <div class="nav-dropdown">
                <a href="#" class="nav-link dropdown-toggle">Axion Black Market <i class="fas fa-chevron-down"></i></a>
                <div class="dropdown-menu">
                    <a href="../blackmarket/installation.html" class="dropdown-link">Installation</a>
                    <a href="../blackmarket/usage.html" class="dropdown-link">Usage</a>
                    <a href="../blackmarket/config.html" class="dropdown-link">Config</a>
                    <a href="../blackmarket/client.html" class="dropdown-link">Client</a>
                    <a href="../blackmarket/server.html" class="dropdown-link">Server</a>
                    <a href="../blackmarket/faq.html" class="dropdown-link">FAQ</a>
                </div>
            </div>
            <div class="nav-dropdown">
                <a href="#" class="nav-link dropdown-toggle">Axion Notify <i class="fas fa-chevron-down"></i></a>
                <div class="dropdown-menu">
                    <a href="../notify/installation.html" class="dropdown-link">Installation</a>
                    <a href="../notify/usage.html" class="dropdown-link">Usage</a>
                    <a href="../notify/config.html" class="dropdown-link">Config</a>
                    <a href="../notify/client.html" class="dropdown-link">Client</a>
                    <a href="../notify/server.html" class="dropdown-link">Server</a>
                    <a href="../notify/faq.html" class="dropdown-link">FAQ</a>
                </div>
            </div>
        </div>
        <div class="nav-toggle" id="nav-toggle">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </div>
</nav>`,

    footer: `<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Axion Scripts</h3>
                <p>Professional FiveM resources for modern servers</p>
                <div class="social-links">
                    <a href="#" class="social-link">
                        <i class="fab fa-discord"></i>
                    </a>
                    <a href="#" class="social-link">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="#" class="social-link">
                        <i class="fab fa-twitter"></i>
                    </a>
                </div>
            </div>
            <div class="footer-section">
                <h4>Scripts</h4>
                <ul>
                    <li><a href="../index.html#scripts">Axion Black Market</a></li>
                    <li><a href="../index.html#scripts">Axion Notify</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Documentation</h4>
                <ul>
                    <li><a href="../blackmarket/installation.html">Installation</a></li>
                    <li><a href="../blackmarket/usage.html">Usage</a></li>
                    <li><a href="../blackmarket/config.html">Config</a></li>
                    <li><a href="../blackmarket/client.html">Client</a></li>
                    <li><a href="../blackmarket/server.html">Server</a></li>
                    <li><a href="../blackmarket/faq.html">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Support</h4>
                <ul>
                    <li><a href="../blackmarket/faq.html">Troubleshooting</a></li>
                    <li><a href="#">Discord</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Axion Development. All rights reserved.</p>
        </div>
    </div>
</footer>`
};

class ComponentLoader {
    constructor() {
        this.components = new Map();
    }

    /**
     * Load a component from a file or use embedded fallback
     * @param {string} componentName - Name of the component
     * @param {string} filePath - Path to the component file
     * @param {string} targetSelector - CSS selector for where to insert the component
     */
    async loadComponent(componentName, filePath, targetSelector) {
        // Always use embedded components for now to ensure they work
        const embeddedHtml = EMBEDDED_COMPONENTS[componentName];
        if (embeddedHtml) {
            this.insertComponent(componentName, embeddedHtml, targetSelector);
        } else {
            // Fallback to file loading
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`Failed to load ${componentName}: ${response.status}`);
                }
                
                const html = await response.text();
                this.insertComponent(componentName, html, targetSelector);
            } catch (error) {
                console.error(`Failed to load ${componentName} from file:`, error.message);
            }
        }
    }

    /**
     * Insert component HTML into target element
     */
    insertComponent(componentName, html, targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        
        if (targetElement) {
            targetElement.innerHTML = html;
            this.components.set(componentName, html);
            
            // Special handling for navbar component
            if (componentName === 'navbar') {
                this.setupMobileNavbar();
            }
            
            // Re-initialize any JavaScript functionality after loading
            this.initializeComponents();
        } else {
            console.error(`Target element not found: ${targetSelector}`);
        }
    }

    /**
     * Setup mobile navbar with direct event handling
     */
    setupMobileNavbar() {
        setTimeout(() => {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            
            if (navToggle && navMenu) {
                // Remove any existing event listeners
                navToggle.onclick = null;
                
                // Add new event listener
                navToggle.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle classes
                    navMenu.classList.toggle('active');
                    navToggle.classList.toggle('active');
                    document.body.classList.toggle('nav-open');
                    
                    return false;
                };
                
                // Add touch event for better mobile support
                navToggle.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    navMenu.classList.toggle('active');
                    navToggle.classList.toggle('active');
                    document.body.classList.toggle('nav-open');
                });
            }
        }, 100);
    }

    /**
     * Initialize components after they're loaded
     */
    initializeComponents() {
        // Re-initialize navigation functionality
        this.initializeNavigation();
    }

    /**
     * Initialize navigation dropdowns and mobile menu
     */
    initializeNavigation() {
        // Wait a bit for DOM to be fully ready
        setTimeout(() => {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            const navLinks = document.querySelectorAll('.nav-link');
            
            if (navToggle && navMenu) {
                // Use onclick for more reliable mobile support
                navToggle.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    navMenu.classList.toggle('active');
                    navToggle.classList.toggle('active');
                    document.body.classList.toggle('nav-open');
                    
                    return false;
                };

                // Close menu when clicking on a link
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        document.body.classList.remove('nav-open');
                    });
                });

                // Close menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        document.body.classList.remove('nav-open');
                    }
                });
            }
        }, 50);
    }

    /**
     * Set active navigation item based on current page
     */
    setActiveNavigation() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Set active class based on current page
        if (currentPage === 'index.html' || currentPage === '') {
            const homeLink = document.querySelector('.nav-link[href="../index.html"], .nav-link[href="index.html"]');
            if (homeLink) homeLink.classList.add('active');
        } else {
            // Find and activate the appropriate navigation item
            const activeLink = document.querySelector(`a[href*="${currentPage}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                
                // Also activate parent dropdown if it's a dropdown link
                const dropdown = activeLink.closest('.dropdown-menu');
                if (dropdown) {
                    const dropdownToggle = dropdown.previousElementSibling;
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
            }
        }
    }

    /**
     * Load all components for the current page
     */
    async loadAllComponents() {
        // Determine the correct path prefix based on current location
        const isRootPage = window.location.pathname.endsWith('index.html') || 
                          window.location.pathname === '/' || 
                          window.location.pathname.endsWith('/');
        
        const pathPrefix = isRootPage ? '' : '../';
        
        // Adjust embedded components for root page
        if (isRootPage) {
            this.adjustEmbeddedComponentsForRoot();
        }
        
        // Load navbar
        try {
            await this.loadComponent('navbar', `${pathPrefix}components/navbar.html`, '#navbar-container');
        } catch (error) {
            console.error('Failed to load navbar, showing fallback:', error);
            this.showFallbackNavbar();
        }
        
        // Load footer
        try {
            await this.loadComponent('footer', `${pathPrefix}components/footer.html`, '#footer-container');
        } catch (error) {
            console.error('Failed to load footer:', error);
        }
        
        // Set active navigation after components are loaded
        setTimeout(() => {
            this.setActiveNavigation();
            // Ensure mobile navigation is properly initialized
            this.ensureMobileNavigation();
        }, 100);
    }

    /**
     * Show fallback navbar if component loading fails
     */
    showFallbackNavbar() {
        const fallbackNavbar = document.getElementById('fallback-navbar');
        if (fallbackNavbar) {
            fallbackNavbar.style.display = 'block';
        }
    }

    /**
     * Ensure mobile navigation is properly set up
     */
    ensureMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            // Double-check that event listeners are properly attached
            const hasClickListener = navToggle.onclick !== null;
            
            if (!hasClickListener) {
                this.initializeNavigation();
            }
        }
    }

    /**
     * Adjust embedded components for root page (remove ../ prefix)
     */
    adjustEmbeddedComponentsForRoot() {
        // Adjust navbar for root page
        EMBEDDED_COMPONENTS.navbar = EMBEDDED_COMPONENTS.navbar.replace(/href="\.\.\//g, 'href="');
        
        // Adjust footer for root page
        EMBEDDED_COMPONENTS.footer = EMBEDDED_COMPONENTS.footer.replace(/href="\.\.\//g, 'href="');
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    
    // Set a timeout to show fallback navbar if loading takes too long
    const fallbackTimeout = setTimeout(() => {
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer && navbarContainer.innerHTML.trim() === '') {
            loader.showFallbackNavbar();
        }
    }, 1000);
    
    loader.loadAllComponents().then(() => {
        clearTimeout(fallbackTimeout);
    }).catch((error) => {
        console.error('Error loading components:', error);
        loader.showFallbackNavbar();
    });
});
