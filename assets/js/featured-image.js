/**
 * Featured Image 优化功能
 * 图片加载优化、错误处理、懒加载等
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initFeaturedImageOptimization();
  });

  function initFeaturedImageOptimization() {
    const featuredImages = document.querySelectorAll('.feature-img');
    
    if (!featuredImages.length) return;

    featuredImages.forEach(img => {
      // 添加加载状态
      addLoadingState(img);
      
      // 监听加载事件
      img.addEventListener('load', handleImageLoad);
      img.addEventListener('error', handleImageError);
      
      // 如果图片已经加载完成
      if (img.complete) {
        handleImageLoad.call(img);
      }
    });
  }

  function addLoadingState(img) {
    const wrapper = img.closest('.feature-image-wrapper');
    if (!wrapper) return;

    // 添加加载占位符
    const placeholder = document.createElement('div');
    placeholder.className = 'feature-image-placeholder';
    placeholder.innerHTML = `
      <div class="placeholder-content">
        <div class="placeholder-spinner"></div>
        <span class="placeholder-text">加载中...</span>
      </div>
    `;
    
    wrapper.appendChild(placeholder);
  }

  function handleImageLoad() {
    const wrapper = this.closest('.feature-image-wrapper');
    const placeholder = wrapper?.querySelector('.feature-image-placeholder');
    
    if (placeholder) {
      // 添加淡入动画
      this.style.opacity = '0';
      this.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        this.style.opacity = '1';
        placeholder.style.opacity = '0';
        
        setTimeout(() => {
          placeholder.remove();
        }, 500);
      }, 100);
    }
  }

  function handleImageError() {
    const wrapper = this.closest('.feature-image-wrapper');
    const placeholder = wrapper?.querySelector('.feature-image-placeholder');
    
    if (placeholder) {
      placeholder.innerHTML = `
        <div class="placeholder-content error">
          <div class="error-icon">📷</div>
          <span class="error-text">图片加载失败</span>
        </div>
      `;
    }
  }
})();
