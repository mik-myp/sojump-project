# Sojump 问卷调查系统

<p align="center">
  <img src="./back-manage/public/sojump.jpg" alt="Sojump Logo" width="120" />
</p>

<p align="center">
  一款现代化的问卷调查系统，基于React和NestJS构建
</p>

## 项目简介

Sojump 是一个功能完整的问卷调查系统，允许用户创建、发布和管理各种类型的问卷调查。系统采用前后端分离架构，前端使用 React 构建，后端使用 NestJS 提供 RESTful API 服务。

## 目录结构（简要）

-   `back-manage/`：前端项目（React + TypeScript + Vite）
-   `service-manage/`：后端项目（NestJS）

## 使用的技术栈

-   前端（back-manage）

    -   React, TypeScript, Vite
    -   UI：Ant Design
    -   样式：Tailwind CSS
    -   路由：React Router
    -   状态管理：Zustand
    -   常用库：@dnd-kit、ahooks、axios

-   后端（service-manage）

    -   NestJS, TypeScript
    -   数据库：MongoDB + Mongoose
    -   认证：JWT
    -   文档：Swagger

-   开发/工具链
    -   代码检查：ESLint
    -   代码格式化：Prettier
    -   包管理/运行：npm / Node.js
    -   测试：Jest (后端 e2e 示例)

## 快速开始（本地开发）

先克隆项目并安装根依赖：

```bash
git clone <repository-url>
cd sojump-project
npm install
```

启动后端（开发模式）：

```bash
cd service-manage
npm install
npm run start:dev
```

默认后端地址：`http://localhost:3000`

在另一个终端启动前端：

```bash
cd back-manage
npm install
npm run dev
```

默认前端地址：`http://localhost:5173`

如果你只想启动前端（通常本地用 mock 或已连接后端），进入 `back-manage` 并运行 `npm run dev` 即可。

## 常用脚本

-   根目录：
    -   `npm install`：安装根依赖（如果需要）
-   `back-manage`：
    -   `npm run dev`：启动前端开发服务器
    -   `npm run build`：构建前端生产包
    -   `npm run lint`：运行 ESLint（如果在 package.json 中配置）
    -   `npm run format`：运行 Prettier 格式化（如果在 package.json 中配置）
-   `service-manage`：
    -   `npm run start:dev`：启动后端开发服务器
    -   `npm run build`：构建后端生产包
    -   `npm run start:prod`：以生产方式运行后端

## 开发说明与约定

-   前端主要技术：React、TypeScript、Vite、Ant Design、Tailwind、Zustand。
-   后端主要技术：NestJS、Mongoose（MongoDB）、JWT 验证。
-   状态管理：使用 `Zustand` 在 `back-manage/src/store` 维护简易的问卷编辑状态。

## 调试与验证

-   开发时建议在浏览器打开 `http://localhost:5173` 并在控制台观察前端日志。
-   如果遇到路由或 API 错误，请确认 `service-manage` 是否已启动并正常连接。

## 常见问题

-   启动报错或依赖问题：尝试删除 `node_modules` 并重新安装（`npm ci` 或 `npm install`）。
-   端口冲突：修改对应服务的端口或停止占用端口的进程。

## 贡献与规范

-   欢迎提交 PR，请保持代码风格和提交信息清晰。
-   建议在提交前运行 `npm run lint` 和 `npm run format`（各子项目中可能存在脚本）。

## 许可

本项目供学习和参考使用，具体使用请遵循团队及组织的许可要求。

构建产物将位于 `back-manage/dist/` 目录中，可以部署到任何静态文件服务器上。
