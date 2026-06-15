hexo.extend.injector.register('head_end', `<style>
/* 禁用头像旋转 */
.avatar-img img:hover {
  transform: none !important;
}

/* 禁用社交图标旋转 */
.card-info-social-icons i:hover {
  transform: none !important;
}

/* 相册缩略图 - 固定比例网格 */
.gallery {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
  gap: 12px !important;
}

.gallery .gallery-item {
  width: 100% !important;
  aspect-ratio: 4 / 3 !important;
  overflow: hidden !important;
  border-radius: 8px !important;
  cursor: pointer !important;
  transition: transform 0.3s ease !important;
}

.gallery .gallery-item:hover {
  transform: scale(1.03) !important;
}

.gallery .gallery-item img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

/* 移除背景图淡入动画，立即显示 */
#web_bg.bg-animation {
  animation: none !important;
  opacity: 1 !important;
}


/* 文章页和透明顶部图页面：header背景透明，标题居中 */
#page-header.post-bg {
  background: transparent !important;
  background-color: transparent !important;
}
#page-header.not-home-page #page-site-info {
  top: 50% !important;
  transform: translateY(-50%) !important;
}

/* 页脚透明 */
#footer {
  background: transparent !important;
}

/* 灯箱窗口化 */
.fancybox__backdrop {
  background: rgba(0, 0, 0, 0.6) !important;
}

.fancybox__slide {
  padding: 40px !important;
}

.fancybox__content {
  border-radius: 12px !important;
  overflow: hidden !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5) !important;
  background: transparent !important;
}
</style>`);

hexo.extend.injector.register('body_end', `<script>
(function() {
  // 替换"发表于"为"记录于"
  var observer = new MutationObserver(function() {
    document.querySelectorAll('.post-meta-date span, .post-meta-date').forEach(function(el) {
      if (el.childNodes[0] && el.childNodes[0].nodeType === 3) {
        el.childNodes[0].textContent = el.childNodes[0].textContent.replace('发表于', '记录于');
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
</script>`);
