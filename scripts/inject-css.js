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

/* 灯箱窗口化 - 不占满全屏 */
.fancybox__container {
  --fancybox-bg: rgba(0, 0, 0, 0.7);
  --fancybox-padding: 40px;
}

.fancybox__content {
  max-width: 75vw !important;
  max-height: 80vh !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4) !important;
}

.fancybox__content img {
  max-width: 75vw !important;
  max-height: 80vh !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
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

  // Fancybox 窗口化配置
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof Fancybox !== 'undefined') {
      Fancybox.defaults.tpl.main = '<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="图片预览" tabindex="-1"><div class="fancybox__backdrop"></div><div class="fancybox__carousel"></div><div class="fancybox__footer"></div></div>';
      Fancybox.defaults.Images.zoom = false;
    }
  });
})();
</script>`);
