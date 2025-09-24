/**
 * Code Highlighting and Copy Functionality
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initCodeHighlighting();
    initCodeCopyButtons();
    initCodeLineNumbers();
    initCodeBlockInteractions();
  });

  function initCodeHighlighting() {
    const preBlocks = document.querySelectorAll('pre');
    
    preBlocks.forEach(pre => {
      // Skip mermaid diagrams to avoid interfering with Mermaid rendering
      if (pre.classList.contains('mermaid')) return;

      const codeBlock = pre.querySelector('code');
      if (!codeBlock) return;
      
      if (!codeBlock.className.includes('language-')) {
        const language = detectLanguage(codeBlock.textContent);
        if (language) {
          codeBlock.classList.add(`language-${language}`);
        }
      }
      
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Build a header area to avoid overlapping UI on code content
      const header = document.createElement('div');
      header.className = 'code-block-header';

      // Add copy button (left)
      const copyButton = createCopyButton();
      header.appendChild(copyButton);

      // Add language label (right)
      const languageLabel = createLanguageLabel(codeBlock);
      if (languageLabel) header.appendChild(languageLabel);

      // Insert header before the <pre>
      wrapper.insertBefore(header, pre);
      
      // Add line numbers
      const lineCount = codeBlock.textContent.split('\n').length;
      const showLineNumbers = window.themeConfig && window.themeConfig.showLineNumbers !== false;
      if (lineCount > 3 && showLineNumbers) {
        addLineNumbers(wrapper);
      }
    });
  }

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

  // Create language label element
  function createLanguageLabel(codeBlock) {
    const language = getLanguageFromClass(codeBlock.className);
    if (!language) return null;
    
    const label = document.createElement('div');
    label.className = 'code-language-label';
    label.textContent = getLanguageDisplayName(language);
    label.setAttribute('title', `编程语言: ${getLanguageDisplayName(language)}`);
    return label;
  }

  function getLanguageFromClass(className) {
    const match = className.match(/language-(\w+)/);
    return match ? match[1] : null;
  }

  function getLanguageDisplayName(language) {
    const languageNames = {
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'python': 'Python',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'sass': 'Sass',
      'less': 'Less',
      'json': 'JSON',
      'yaml': 'YAML',
      'yml': 'YAML',
      'bash': 'Bash',
      'shell': 'Shell',
      'sh': 'Shell',
      'sql': 'SQL',
      'php': 'PHP',
      'java': 'Java',
      'cpp': 'C++',
      'c': 'C',
      'csharp': 'C#',
      'cs': 'C#',
      'go': 'Go',
      'golang': 'Go',
      'rust': 'Rust',
      'kotlin': 'Kotlin',
      'swift': 'Swift',
      'ruby': 'Ruby',
      'rb': 'Ruby',
      'scala': 'Scala',
      'dart': 'Dart',
      'r': 'R',
      'matlab': 'MATLAB',
      'octave': 'Octave',
      'lua': 'Lua',
      'perl': 'Perl',
      'pl': 'Perl',
      'powershell': 'PowerShell',
      'ps1': 'PowerShell',
      'dockerfile': 'Dockerfile',
      'docker': 'Dockerfile',
      'nginx': 'Nginx',
      'apache': 'Apache',
      'vim': 'Vim',
      'viml': 'Vim',
      'emacs': 'Emacs Lisp',
      'lisp': 'Lisp',
      'clojure': 'Clojure',
      'clj': 'Clojure',
      'haskell': 'Haskell',
      'hs': 'Haskell',
      'ocaml': 'OCaml',
      'fsharp': 'F#',
      'fs': 'F#',
      'erlang': 'Erlang',
      'erl': 'Erlang',
      'elixir': 'Elixir',
      'ex': 'Elixir',
      'exs': 'Elixir',
      'julia': 'Julia',
      'jl': 'Julia',
      'nim': 'Nim',
      'crystal': 'Crystal',
      'zig': 'Zig',
      'assembly': 'Assembly',
      'asm': 'Assembly',
      'markdown': 'Markdown',
      'md': 'Markdown',
      'text': 'Text',
      'plain': 'Plain Text',
      'plaintext': 'Plain Text',
      'diff': 'Diff',
      'patch': 'Patch',
      'git': 'Git',
      'gitignore': 'Git Ignore',
      'dockerignore': 'Docker Ignore',
      'editorconfig': 'EditorConfig',
      'ini': 'INI',
      'toml': 'TOML',
      'xml': 'XML',
      'svg': 'SVG',
      'graphql': 'GraphQL',
      'gql': 'GraphQL',
      'protobuf': 'Protocol Buffers',
      'proto': 'Protocol Buffers',
      'thrift': 'Apache Thrift',
      'avro': 'Apache Avro',
      'yacc': 'Yacc',
      'lex': 'Lex',
      'bnf': 'BNF',
      'ebnf': 'EBNF',
      'peg': 'PEG',
      'jison': 'Jison',
      'antlr': 'ANTLR',
      'flex': 'Flex',
      'bison': 'Bison'
    };
    
    return languageNames[language.toLowerCase()] || language.toUpperCase();
  }

  // Create copy button element (not absolutely positioned)
  function createCopyButton() {
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
    
    return button;
  }

  function copyCodeToClipboard(button) {
    const wrapper = button.closest('.code-block-wrapper');
    const codeBlock = wrapper && wrapper.querySelector('code');
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

  function showCopySuccess(button) {
    const originalText = button.querySelector('.copy-text').textContent;
    const icon = button.querySelector('svg');
    
    button.querySelector('.copy-text').textContent = 'Copied!';
    button.classList.add('copied');
    
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

  function showCopyError(button) {
    const originalText = button.querySelector('.copy-text').textContent;
    const icon = button.querySelector('svg');
    
    button.querySelector('.copy-text').textContent = 'Error';
    button.classList.add('error');
    
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

  function initCodeCopyButtons() {
    // handled during initialization
  }

  function addLineNumbers(wrapper) {
    const pre = wrapper.querySelector('pre');
    const code = pre.querySelector('code');
    if (!code) return;
    
    const lines = code.textContent.split('\n');
    
    const lineNumbers = document.createElement('div');
    lineNumbers.className = 'line-numbers';
    lineNumbers.setAttribute('aria-label', 'Line numbers');
    
    lines.forEach((_, index) => {
      const lineNumber = document.createElement('span');
      lineNumber.className = 'line-number';
      lineNumber.textContent = index + 1;
      lineNumber.setAttribute('data-line', index + 1);
      lineNumber.setAttribute('role', 'button');
      lineNumber.setAttribute('tabindex', '0');
      lineNumber.setAttribute('aria-label', `Line ${index + 1}`);
      
      lineNumber.addEventListener('click', function() {
        highlightLine(this, wrapper);
      });
      
      lineNumber.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          highlightLine(this, wrapper);
        }
      });
      
      lineNumbers.appendChild(lineNumber);
    });
    
    wrapper.insertBefore(lineNumbers, pre);
    wrapper.classList.add('with-line-numbers');
  }

  function highlightLine(lineElement, wrapper) {
    const previousActive = wrapper.querySelector('.line-number.active');
    if (previousActive) {
      previousActive.classList.remove('active');
    }
    
    lineElement.classList.add('active');
    
    const lineNumber = parseInt(lineElement.getAttribute('data-line'));
    const pre = wrapper.querySelector('pre');
    const code = pre.querySelector('code');
    const lines = code.textContent.split('\n');
    
    if (lineNumber <= lines.length) {
      const lineHeight = 24;
      const scrollTop = (lineNumber - 1) * lineHeight;
      pre.scrollTop = Math.max(0, scrollTop - 100);
    }
  }

  function initCodeLineNumbers() {
    // handled during initialization
  }

  function initCodeBlockInteractions() {
    const codeBlocks = document.querySelectorAll('.code-block-wrapper');
    
    codeBlocks.forEach(block => {
      block.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          const activeLine = block.querySelector('.line-number.active');
          if (activeLine) {
            activeLine.classList.remove('active');
            activeLine.blur();
          }
        }
      });
      
      const copyButton = block.querySelector('.code-copy-button');
      if (copyButton) {
        copyButton.addEventListener('keydown', function(e) {
          if (e.key === 'Tab' && !e.shiftKey) {
            const firstLine = block.querySelector('.line-number');
            if (firstLine) {
              e.preventDefault();
              firstLine.focus();
            }
          }
        });
      }
      
      const lineNumbers = block.querySelectorAll('.line-number');
      lineNumbers.forEach((line, index) => {
        line.addEventListener('keydown', function(e) {
          switch(e.key) {
            case 'ArrowDown':
              e.preventDefault();
              const nextLine = lineNumbers[index + 1];
              if (nextLine) nextLine.focus();
              break;
            case 'ArrowUp':
              e.preventDefault();
              const prevLine = lineNumbers[index - 1];
              if (prevLine) prevLine.focus();
              else if (copyButton) copyButton.focus();
              break;
            case 'Home':
              e.preventDefault();
              lineNumbers[0].focus();
              break;
            case 'End':
              e.preventDefault();
              lineNumbers[lineNumbers.length - 1].focus();
              break;
          }
        });
      });
    });
  }

})();
