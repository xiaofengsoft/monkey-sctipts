// ==UserScript==
// @name         CSDN博客内容优化
// @namespace    https://blog.csdn.net/
// @version      1.0
// @description  优化CSDN博客页面的阅读体验
// @author       张一风
// @match        https://blog.csdn.net/*
// @grant        none
// @icon         http://yunyicloud.cn/wp-content/uploads/2024/08/云奕Banner.png
// @license MIT
// ==/UserScript==

(function () {
  'use strict';

  /**
   * 获取元素
   * @param {String} selector 
   * @param {Element} context 
   */
  function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return elements.length === 1
      ? elements[0]
      : Array.prototype.slice.call(elements);
  }

  /**
   * 拷贝字符串内容
   * @param {String} str 
   */
  function copy(str) {
    navigator.clipboard.writeText(str);
  }

  /**
   * 添加CSS样式
   * @param {String} styles CSS styles
   */
  function addCSS(styles) {
    let styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }

  // 等待页面加载完成
  window.addEventListener('load', function () {
    const selectorsToRemove = [
      '.blog_container_aside',
      '.recommend-right',
      '#toolbarBox',
      '.csdn-side-toolbar',
      '.recommend-box',
      '.article-info-box',
      '.hide-preCode-box',
      '.is-traffic-img'
    ];

    // 删除匹配到的DOM节点
    selectorsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(node => {
        node.remove();
      });
    });

    const mainBox = document.querySelector('#mainBox');
    if (mainBox) {
      mainBox.style.marginRight = '0px'; // 修改为你需要的值
      mainBox.style.width = '80%';
    }
    const main = document.querySelector('main');
    main.style.width = '100%';

    const articleContent = document.querySelector('.article_content');
    if (articleContent) {
      articleContent.style.overflow = 'auto';
    }

  });

  const buttons = Array.isArray($$(".hljs-button"))
    ? $$(".hljs-button")
    : [$$(".hljs-button")];

  buttons.forEach((btn) => {
    btn.dataset.title = "复制";
    btn.setAttribute("onclick", "");
    const elClone = btn.cloneNode(true);
    btn.parentNode.replaceChild(elClone, btn);

    elClone.addEventListener("click", (e) => {
      const parentPreBlock = e.target.closest("pre");
      const codeBlock = $$("code", parentPreBlock);
      copy(codeBlock.innerText);

      e.target.dataset.title = "复制成功";
      setTimeout(() => {
        e.target.dataset.title = "复制";
      }, 1000);

      e.stopPropagation();
      e.preventDefault();
    });
  });

  const readMore = document.querySelector('.btn-readmore');
  const hideArticleStyle = `
    .hide-article-box {
      z-index: -1 !important;
    }
  `;
  if (readMore) {
    addCSS(hideArticleStyle);
  }

  // 可以选取代码块
  const codeBlocks = Array.from(document.querySelectorAll('code'));
  codeBlocks.forEach((code) => {
    code.style.userSelect = 'text';
  })
  const preBlocks = Array.from(document.querySelectorAll('pre'));
  preBlocks.forEach((pre) => {
    pre.style.height = 'unset';
    pre.style.maxHeight = 'unset';
    pre.style.userSelect = 'text';
  });
})();
