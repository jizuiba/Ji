/**
 * Table of Contents (TOC) functionality
 * Stable implementation with smooth scrolling and active section highlighting
 * Based on best practices from popular open source projects
 */

class TableOfContents {
  constructor() {
    this.tocContainer = document.querySelector('.toc-container');
    this.tocNav = document.querySelector('.toc-nav');
    // 更通用的TOC链接选择器，支持Hugo生成的TOC结构
    this.tocLinks = Array.from(document.querySelectorAll('.toc a, #TableOfContents a, .toc-nav a'));
    this.slider = document.querySelector('.toc .slider');
    this.overflow = document.querySelector('.toc .overflow');
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
    this.setupSlider();
    
    // Initialize active section on page load
    setTimeout(() => {
      this.updateActiveSection();
    }, 100);
    
    // Handle responsive behavior
    this.setupResponsive();
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
    if (scrollTop + windowHeight >= documentHeight - 50) {
      const lastHeading = this.headings[this.headings.length - 1];
      if (lastHeading) {
        this.setActiveLink(lastHeading.link);
      }
      return;
    }

    // Find the current active heading based on scroll position
    let activeHeading = null;
    const offset = 100; // 距离顶部100px开始高亮
    
    // Check each heading from top to bottom to find the one closest to the top
    for (let i = 0; i < this.headings.length; i++) {
      const heading = this.headings[i];
      const rect = heading.element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      
      // If heading is above the offset point, it's a candidate
      if (elementTop <= scrollTop + offset) {
        activeHeading = heading;
      } else {
        // Once we find a heading below the offset, break
        break;
      }
    }
    
    // If no heading is found above the offset, use the first one
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
      
      // Auto-scroll TOC to show active item
      this.scrollToActiveItem(activeLink);
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

  setupSlider() {
    return;
  }
  
  updateSlider() {
    return;
  }
  
  setupResponsive() {
    return;
  }
  
  scrollToActiveItem(activeLink) {
    if (!this.overflow) return;
    
    const linkRect = activeLink.getBoundingClientRect();
    const overflowRect = this.overflow.getBoundingClientRect();
    
    // Check if the active link is visible in the overflow container
    if (linkRect.top < overflowRect.top || linkRect.bottom > overflowRect.bottom) {
      // Calculate scroll position to center the active link
      const scrollTop = this.overflow.scrollTop + 
                       (linkRect.top - overflowRect.top) - 
                       (overflowRect.height / 2) + 
                       (linkRect.height / 2);
      
      this.overflow.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
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
    
    // Clean up TOC button events
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TableOfContents();
});