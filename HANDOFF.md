# 玻璃球 Blog — 项目交接文档

## 基本信息

| 项目 | 详情 |
|------|------|
| 博客名称 | 玻璃球 |
| 作者 | blq |
| 域名 | https://blqblog.vercel.app |
| 框架 | Hexo 7.3.0 |
| 主题 | Butterfly 5.5.4 |
| 代码仓库 | https://github.com/baoleqiu/blq_blog |
| 部署平台 | Vercel（自动部署，push 即上线） |

## 目录结构

```
my-blog/
├── _config.yml              # Hexo 主配置
├── _config.butterfly.yml    # Butterfly 主题配置
├── package.json             # 依赖与脚本
├── .gitignore               # Git 忽略规则
├── scripts/
│   ├── auto-gallery.js      # 自动相册：从文章提取图片
│   └── inject-css.js        # CSS/JS 注入（动画、样式、文字替换）
├── scaffolds/               # 文章模板
│   ├── post.md
│   ├── draft.md
│   └── page.md
├── source/
│   ├── _posts/              # 文章目录
│   │   ├── Japan.md         # 分类：旅行
│   │   ├── cute.md          # 分类：女朋友
│   │   └── 毕业.md          # 分类：生活
│   ├── img/                 # 图片资源
│   │   ├── kyoto.JPG        # 首页大图 + 网站背景
│   │   ├── 坐1.jpg, 坐2.jpg
│   │   ├── 东京大学.jpg, 夕阳东京塔.jpg, 罗森富士山.jpg
│   │   └── 班级.jpg
│   └── categories/          # （已删除，由生成器自动创建）
└── themes/                  # 主题目录（空，使用 npm 包）
```

## 已完成功能

### 主题外观
- [x] Butterfly 主题，侧边栏在左侧
- [x] 导航栏：主页 / 归档 / 分类 / 相册（中文显示）
- [x] 首页顶部大图：Kyoto 照片
- [x] 网站全局背景：Kyoto 照片
- [x] 页脚透明
- [x] 头像：GitHub 头像，禁用旋转动画
- [x] 社交图标：GitHub，禁用旋转动画
- [x] 公告栏已关闭
- [x] 首页副标题已关闭
- [x] 日期格式：`YYYY年M月D日`（精确到目），文字「记录于」

### 文章功能
- [x] 3 篇文章（Japan / cute / 毕业）
- [x] 文章封面图支持
- [x] 分类功能（旅行 / 女朋友 / 生活）
- [x] 分类页面正常访问（不再 404）
- [x] 标签功能已移除（导航栏和侧边栏均已隐藏）

### 相册
- [x] 自动相册：写文章时插入的图片自动汇总到 `/photos/`
- [x] 按年月分组显示
- [x] 固定比例缩略图（4:3 网格布局）
- [x] 点击放大（Fancybox 灯箱，窗口模式 + 圆角阴影）

### 部署
- [x] Vercel 自动部署（GitHub push → 自动构建上线）
- [x] `.gitignore` 已配置（排除 node_modules / public / db.json）

## 日常操作

### 写新文章
```bash
npx hexo new "文章标题"
# 编辑 source/_posts/文章标题.md
# 在 --- 之间设置 cover、categories 等
```

### 添加图片
1. 把图片放到 `source/img/` 目录
2. 文章中引用：`![描述](/img/文件名.jpg)`
3. 相册会自动收录

### 提交部署
```bash
git add -A
git commit -m "描述改动"
git push origin main
# Vercel 自动部署，1-2 分钟后生效
```

## 注意事项

1. **不要用 `\---`**：文章 front-matter 分隔符是 `---`，不要加反斜杠
2. **图片大小写**：Linux 区分大小写，确保文件名大小写一致（如 `.jpg` vs `.JPG`）
3. **不要提交 public 目录**：`.gitignore` 已配置，但手动 `git add -A` 不会误加
4. **不要删除 node_modules**：`npm install` 重新安装即可
5. **Vercel 构建命令**：使用 `node node_modules/hexo-cli/bin/hexo generate`（避免权限问题）
6. **灯箱注意**：Butterfly 使用 Fancybox v6，工具栏按钮修改较复杂，已保持默认

## 主题探索历程

```
Landscape → Butterfly → NexT → Fluid → Icarus → ShokaX → Icarus → Butterfly 🦋
```

最终选定 Butterfly：功能全、颜值高、中文社区好、Vercel 部署稳定。
