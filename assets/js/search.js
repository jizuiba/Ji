/**
 * 搜索功能处理
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initSearch();
  });

  function initSearch() {
    const searchContainer = document.querySelector('.search-container');
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (!searchContainer || !searchToggle || !searchForm || !searchInput) return;

    let isSearchOpen = false;
    let userInitiatedSearch = false; // 标记是否为用户主动触发的搜索
    let isPageLoading = true; // 标记页面是否正在加载

    // 页面加载完成后允许搜索功能
    setTimeout(() => {
      isPageLoading = false;
    }, 1000);

    // 切换搜索框显示/隐藏
    function toggleSearch(userInitiated = false) {
      if (userInitiated) {
        userInitiatedSearch = true;
      }
      
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
        userInitiatedSearch = false;
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
        userInitiatedSearch = false;
      }
    }

    // 搜索切换按钮点击事件 - 直接触发搜索
    searchToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // 页面加载期间不允许打开搜索框
      if (isPageLoading) return;
      
      // 如果搜索框是关闭的，先打开它
      if (!isSearchOpen) {
        toggleSearch(true); // 标记为用户主动触发
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

    // 防止菜单点击时意外触发搜索框
    const menuItems = document.querySelectorAll('.menu-item a, .mobile-primary-menu a');
    menuItems.forEach(menuItem => {
      menuItem.addEventListener('click', function() {
        // 确保在菜单点击时关闭搜索框
        closeSearch();
        // 重置用户主动触发标记
        userInitiatedSearch = false;
      });
    });

    // 防止页面导航时搜索框保持打开状态
    window.addEventListener('beforeunload', function() {
      closeSearch();
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
    // 但只有在用户主动点击搜索相关元素时才打开
    searchInput.addEventListener('focus', function(e) {
      // 页面加载期间或非用户主动触发时不打开搜索框
      if (isPageLoading || !userInitiatedSearch) return;
      
      // 只有在用户主动触发搜索时才允许通过焦点打开搜索框
      if (!isSearchOpen) {
        // 检查焦点是否来自用户主动操作（点击搜索按钮或搜索容器）
        const relatedTarget = e.relatedTarget;
        if (relatedTarget === searchToggle || 
            relatedTarget === searchContainer ||
            searchContainer.contains(relatedTarget)) {
          toggleSearch(true);
        }
      }
    });
  }

})();