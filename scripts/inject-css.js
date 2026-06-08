hexo.extend.injector.register('head_end', `<style>
/* 侧边栏卡片半透明毛玻璃 */
#aside-content .card-widget,
#aside-content > div {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}

/* 文章列表卡片半透明毛玻璃 */
#recent-posts > .recent-post-item {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}

/* 文章详情页半透明 */
.layout_post > #post,
.layout_page > #page {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}

/* 导航栏半透明 */
#nav {
  background: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
}

/* 圆角 */
#aside-content .card-widget,
#recent-posts > .recent-post-item {
  border-radius: 12px !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
}
</style>`);
