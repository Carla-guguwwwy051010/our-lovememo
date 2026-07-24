# Our Lovememo

一个移动优先的多人关系记忆空间 App 原型，基于 React + Vite + Tailwind CSS 构建，整体采用韩系治愈手账风与拼贴贴纸视觉语言。

## 项目简介

Our Lovememo 目前是一个前端原型项目，聚焦于亲密关系中的共同回忆、空间设置、头像与成员管理、偏好记录、心愿瓶等体验设计。

当前版本包含：

- `Our Home` 首页与双人互动视图
- 回忆列表、回忆详情、新增/编辑/删除记忆
- 星愿瓶新增/编辑/删除/完成状态
- 抽屉菜单中的空间切换、关系设置、陪伴角色、成员卡、头像管理、个人资料编辑

## 技术栈

- React 18
- Vite 5
- Tailwind CSS 3
- PostCSS + Autoprefixer

## 本地运行

```bash
npm install
npm run dev
```

默认本地开发地址通常为：

```bash
http://localhost:5173
```

## 生产构建

```bash
npm run build
npm run preview
```

## 项目结构

```text
our-lovememo-prototype/
├─ public/
│  └─ images/              # 头像与陪伴角色图片素材
├─ src/
│  ├─ components/          # 抽屉、弹窗、按钮、卡片、愿望瓶等组件
│  ├─ data/                # 原型模拟数据
│  ├─ pages/               # 首页、回忆页、详情页、星愿瓶页
│  ├─ utils/               # 工具函数
│  ├─ App.jsx              # 页面状态与交互编排
│  ├─ index.css            # 全局样式与 Tailwind 入口
│  └─ main.jsx             # 应用挂载入口
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## 当前数据说明

- 当前为纯前端原型
- 数据主要来自本地静态数据与组件状态
- 暂未接入数据库
- 暂未接入用户登录系统

## 部署到 Vercel

这个项目可以直接作为 Vite 项目部署到 Vercel，无需额外改造。

### 方法一：通过 GitHub 导入

1. 把整个 `our-lovememo-prototype` 目录上传到 GitHub 仓库
2. 登录 [Vercel](https://vercel.com/)
3. 选择 `Add New Project`
4. 导入你的 GitHub 仓库
5. 保持默认识别即可，Vercel 会自动识别为 Vite 项目
6. 点击 `Deploy`

### 推荐构建配置

如果 Vercel 需要你手动填写，可使用以下配置：

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## 开源发布建议

在发布到 GitHub 前，建议确认：

- 已忽略 `node_modules`、`dist`、`.vercel` 等目录
- 仓库根目录就是 `our-lovememo-prototype`
- 首页截图、产品预览图可补充到仓库说明中
- 如后续接入 Supabase，可在 README 中新增环境变量说明

## 说明

- 当前项目没有使用第三方路由，页面切换主要通过本地状态控制
- 图片素材位于 `public/images/`
- 若图片不可用，会自动回退为占位头像
- 桌面浏览器下会以移动端原型方式居中展示
