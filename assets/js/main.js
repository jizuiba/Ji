/**
 * JI Theme - Main JavaScript
 * Handles core functionality and interactions
 */

(function() {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function() {
    initThemeOnLoad();
    initMobileMenu();
    initSmoothScrolling();
    initThemeToggle();
    initThemeSelector();
    initLazyLoading();
    initAnimations();
    initAccessibility();
  });

  /**
   * Initialize theme on page load
   */
  function initThemeOnLoad() {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    setTheme(savedTheme);
  }

  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavigation = document.querySelector('.mobile-navigation');
    
    if (!mobileMenuToggle || !mobileNavigation) return;

    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      this.setAttribute('aria-expanded', !isExpanded);
      this.classList.toggle('active');
      mobileNavigation.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuToggle.contains(e.target) && !mobileNavigation.contains(e.target)) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.classList.remove('active');
        mobileNavigation.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNavigation.classList.contains('active')) {
        mobileMenuToggle.click();
      }
    });

    // Close menu when clicking on menu links
    const mobileMenuLinks = mobileNavigation.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.classList.remove('active');
        mobileNavigation.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  /**
   * Smooth Scrolling for Anchor Links
   */
  function initSmoothScrolling() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, link.getAttribute('href'));
        
        // Focus target for accessibility
        target.focus();
      }
    });
  }

  /**
   * Theme Toggle Functionality
   */
  function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Update theme icon based on current theme
    updateThemeIcon();

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
          updateThemeIcon();
        }
      });
    }
  }

  function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('theme-dark');
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
      const lightIcon = themeToggle.querySelector('.theme-icon-light');
      const darkIcon = themeToggle.querySelector('.theme-icon-dark');
      
      if (lightIcon && darkIcon) {
        // Force update with !important to override any conflicting styles
        if (isDark) {
          lightIcon.style.setProperty('opacity', '0', 'important');
          darkIcon.style.setProperty('opacity', '1', 'important');
        } else {
          lightIcon.style.setProperty('opacity', '1', 'important');
          darkIcon.style.setProperty('opacity', '0', 'important');
        }
      }
    }
  }
  
  // Make updateThemeIcon available globally for inline scripts
  window.updateThemeIcon = updateThemeIcon;

  /**
   * Theme Selector Functionality (Footer)
   */
  function initThemeSelector() {
    const themeOptions = document.querySelectorAll('.theme-option');
    if (!themeOptions.length) return;

    // Initialize theme selector state
    updateThemeSelector();

    // Add click handlers
    themeOptions.forEach(option => {
      option.addEventListener('click', function() {
        const theme = this.dataset.theme;
        setTheme(theme);
        updateThemeSelector();
      });
    });

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', function(e) {
        const currentTheme = localStorage.getItem('theme');
        if (!currentTheme || currentTheme === 'auto') {
          // Re-apply auto theme to trigger CSS media query changes
          setTheme('auto');
          updateThemeSelector();
        }
      });
    }
  }

  function updateThemeSelector() {
    const themeOptions = document.querySelectorAll('.theme-option');
    const currentTheme = localStorage.getItem('theme') || 'auto';
    
    themeOptions.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.theme === currentTheme) {
        option.classList.add('active');
      }
    });
  }

  function setTheme(theme) {
    localStorage.setItem('theme', theme);
    
    // Add transitioning class for smooth animations
    document.documentElement.classList.add('theme-transitioning');
    
    // Apply theme immediately for better performance
    if (theme === 'auto') {
      // Remove all theme classes to let CSS media queries handle auto detection
      document.documentElement.classList.remove('theme-dark', 'theme-light');
    } else if (theme === 'dark') {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
    }
    
    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 200); // Match --theme-transition duration
  }


  /**
   * Lazy Loading for Images
   */
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Scroll Animations
   */
  function initAnimations() {
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Animate elements on scroll
      document.querySelectorAll('.post-card, .featured-post-card, .recent-post-card').forEach(el => {
        animationObserver.observe(el);
      });
    }
  }

  /**
   * Accessibility Enhancements
   */
  function initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    }

    // Keyboard navigation for custom elements
    document.addEventListener('keydown', function(e) {
      // Handle Enter key on buttons
      if (e.key === 'Enter' && e.target.matches('button, [role="button"]')) {
        e.target.click();
      }
    });

    // Focus management for modals and dropdowns
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        // Close any open modals or dropdowns
        const activeElements = document.querySelectorAll('[aria-expanded="true"]');
        activeElements.forEach(el => {
          if (el.classList.contains('menu-toggle')) {
            el.click();
          }
        });
      }
    });
  }

  /**
   * Utility Functions
   */
  
  // Debounce function
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

  // Throttle function
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


  // Global theme toggle function for inline scripts
  window.toggleTheme = function() {
    const isDark = document.documentElement.classList.contains('theme-dark');
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    updateThemeIcon();
    updateThemeSelector();
  };

  // Make functions available globally
  window.JI = {
    debounce,
    throttle,
    updateThemeIcon,
    setTheme,
    updateThemeSelector,
    toggleTheme
  };

})();
