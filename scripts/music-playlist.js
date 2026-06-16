const fs = require('fs');
const path = require('path');

hexo.extend.injector.register('body_end', function () {
  const musicDir = path.join(hexo.source_dir, 'music');
  const songs = [];

  // 专辑曲目顺序 (Soul Power Live)
  const trackOrder = [
    'Overture-找自己', '王八蛋', '飞机场的1030', '流沙', '二十二',
    '讨厌红楼梦', 'Talking-The Power Of Soul Power', 'Runaway',
    '组曲 望春风', 'I\'M O.K.', '黑色柳丁', 'Angel',
    '沙滩+Somewhere Over The Rainbow', '寂寞的季节', '普通朋友',
    '今天没回家', 'Melody', '月亮代表谁的心', 'Talking-My Lips Are Dry',
    '天天', '小镇姑娘', '宫保鸡丁', 'My Anata', '找自己',
    'Talking-Soul Power And You', 'Dear God', 'Talking-Epilogue', '爱，很简单'
  ];

  function getTrackIndex(filename) {
    for (let i = 0; i < trackOrder.length; i++) {
      if (filename.includes(trackOrder[i])) return i;
    }
    return trackOrder.length; // 未匹配的排最后
  }

  function cleanName(name) {
    return name.replace(/^陶喆 - /, '').replace(/ \(Live\)$/, '');
  }

  function findCover(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory() && /^cover\.(jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
        return entry.name;
      }
    }
    return null;
  }

  function scanDir(dir, prefix) {
    const coverFile = findCover(dir);
    const cover = coverFile ? '/music/' + prefix + coverFile : '';
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        scanDir(path.join(dir, entry.name), prefix + entry.name + '/');
      } else if (/\.(mp3|flac|wav|ogg|m4a)$/i.test(entry.name)) {
        const filename = entry.name.replace(/\.[^.]+$/, '');
        songs.push({
          name: cleanName(filename),
          url: '/music/' + prefix + entry.name,
          artist: '陶喆',
          cover: cover
        });
      }
    }
  }

  if (fs.existsSync(musicDir)) {
    scanDir(musicDir, '');
  }

  if (songs.length === 0) return '';

  // 按专辑曲目顺序排序
  songs.sort(function(a, b) {
    return getTrackIndex(a.url) - getTrackIndex(b.url);
  });

  return '<script>' +
    'window.musicPlaylist=' + JSON.stringify(songs) + ';' +
    'document.addEventListener("DOMContentLoaded",function(){' +
    'var ap=new APlayer({container:document.getElementById("aplayer"),fixed:true,autoplay:false,loop:"all",volume:0.7,audio:window.musicPlaylist});' +
    '});' +
    '</script>';
});
