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
</style>

<script>
// 在 Fancybox 初始化前修改默认配置
(function() {
  var check = setInterval(function() {
    if (typeof Fancybox !== 'undefined' && Fancybox.defaults) {
      clearInterval(check);
      // 覆盖工具栏配置，移除指定按钮
      if (!Fancybox.defaults._customized) {
        var orig = Fancybox.defaults.Carousel || {};
        orig.Toolbar = orig.Toolbar || {};
        orig.Toolbar.display = {
          left: ['counter'],
          middle: ['rotateCW', 'flipX', 'flipY', 'reset'],
          right: ['autoplay', 'thumbs', 'close']
        };
        Fancybox.defaults.Carousel = orig;
        Fancybox.defaults._customized = true;
      }
    }
  }, 50);
})();
</script>`);

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
