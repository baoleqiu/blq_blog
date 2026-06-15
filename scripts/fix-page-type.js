// 修复 getPageType：防止非首页被误判为 home
// 使用 generateBefore 钩子确保在主题注册之后覆盖
hexo.on('ready', function () {
  hexo.extend.helper.register('getPageType', function (page, isHome) {
    const { layout, tag, category, type, archive, path } = page;

    // 根据页面路径明确判断类型
    if (path) {
      if (path.startsWith('tags/'))       return tag ? 'tag' : 'tags';
      if (path.startsWith('categories/'))  return category ? 'category' : 'categories';
      if (path.startsWith('archives/'))    return 'archive';
      if (path.startsWith('photos/'))      return 'page';
    }

    // 只有根路径才是首页
    if (isHome && (!path || path === '' || path === 'index.html')) return 'home';

    // 原有逻辑兜底
    if (layout)  return typeof layout === 'string' ? layout : (layout[0] && layout[0] !== 'index' ? layout[0] : 'page');
    if (tag)     return 'tag';
    if (category) return 'category';
    if (archive) return 'archive';
    if (type) {
      if (type === 'tags' || type === 'categories') return type;
      return 'page';
    }
    if (isHome)  return 'home';
    return 'post';
  });
});
