hexo.extend.filter.register('after_generate', function() {
  const fs = require('fs');
  const path = require('path');
  const file = path.join(hexo.public_dir, 'js', 'utils.js');

  if (!fs.existsSync(file)) return;

  let content = fs.readFileSync(file, 'utf-8');

  // 移除: zoomIn, zoomOut, toggle1to1, rotateCCW（两个版本分支都需要处理）
  const target = "'zoomIn','zoomOut','toggle1to1','rotateCCW',";
  content = content.replaceAll(target, '');

  fs.writeFileSync(file, content);
});
