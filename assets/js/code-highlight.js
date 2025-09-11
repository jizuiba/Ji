/**
 * Code Highlighting and Copy Functionality
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initCodeHighlighting();
    initCodeCopyButtons();
    initCodeLineNumbers();
  });

  /**
   * Initialize Code Highlighting
   */
  function initCodeHighlighting() {
    const preBlocks = document.querySelectorAll('pre');
    
    preBlocks.forEach(pre => {
      const codeBlock = pre.querySelector('code');
      if (!codeBlock) return;
      
      // Add language class if not present
      if (!codeBlock.className.includes('language-')) {
        const language = detectLanguage(codeBlock.textContent);
        if (language) {
          codeBlock.classList.add(`language-${language}`);
        }
      }
      
      // Wrap pre block in container
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      
      // Add copy button
      addCopyButton(wrapper);
      
      // Add line numbers if enabled
      if (shouldShowLineNumbers(codeBlock)) {
        addLineNumbers(wrapper);
      }
    });
  }

  /**
   * Detect Programming Language
   */
  function detectLanguage(code) {
    const patterns = {
      javascript: /^(function|const|let|var|import|export|class|async|await|console\.log)/m,
      typescript: /^(interface|type|enum|namespace|declare|import.*from)/m,
      python: /^(def|class|import|from|if __name__|print\(|#!\/usr\/bin\/python|async def)/m,
      html: /^<(!DOCTYPE|html|head|body|div|span|p|a|img|script|style)/m,
      css: /^(@import|@media|\.|#|body|html|div|:root|--)/m,
      scss: /^(@import|@mixin|@include|\$|\.|#|body|html|div)/m,
      json: /^[\s]*[\{\[]/m,
      yaml: /^(apiVersion|kind|metadata|spec|version|name|namespace)/m,
      bash: /^(#!\/bin\/bash|#!\/bin\/sh|sudo|apt|yum|npm|git|echo|cd|ls)/m,
      sql: /^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|FROM|WHERE)/m,
      php: /^(<?php|<?=|\$|function|class|namespace)/m,
      java: /^(public|private|class|import|package|interface|enum)/m,
      cpp: /^(#include|using namespace|int main|class|public:|std::)/m,
      go: /^(package|import|func|type|var|const|interface|struct)/m,
      rust: /^(fn|let|mut|use|mod|struct|enum|impl|pub|async)/m,
      kotlin: /^(fun|class|import|package|val|var|data class)/m,
      swift: /^(import|class|struct|func|let|var|protocol|extension)/m
    };

    for (const [lang, pattern] of Object.entries(patterns)) {
      if (pattern.test(code)) {
        return lang;
      }
    }
    
    return null;
  }

  /**
   * Add Copy Button to Code Blocks
   */
  function addCopyButton(wrapper) {
    const button = document.createElement('button');
    button.className = 'code-copy-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span class="copy-text">Copy</span>
    `;
    
    button.addEventListener('click', function() {
      copyCodeToClipboard(this);
    });
    
    wrapper.appendChild(button);
  }

  /**
   * Copy Code to Clipboard
   */
  function copyCodeToClipboard(button) {
    const wrapper = button.parentNode;
    const codeBlock = wrapper.querySelector('code');
    if (!codeBlock) return;
    
    const code = codeBlock.textContent;
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).then(() => {
        showCopySuccess(button);
      }).catch(() => {
        fallbackCopyToClipboard(code, button);
      });
    } else {
      fallbackCopyToClipboard(code, button);
    }
  }

  /**
   * Fallback Copy Method
   */
  function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      showCopySuccess(button);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showCopyError(button);
    }
    
    document.body.removeChild(textArea);
  }

  /**
   * Show Copy Success Feedback
   */
  function showCopySuccess(button) {
    const originalText = button.querySelector('.copy-text').textContent;
    const icon = button.querySelector('svg');
    
    button.querySelector('.copy-text').textContent = 'Copied!';
    button.classList.add('copied');
    
    // Change icon to checkmark
    icon.innerHTML = `
      <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    `;
    
    setTimeout(() => {
      button.querySelector('.copy-text').textContent = originalText;
      button.classList.remove('copied');
      icon.innerHTML = `
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      `;
    }, 2000);
  }

  /**
   * Show Copy Error Feedback
   */
  function showCopyError(button) {
    const originalText = button.querySelector('.copy-text').textContent;
    const icon = button.querySelector('svg');
    
    button.querySelector('.copy-text').textContent = 'Error';
    button.classList.add('error');
    
    // Change icon to X
    icon.innerHTML = `
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"></line>
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"></line>
    `;
    
    setTimeout(() => {
      button.querySelector('.copy-text').textContent = originalText;
      button.classList.remove('error');
      icon.innerHTML = `
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      `;
    }, 2000);
  }

  /**
   * Initialize Code Copy Buttons
   */
  function initCodeCopyButtons() {
    // This is handled in initCodeHighlighting
  }

  /**
   * Check if Line Numbers Should Be Shown
   */
  function shouldShowLineNumbers(codeBlock) {
    // Check if line numbers are enabled in theme config
    const config = window.JI?.config || {};
    const lineCount = codeBlock.textContent.split('\n').length;
    // Show line numbers for blocks with more than 3 lines
    return config.showLineNumbers !== false && lineCount > 3;
  }

  /**
   * Add Line Numbers to Code Blocks
   */
  function addLineNumbers(wrapper) {
    const pre = wrapper.querySelector('pre');
    const code = pre.querySelector('code');
    if (!code) return;
    
    const lines = code.textContent.split('\n');
    
    // Create line numbers container
    const lineNumbers = document.createElement('div');
    lineNumbers.className = 'line-numbers';
    
    // Add line numbers
    lines.forEach((_, index) => {
      const lineNumber = document.createElement('span');
      lineNumber.className = 'line-number';
      lineNumber.textContent = index + 1;
      lineNumbers.appendChild(lineNumber);
    });
    
    // Insert line numbers before pre
    wrapper.insertBefore(lineNumbers, pre);
    wrapper.classList.add('with-line-numbers');
  }

  /**
   * Initialize Line Numbers
   */
  function initCodeLineNumbers() {
    // This is handled in initCodeHighlighting
  }

  // CSS样式已在syntax.css中定义，无需重复添加

})();
