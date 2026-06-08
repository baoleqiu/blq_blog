hexo.extend.injector.register('head_end', `<style>
/* 禁用头像旋转动画 */
.avatar-img img:hover {
  transform: none !important;
}
</style>`);
