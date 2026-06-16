const fs = require('fs');
const path = require('path');

hexo.extend.injector.register('body_end', function () {
  const musicDir = path.join(hexo.source_dir, 'music');
  const songs = [];

  function scanDir(dir, prefix) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        scanDir(path.join(dir, entry.name), prefix + entry.name + '/');
      } else if (/\.(mp3|flac|wav|ogg|m4a)$/i.test(entry.name)) {
        const name = entry.name.replace(/\.[^.]+$/, '');
        songs.push({ name, url: '/music/' + prefix + entry.name, artist: '陶喆', cover: '' });
      }
    }
  }

  if (fs.existsSync(musicDir)) {
    scanDir(musicDir, '');
  }

  if (songs.length === 0) return '';

  return '<script>' +
    'window.musicPlaylist=' + JSON.stringify(songs) + ';' +
    'document.addEventListener("DOMContentLoaded",function(){' +
    'var ap=new APlayer({container:document.getElementById("aplayer"),fixed:true,autoplay:false,loop:"all",volume:0.7,audio:window.musicPlaylist});' +
    '});' +
    '</script>';
});
