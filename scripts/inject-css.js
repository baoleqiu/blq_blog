hexo.extend.injector.register('head_end', `<style>
/* 禁用头像和社交图标旋转动画 */
.avatar-img img:hover,
.social-icon:hover {
  transform: none !important;
}
</style>`);
