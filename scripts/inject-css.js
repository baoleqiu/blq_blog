hexo.extend.injector.register('head_end', `<style>
/* 禁用头像旋转 */
.avatar-img img:hover {
  transform: none !important;
}

/* 禁用社交图标旋转 */
.card-info-social-icons i:hover {
  transform: none !important;
}
</style>`);
