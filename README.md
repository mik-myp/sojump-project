# Sojump 问卷调查系统

<p align="center">
  <img src="https://example.com/logo.png" alt="Sojump Logo" width="120" />
</p>

<p align="center">
  一款现代化的问卷调查系统，基于React和NestJS构建
</p>

## 项目简介

Sojump 是一个功能完整的问卷调查系统，允许用户创建、发布和管理各种类型的问卷调查。系统采用前后端分离架构，前端使用 React 构建，后端使用 NestJS 提供 RESTful API 服务。

## 技术栈

### 前端 (back-manage)
- [React](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，添加了静态类型定义
- [Vite](https://vitejs.dev/) - 快速的构建工具
- [Ant Design](https://ant.design/) - React UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [React Router](https://reactrouter.com/) - React 应用的声明式路由
- [Zustand](https://github.com/pmndrs/zustand) - 状态管理解决方案

### 后端 (service-manage)
- [NestJS](https://nestjs.com/) - 用于构建高效、可扩展的 Node.js 服务器端应用程序的框架
- [MongoDB](https://www.mongodb.com/) - NoSQL 数据库
- [Mongoose](https://mongoosejs.com/) - MongoDB 对象建模工具
- [JWT](https://jwt.io/) - JSON Web Token 实现身份验证
- [Swagger](https://swagger.io/) - API 文档生成工具

## 项目结构

```
sojump-project/
├── back-manage/           # 前端管理系统
│   ├── src/               # 源代码
│   │   ├── components/    # 公共组件
│   │   ├── layout/        # 页面布局
│   │   ├── pages/         # 页面组件
│   │   ├── router/        # 路由配置
│   │   ├── service/       # API服务
│   │   ├── store/         # 状态管理
│   │   └── utils/         # 工具函数
│   └── ...
├── service-manage/        # 后端服务
│   ├── src/               # 源代码
│   │   ├── user/          # 用户模块
│   │   ├── common/        # 公共模块
│   │   └── main.ts        # 入口文件
│   └── ...
└── ...
```

## 环境要求

- Node.js >= 16.x
- npm 或 yarn
- MongoDB >= 4.x

## 快速开始

### 克隆项目

```bash
git clone <repository-url>
cd sojump-project
```

### 安装依赖

```bash
npm install
```

### 启动后端服务

```bash
cd service-manage
npm run start:dev
```

默认情况下，后端服务将在 `http://localhost:3000` 上运行。

### 启动前端应用

```bash
cd back-manage
npm run dev
```

默认情况下，前端应用将在 `http://localhost:5173` 上运行。

## 开发指南

### 代码格式化

项目使用 Prettier 进行代码格式化，可以通过以下命令格式化所有代码：

```bash
npm run format
```

### 代码检查

项目使用 ESLint 进行代码检查，可以通过以下命令检查代码：

```bash
npm run lint
```

### Git 提交规范

项目使用 husky 配置了 git hooks，在每次提交前会自动格式化和检查代码。

## 部署

### 前端部署

构建生产版本：

```bash
cd back-manage
npm run build
```

构建产物将位于 `back-manage/dist/` 目录中，可以部署到任何静态文件服务器上。

### 后端部署

构建生产版本：

```bash
cd service-manage
npm run build
```

启动生产环境：

```bash
npm run start:prod
```

## 许可证

本项目仅供学习和参考使用。