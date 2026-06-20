# 玻璃球 Blog — 项目交接文档

## 基本信息

| 项目 | 详情 |
|------|------|
| 博客名称 | 玻璃球 |
| 作者 | blq |
| 域名 | https://blqblog.cn |
| 旧域名 | https://blqblog.vercel.app |
| 框架 | Hexo 7.3.0 |
| 主题 | Butterfly 5.5.4 |
| 代码仓库 | https://github.com/baoleqiu/blq_blog |
| 部署平台 | Vercel（自动部署，push 即上线） |
| DNS | Cloudflare（橙色云朵代理） |

## 目录结构

```
my-blog/
├── _config.yml              # Hexo 主配置
├── _config.butterfly.yml    # Butterfly 主题配置
├── package.json             # 依赖与脚本
├── .gitignore               # Git 忽略规则
├── vercel.json              # Vercel 构建配置
├── 文章模板.md              # 新文章模板
├── HANDOFF.md               # 本文件
├── scripts/
│   ├── auto-gallery.js      # 自动相册生成器
│   ├── fix-page-type.js     # 修复页面类型误判（标签/相册页）
│   ├── inject-css.js        # CSS/JS 注入（动画、样式、文字替换、音乐播放器）
│   └── music-playlist.js    # 音乐播放列表自动生成
├── source/
│   ├── _posts/              # 8 篇文章
│   │   ├── Japan.md
│   │   ├── cute.md
│   │   ├── 毕业.md
│   │   ├── 缘分.md
│   │   ├── 我相信命定论.md
│   │   ├── 幸福是猫尾巴.md
│   │   ├── 世界上最幸福的时刻之一.md
│   │   └── 《霍乱时期的爱情》321页.md
│   ├── _data/
│   │   └── widget.yml       # 侧边栏自定义 widget（预留）
│   ├── categories/
│   │   └── index.md         # 分类首页
│   ├── tags/
│   │   └── index.md         # 标签首页
│   ├── css/
│   │   └── bounce.css       # Pace 加载动画样式（已停用）
│   ├── img/                 # 图片资源（按文章分文件夹）
│   │   ├── violet.jpg       # 首页大图 + 网站全局背景
│   │   ├── Japan/           # 东京大学.jpg, 夕阳东京塔.jpg, 罗森富士山.jpg, kyoto.JPG
│   │   ├── cute/            # 坐1.jpg, 坐2.jpg
│   │   ├── 毕业/            # 班级.jpg
│   │   ├── 缘分/            # 缘分.jpg
│   │   └── 霍乱时期的爱情/   # 321页.jpg
│   └── music/
│       └── Soul Power Live 陶喆现场原音专辑/   # 28 首 MP3
└── themes/                  # 主题目录（空，使用 npm 包）
```

## 已安装插件

| 插件 | 用途 |
|------|------|
| hexo-generator-searchdb | 本地搜索数据生成 |
| hexo-wordcount | 全站字数统计 |

## 已完成功能

### 主题外观
- [x] Butterfly 主题，侧边栏在**右侧**
- [x] 导航栏：主页 / 归档 / 标签 / 分类 / 相册（带搜索按钮）
- [x] 首页顶部大图：violet.jpg
- [x] 网站全局背景：violet.jpg
- [x] 页脚透明
- [x] 头像：GitHub 头像，禁用旋转
- [x] 社交图标：GitHub，禁用旋转
- [x] 公告栏已关闭
- [x] 首页副标题已关闭
- [x] 日期格式「记录于 YYYY年M月D日」
- [x] header/footer 背景蒙版已关闭
- [x] 背景图淡入动画已关闭（立即显示）
- [x] 卡片半透明磨砂效果（日间 `rgba(255,255,255,0.75)`，夜间 `rgba(18,18,18,0.85)`）
- [x] 加载动画已关闭
- [x] 滚动百分比已关闭

### 顶部图配置
- [x] 首页：`index_img: /img/violet.jpg`
- [x] 归档/分类/标签/相册/文章内页：`top_img: transparent`
- [x] 非首页 header 标题垂直居中

### 文章功能
- [x] 8 篇文章，6 个分类
- [x] 文章封面图显示在首页卡片
- [x] 首页摘要方法 `method: 2`（优先 `description` 字段）
- [x] 文章内页顶部透明（`top_img: transparent`），封面仅用于首页
- [x] 文章正文字体颜色 `#333`

### 标签与分类
- [x] 标签页面正常访问（手动创建 `source/tags/index.md`）
- [x] 分类页面正常访问（手动创建 `source/categories/index.md`）
- [x] 分类/标签子页面顶部图透明
- [x] 页面类型误判修复（`fix-page-type.js` 覆盖 `getPageType`）

### 相册
- [x] 自动相册：Markdown 图片语法自动汇总到 `/photos/`
- [x] HTML img 标签图片不会被收录（已改用 `<div>` 包裹 Markdown 语法实现居中+收录）

### 搜索
- [x] 本地搜索已启用（`hexo-generator-searchdb`）

### 音乐播放器
- [x] 左下角固定 APlayer，播放本地 28 首陶喆 Soul Power Live MP3
- [x] 按专辑曲目顺序排序，自动去除「陶喆 - 」前缀
- [x] 支持文件夹内 `cover.jpg` 作为专辑封面
- [x] 使用 `inject.bottom` 注入，Pjax 已开启防止切换中断

### 部署
- [x] Vercel 自动部署（GitHub push → 自动构建上线）
- [x] DNS：阿里云购买 .cn 域名 → Cloudflare 管理 DNS（橙色代理）
- [x] `.gitignore` 已配置

### 图片管理
- [x] 图片已按文章分文件夹整理
- [x] 图片居中：`<div style="width: 300px; margin: 0 auto; text-align: center;">`

## 日常操作

### 写新文章
1. 复制 `文章模板.md`，重命名
2. 编辑 front-matter：`title`, `date`, `categories`, `tags`, `top_img: transparent`, `cover`, `description`
3. Markdown 写正文
4. 图片放 `source/img/文章名/`
5. 如需居中+相册收录：`<div style="width: 300px; margin: 0 auto; text-align: center;">![描述](/img/文章名/图片.jpg)</div>`

### 添加音乐
把 MP3 放 `source/music/`，自动加入播放列表。放 `cover.jpg` 作为专辑封面。

### 部署
```bash
cd E:\my-blog
git add -A && git commit -m "描述" && git push
```

## 注意事项

1. Front-matter 格式：`top_img` 要顶格写，不要缩进到 `tags` 下面
2. `date` 格式：`2024-01-18`，不要加花括号
3. 图片用 Markdown 语法（`![]()`）相册才能自动收录
4. 有大量图片的文章务必填 `description` 字段（防止 gallery JSON 泄露到首页摘要）
5. 不要用 `{% gallery %}` 标签（与摘要系统冲突）
6. 音乐文件较大（28首），Git 仓库已膨胀

---

## 下一步：迁移到 Astro + Firefly

### 为什么迁移
- Astro 构建更快，输出更轻量
- Firefly 主题功能更现代（双侧边栏、分享海报等）
- 热更新开发体验更好
- 音乐文件可分离到 OSS，仓库不再臃肿

### 迁移计划

| 阶段 | 内容 | 状态 |
|------|------|------|
| 1 | 初始化 Astro + Firefly 项目 | ⬜ 待做 |
| 2 | 批量转换 8 篇文章的 front-matter 格式 | ⬜ 待做 |
| 3 | 迁移图片到 OSS 或 `public/images/` | ⬜ 待做 |
| 4 | 迁移音乐文件到 OSS | ⬜ 待做 |
| 5 | 配置主题参数（颜色、导航、侧边栏） | ⬜ 待做 |
| 6 | 部署到 Vercel，绑定 blqblog.cn | ⬜ 待做 |
| 7 | 确认无误后切换域名到新项目 | ⬜ 待做 |

### Front-matter 格式变化

| Hexo | Astro Firefly |
|------|------|
| `date:` | `published:` |
| `categories:` (单值) | `category:` (单值) |
| `cover:` | `image:` |
| `top_img: transparent` | 不需要（主题默认无顶部图） |
| `description:` | `description:` (相同) |
| `tags:` | `tags:` (相同) |

### 注意事项
- 迁移后新旧项目并行运行，确认无误再切换域名
- 旧 Hexo 仓库保留不动，随时可回退
- OSS 可用于存放图片和音乐，减轻仓库体积
