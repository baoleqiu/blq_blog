hexo.extend.filter.register('after_generate', function() {
  const fs = require('fs');
  const path = require('path');
  const file = path.join(hexo.public_dir, 'js', 'utils.js');

  if (!fs.existsSync(file)) return;

  let content = fs.readFileSync(file, 'utf-8');

  // 从工具栏中移除: zoomIn, zoomOut, toggle1to1, rotateCCW
  content = content.replace(
    /'\s*zoomIn\s*',\s*'\s*zoomOut\s*',\s*'\s*toggle1to1\s*',\s*'\s*rotateCCW\s*',/g,
    ''
  );

  fs.writeFileSync(file, content);
});
