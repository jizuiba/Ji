/**
 * 搜索功能处理
 */

(function() {
  'use strict';

  // 立即初始化搜索功能，不等待DOMContentLoaded
  // 这样可以防止在页面加载过程中出现样式问题
  function initSearchImmediate() {
    // 如果DOM已经加载完成，立即初始化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSearch);
    } else {
      initSearch();
    }
  }

  // 立即执行初始化
  initSearchImmediate();

  function initSearch() {
    const searchContainer = document.querySelector('.search-container');
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (!searchContainer || !searchToggle || !searchForm || !searchInput) return;

    let isSearchOpen = false;

    // 切换搜索框显示/隐藏
    function toggleSearch() {
      isSearchOpen = !isSearchOpen;
      
      if (isSearchOpen) {
        // 打开搜索框
        searchForm.classList.add('active');
        searchToggle.classList.add('active');
        searchToggle.setAttribute('aria-expanded', 'true');
        
        // 延迟聚焦到输入框，等待动画完成
        setTimeout(() => {
          searchInput.focus();
        }, 150);
      } else {
        // 关闭搜索框
        searchForm.classList.remove('active');
        searchToggle.classList.remove('active');
        searchToggle.setAttribute('aria-expanded', 'false');
        
        searchInput.blur();
        searchInput.value = '';
      }
    }

    // 关闭搜索框
    function closeSearch() {
      if (isSearchOpen) {
        isSearchOpen = false;
        searchForm.classList.remove('active');
        searchToggle.classList.remove('active');
        searchToggle.setAttribute('aria-expanded', 'false');
        
        searchInput.blur();
        searchInput.value = '';
      }
    }

    // 搜索切换按钮点击事件 - 直接触发搜索
    searchToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // 如果搜索框是关闭的，先打开它
      if (!isSearchOpen) {
        toggleSearch();
      } else {
        // 如果搜索框是打开的，直接提交搜索
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = '/search/?q=' + encodeURIComponent(query);
        }
      }
    });

    // 搜索表单提交事件
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const query = searchInput.value.trim();
      
      if (query) {
        // 跳转到搜索页面，并传递搜索参数
        window.location.href = '/search/?q=' + encodeURIComponent(query);
      }
    });

    // 搜索输入框回车键提交
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        
        const query = searchInput.value.trim();
        
        if (query) {
          // 跳转到搜索页面，并传递搜索参数
          window.location.href = '/search/?q=' + encodeURIComponent(query);
        }
      }
    });

    // 点击搜索框外部关闭搜索
    document.addEventListener('click', function(e) {
      if (!searchContainer.contains(e.target)) {
        closeSearch();
      }
    });

    // ESC键关闭搜索
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    });

    // 搜索输入框失焦时保持打开状态（除非点击了外部）
    searchInput.addEventListener('blur', function(e) {
      // 延迟检查，避免点击提交按钮时立即关闭
      setTimeout(() => {
        if (!searchContainer.contains(document.activeElement)) {
          closeSearch();
        }
      }, 100);
    });

    // 搜索输入框获得焦点时确保搜索框打开
    searchInput.addEventListener('focus', function() {
      if (!isSearchOpen) {
        toggleSearch();
      }
    });
  }

})();