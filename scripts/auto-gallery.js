hexo.extend.generator.register('auto-gallery', function (locals) {
  const posts = locals.posts.sort('date', -1);

  const groups = {};
  posts.forEach(post => {
    const imgRegex = /!\[.*?\]\((\/img\/.+?)\)/g;
    let match;
    const images = [];
    while ((match = imgRegex.exec(post._content)) !== null) {
      images.push(match[1]);
    }

    if (images.length === 0) return;

    const month = post.date.format('YYYY年M月');
    if (!groups[month]) groups[month] = [];

    images.forEach(img => {
      if (!groups[month].find(i => i.url === img)) {
        groups[month].push({ url: img, title: post.title });
      }
    });
  });

  let html = '';
  Object.keys(groups).sort().reverse().forEach(month => {
    html += `<h2 id="${month}">${month}</h2>\n`;
    html += '<div class="gallery">\n';
    groups[month].forEach(img => {
      html += `<div class="gallery-item">\n`;
      html += `  <a href="${img.url}" data-fancybox="gallery" data-caption="${img.title}">\n`;
      html += `    <img src="${img.url}" alt="${img.title}" loading="lazy">\n`;
      html += `  </a>\n`;
      html += `</div>\n`;
    });
    html += '</div>\n';
  });

  if (!html) html = '<p>还没有照片，去写一篇带图片的文章吧 📸</p>';

  return {
    path: 'photos/index.html',
    data: {
      title: '相册',
      date: '2026-06-08 17:22:24',
      top_img: 'transparent',
      content: html
    },
    layout: ['page', 'post']
  };
});
