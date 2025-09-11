/**
 * 动态Header功能
 * 向下滚动显示动态标题，向上滚动显示默认Header
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initDynamicHeader();
  });

  function initDynamicHeader() {
    const siteHeader = document.querySelector('.site-header');
    const dynamicHeader = document.getElementById('dynamic-header');
    const dynamicTitle = document.getElementById('dynamic-title');
    
    if (!siteHeader || !dynamicHeader || !dynamicTitle) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    let currentPageType = getPageType();
    let targetTitle = getTargetTitle();

    // 获取页面类型
    function getPageType() {
      const pathname = window.location.pathname;
      const body = document.body;
      
      if (body.classList.contains('single') || pathname.includes('/posts/') || pathname.match(/\/\d{4}\/\d{2}\/\d{2}\//)) {
        return 'post';
      } else if (pathname.includes('/categories/') && pathname !== '/categories/') {
        return 'category';
      } else if (pathname.includes('/tags/') && pathname !== '/tags/') {
        return 'tag';
      }
      return 'home';
    }

    // 获取目标标题
    function getTargetTitle() {
      if (currentPageType === 'post') {
        const postTitle = document.querySelector('#post-title, .post-title, h1.post-title');
        return postTitle ? postTitle.textContent.trim() : '';
      } else if (currentPageType === 'category') {
        const categoryTitle = document.querySelector('#category-title, .page-title, .category-title');
        return categoryTitle ? categoryTitle.textContent.trim() : '';
      } else if (currentPageType === 'tag') {
        const tagTitle = document.querySelector('#tag-title, .page-title, .tag-title');
        return tagTitle ? tagTitle.textContent.trim() : '';
      }
      return '';
    }

    // 检测滚动方向
    function getScrollDirection() {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
      return direction;
    }

    // 更新Header状态
    function updateHeader() {
      const scrollDirection = getScrollDirection();
      
      // 只有在有目标标题时才处理
      if (!targetTitle) return;
      
      if (scrollDirection === 'down' && window.scrollY > 50) {
        // 向下滚动且滚动超过50px，显示动态标题
        showDynamicTitle();
      } else if (scrollDirection === 'up' || window.scrollY <= 50) {
        // 向上滚动或滚动到顶部，显示默认Header
        hideDynamicTitle();
      }
      
      ticking = false;
    }

    // 显示动态标题
    function showDynamicTitle() {
      if (targetTitle) {
        dynamicTitle.textContent = targetTitle;
        dynamicHeader.classList.add('active');
        siteHeader.classList.add('dynamic-active');
      }
    }

    // 隐藏动态标题
    function hideDynamicTitle() {
      dynamicHeader.classList.remove('active');
      siteHeader.classList.remove('dynamic-active');
    }

    // 请求动画帧
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }

    // 监听滚动事件
    window.addEventListener('scroll', requestTick, { passive: true });

    // 页面加载完成后重新计算
    window.addEventListener('load', function() {
      currentPageType = getPageType();
      targetTitle = getTargetTitle();
    });
  }

})();