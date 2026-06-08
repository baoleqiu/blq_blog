const { join } = require('path');

hexo.extend.generator.register('auto-gallery', function (locals) {
  // 获取所有文章
  const posts = locals.posts.sort('date', -1);

  // 按年月分组
  const groups = {};
  posts.forEach(post => {
    // 提取文章中的图片
    const imgRegex = /!\[.*?\]\((\/img\/.+?)\)/g;
    let match;
    const images = [];
    while ((match = imgRegex.exec(post.content)) !== null) {
      images.push(match[1]);
    }

    if (images.length === 0) return;

    // 按年月分组
    const month = post.date.format('YYYY年M月');

    if (!groups[month]) {
      groups[month] = [];
    }

    images.forEach(img => {
      // 避免重复图片
      if (!groups[month].find(i => i.url === img)) {
        groups[month].push({
          url: img,
          postTitle: post.title,
          postPath: post.path
        });
      }
    });
  });

  // 生成相册页面内容
  let content = '';
  Object.keys(groups).sort().reverse().forEach(month => {
    content += `\n## ${month}\n\n{% gallery %}\n`;
    groups[month].forEach(img => {
      content += `![${img.postTitle}](${img.url})\n`;
    });
    content += '{% endgallery %}\n';
  });

  return {
    path: 'photos/index.html',
    data: {
      title: '相册',
      date: '2026-06-08 17:22:24',
      type: 'photos',
      _content: content
    },
    layout: ['page', 'post']
  };
});
