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

/* 灯箱工具栏：隐藏放大、缩小、1:1、逆时针旋转 */
.fancybox__toolbar button[title="Zoom in"],
.fancybox__toolbar button[title="放大"],
.fancybox__toolbar button[title="Zoom out"],
.fancybox__toolbar button[title="缩小"],
.fancybox__toolbar button[title="Toggle zoom"],
.fancybox__toolbar button[title="1 : 1"],
.fancybox__toolbar button[title="Rotate counterclockwise"],
.fancybox__toolbar button[title="逆时针旋转"] {
  display: none !important;
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
