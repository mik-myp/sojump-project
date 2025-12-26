# Sojump 问卷调查系统

现代化的问卷系统，前后端分离：前端管理端（编辑器/管理台）、答题端，以及 NestJS 提供的后端 API。

## 子项目

-   `back-manage/`：前端管理端（React + Vite）
-   `answer-manage/`：问卷答题端（Next.js App Router）
-   `service-manage/`：后端服务（NestJS + MongoDB）

## 技术栈

-   前端：React、TypeScript、Ant Design、Tailwind CSS、ahooks、Zustand
-   后端：NestJS、TypeScript、MongoDB (Mongoose)、JWT、Swagger
-   构建/工具：Vite、Next.js、ESLint、Prettier、Jest（后端示例）

## 快速开始（本地）

1. 克隆并安装根依赖（子项目需单独安装依赖）：

```bash
git clone <repository-url>
cd sojump-project
```

2. 启动后端（默认端口 8888，Swagger `/docs`）：

```bash
cd service-manage
npm install
npm run start:dev
```

3. 启动前端管理端（默认端口 5173，`/api` 代理到 8888）：

```bash
cd back-manage
npm install
npm run dev
```

4. 启动答题端（默认端口 3000，直连后端接口）：

```bash
cd answer-manage
npm install
npm run dev
```

## 环境变量

-   `back-manage`：`VITE_BASE_API`（默认 `/api`，由 Vite 代理到 `http://localhost:8888`）
-   `answer-manage`：`NEXT_PUBLIC_SERVICE_BASE_URL`（默认 `http://localhost:8888`）
-   `service-manage`：端口可用 `PORT` 覆盖（默认 8888）；Mongo/JWT 配置见 `service-manage/config/index.ts`

本地开发示例：

```
# answer-manage/.env.local
NEXT_PUBLIC_SERVICE_BASE_URL=http://localhost:8888
```

## 常用脚本

-   back-manage：`npm run dev` / `build` / `preview` / `lint`
-   answer-manage：`npm run dev` / `build` / `start` / `lint`
-   service-manage：`npm run start:dev` / `build` / `start:prod` / `test`

## 目录概览

-   `back-manage/src`：管理端页面、组件、状态（Zustand）、网络请求。
-   `answer-manage/app`：答题端页面；`components/QuestionComponents` 渲染题型；`types/` 类型定义。
-   `service-manage/src`：NestJS 模块（用户/问卷/答卷）、守卫与配置。

## 调试与提示

-   访问管理端 `http://localhost:5173`；发布问卷后在答题端访问 `http://localhost:3000/question/<id>` 填写。
-   后端已开启 CORS；开发环境前端通过代理或直接配置后端地址。
-   确保 MongoDB 可用，`service-manage/config/index.ts` 中的地址/库名正确。

## 贡献

-   欢迎 Issue / PR。
