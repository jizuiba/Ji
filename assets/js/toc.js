/**
 * Table of Contents (TOC) functionality
 * Stable implementation with smooth scrolling and active section highlighting
 * Based on best practices from popular open source projects
 */

class TableOfContents {
  constructor() {
    this.tocContainer = document.querySelector('.toc-container');
    this.tocNav = document.querySelector('.toc-nav');
    this.tocLinks = Array.from(document.querySelectorAll('.toc-nav a'));
    this.headings = [];
    this.activeLink = null;
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.observer = null;
    
    this.init();
  }

  init() {
    if (!this.tocContainer || !this.tocLinks || !this.tocLinks.length) {
      return;
    }

    this.setupHeadings();
    this.setupSmoothScrolling();
    this.setupScrollSpy();
    this.setupKeyboardNavigation();
    
    // Initialize active section on page load
    this.updateActiveSection();
  }

  setupHeadings() {
    // Get all headings that have corresponding TOC links
    this.tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.substring(1);
        const heading = document.getElementById(id);
        if (heading) {
          this.headings.push({
            element: heading,
            link: link,
            id: id,
            offsetTop: 0
          });
        }
      }
    });

    // Sort headings by their position in the document
    this.headings.sort((a, b) => {
      return a.element.offsetTop - b.element.offsetTop;
    });
  }

  setupSmoothScrolling() {
    this.tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Temporarily disable scroll spy to prevent conflicts
            this.isScrolling = true;
            
            // Smooth scroll to target
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });

            // Update URL without triggering scroll
            history.pushState(null, null, href);
            
            // Update active link immediately
            this.setActiveLink(link);
            
            // Re-enable scroll spy after scroll animation
            setTimeout(() => {
              this.isScrolling = false;
            }, 1000);
          }
        }
      });
    });
  }

  setupScrollSpy() {
    // Use a more reliable scroll spy implementation
    const handleScroll = () => {
      if (this.isScrolling) return;
      
      // Clear existing timeout
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      
      // Debounce scroll events
      this.scrollTimeout = setTimeout(() => {
        this.updateActiveSection();
      }, 10);
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen for resize events
    window.addEventListener('resize', handleScroll, { passive: true });
  }

  updateActiveSection() {
    if (this.isScrolling || !this.headings.length) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // If we're at the bottom of the page, activate the last heading
    if (scrollTop + windowHeight >= documentHeight - 100) {
      const lastHeading = this.headings[this.headings.length - 1];
      if (lastHeading) {
        this.setActiveLink(lastHeading.link);
      }
      return;
    }

    // Find the current active heading based on scroll position
    let activeHeading = null;
    
    // Check each heading from bottom to top
    for (let i = this.headings.length - 1; i >= 0; i--) {
      const heading = this.headings[i];
      const rect = heading.element.getBoundingClientRect();
      
      // If heading is in the viewport or just above it
      if (rect.top <= windowHeight * 0.3) {
        activeHeading = heading;
        break;
      }
    }
    
    // If no heading is found in viewport, use the first one
    if (!activeHeading && this.headings.length > 0) {
      activeHeading = this.headings[0];
    }
    
    if (activeHeading) {
      this.setActiveLink(activeHeading.link);
    }
  }

  setActiveLink(activeLink) {
    // Don't update if it's the same link
    if (activeLink === this.activeLink) {
      return;
    }
    
    // Remove active class from all links
    this.tocLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current link
    if (activeLink) {
      activeLink.classList.add('active');
      this.activeLink = activeLink;
    }
  }

  setupKeyboardNavigation() {
    // Add keyboard navigation support
    this.tocLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        let targetIndex = index;
        
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            targetIndex = Math.min(index + 1, this.tocLinks.length - 1);
            break;
          case 'ArrowUp':
            e.preventDefault();
            targetIndex = Math.max(index - 1, 0);
            break;
          case 'Home':
            e.preventDefault();
            targetIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            targetIndex = this.tocLinks.length - 1;
            break;
          default:
            return;
        }
        
        if (targetIndex !== index) {
          this.tocLinks[targetIndex].focus();
        }
      });
    });
  }

  // Public method to programmatically scroll to a section
  scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Cleanup method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }
}

// Initialize TOC when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TableOfContents();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TableOfContents;
}