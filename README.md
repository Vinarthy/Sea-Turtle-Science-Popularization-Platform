# VUE_express_VR

一个以海龟保护科普为主题的 WebVR 全栈项目。项目使用 Vue3 构建前端页面，Express 提供后端接口与静态资源服务，FastAPI + YOLO 提供海龟图片识别能力，并集成 Unity WebGL 场景实现沉浸式 VR 展示。

## 项目简介

本项目面向海洋生物保护科普场景，围绕海龟的物种分类、生命周期、栖息地、保护现状和 VR 场景体验进行展示。用户可以浏览科普文章、查看图片与视频资料、进入 WebVR 海洋场景，并上传海龟图片进行 AI 识别。

## 技术栈

- 前端：Vue3、TypeScript、Vite、Vue Router、Pinia
- 后端：Node.js、Express、MySQL、JWT、Cookie、Multer
- AI 服务：FastAPI、YOLO、Uvicorn、SQLite
- 可视化与交互：ECharts、Leaflet、Three.js、Unity WebGL
- 工程化：ESLint、Prettier、Vitest、Playwright

## 功能模块

- 首页展示：海龟主题介绍、轮播图、生命周期展示、视频展示
- 用户认证：注册、登录、退出登录、Cookie/JWT 鉴权、路由守卫
- VR 体验：集成 Unity WebGL 构建产物，通过网页嵌入 VR 场景
- AI 识别：上传海龟图片，调用 YOLO 服务返回识别类别、置信度和结果图
- 历史记录：保存并展示最近的图片识别记录
- 海龟分类：展示不同海龟物种的图片与介绍信息
- 栖息地展示：结合地图和图表展示海龟分布、生活环境等信息
- 保护科普：展示海龟保护文章、保护措施和相关图片资源
- 文章详情：支持文章列表与详情页跳转展示

## 目录结构

```text
VUE_express_VR
├─ src                 # Vue 前端源码
│  ├─ components       # 公共组件
│  ├─ pages            # 页面组件
│  ├─ router           # 前端路由
│  ├─ lib              # 数据与工具文件
│  └─ Style            # 全局样式
├─ Server              # Express 后端服务
│  ├─ Controll         # 控制器
│  ├─ data             # 文章数据
│  ├─ public           # 静态资源与 Unity WebGL 产物
│  └─ server.js        # 后端入口
├─ ai-service          # FastAPI + YOLO 识别服务
├─ public              # 前端静态资源
├─ videos              # 视频资源
└─ dist                # 前端构建产物
```

## 环境准备

请先安装以下环境：

- Node.js 20.19+ 或 22.12+
- MySQL
- Python 3.10+

## 前端运行

```bash
npm install
npm run dev
```

前端默认运行在：

```text
http://localhost:5173
```

## 后端运行

后端入口位于 `Server/server.js`，默认端口为 `3000`。

```bash
node Server/server.js
```

后端主要负责：

- 用户注册、登录、退出
- JWT/Cookie 身份认证
- AI 识别接口转发
- 文章接口
- 视频、图片、Unity WebGL 静态资源托管

## AI 服务运行

AI 服务位于 `ai-service` 目录，默认运行在 `8000` 端口。

```bash
cd ai-service
python app.py
```

AI 服务提供：

- `POST /detect`：上传图片并返回识别结果
- `GET /history`：获取最近识别历史
- `/uploads`：访问识别后的结果图片

## 数据库配置

Express 后端使用 MySQL，配置文件位于：

```text
Server/db.js
```

默认配置如下：

```js
host: 'localhost'
user: 'root'
database: 'turtle_app'
```

运行项目前请根据本地 MySQL 环境修改数据库账号、密码和数据库名称。

AI 服务使用 SQLite 保存识别历史，数据库文件位于：

```text
ai-service/turtle_ai.db
```

## 常用命令

```bash
npm run dev          # 启动前端开发服务
npm run build        # 构建前端项目
npm run preview      # 预览构建结果
npm run type-check   # TypeScript 类型检查
npm run lint         # ESLint 检查与修复
npm run test:unit    # 单元测试
npm run test:e2e     # 端到端测试
```

## 项目亮点

- 前后端分离架构，页面展示、接口服务和 AI 推理服务职责清晰
- 集成 Unity WebGL，实现网页端 VR 场景体验
- 接入 YOLO 图像识别流程，支持图片上传、结果图展示和历史记录查询
- 使用 ECharts、Leaflet、Three.js 等工具增强数据展示和交互体验
- 结合海龟保护主题，完成科普内容、媒体资源和智能识别功能的整合

## 访问说明

完整运行项目时，建议同时启动三个服务：

```text
前端服务： http://localhost:5173
后端服务： http://localhost:3000
AI 服务：  http://localhost:8000
```

前端页面通过 `/api` 请求后端，后端再根据业务需要调用 AI 服务或返回静态资源。
