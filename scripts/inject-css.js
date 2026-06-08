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
</style>`);
