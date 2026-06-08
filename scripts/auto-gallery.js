const fs = require('fs');
const path = require('path');

hexo.on('generateBefore', function () {
  const posts = hexo.locals.get('posts').sort('date', -1);

  // 按年月分组
  const groups = {};
  posts.forEach(post => {
    const imgRegex = /!\[.*?\]\((\/img\/.+?)\)/g;
    let match;
    const images = [];
    while ((match = imgRegex.exec(post.content)) !== null) {
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

  // 生成 markdown
  let md = `---
title: 相册
date: 2026-06-08 17:22:24
type: photos
---

`;

  Object.keys(groups).sort().reverse().forEach(month => {
    md += `## ${month}\n\n{% gallery %}\n`;
    groups[month].forEach(img => {
      md += `![${img.title}](${img.url})\n`;
    });
    md += '{% endgallery %}\n\n';
  });

  // 写入 source/photos/index.md
  const dir = path.join(hexo.base_dir, 'source', 'photos');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.md'), md);
});
