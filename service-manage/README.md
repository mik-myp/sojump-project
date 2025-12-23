# service-manage（后端）

本目录为 Sojump 项目的后端服务，基于 NestJS 开发，负责 API、认证与数据持久化。

## 先决条件

- Node.js >= 16
- npm
- MongoDB（本地或远程）

## 快速启动（本地开发）

1. 进入后端目录并安装依赖：

```bash
cd service-manage
npm install
```

2. 配置环境变量：复制 `.env.example` 为 `.env`，设置如下常用项：

- `MONGO_URI`（MongoDB 连接字符串）
- `JWT_SECRET`（JWT 密钥）
- `PORT`（可选，默认 3000）

3. 启动开发服务器：

```bash
npm run start:dev
```

默认后端地址：`http://localhost:3000`

## 构建与运行（生产）

```bash
npm run build
npm run start:prod
```

## 数据库与迁移

- 本项目使用 MongoDB（Mongoose）进行数据持久化。确保 `MONGO_URI` 可用。
- 如需初始化或种子数据，可在项目中添加脚本（例如 `scripts/seed.ts`）。

## 测试

- 后端可能包含 Jest 集成测试或 e2e 示例，运行：

```bash
npm run test
npm run test:e2e
```

## 技术栈（后端）

- NestJS, TypeScript
- MongoDB, Mongoose
- JWT（认证）
- Swagger（API 文档）

## 部署建议

- 使用容器（Docker）或进程管理（PM2）部署生产服务。
- 配置环境变量管理（如 Vault、Kubernetes Secrets 等）以保护敏感信息。

## 贡献

- 提交 PR 前请运行测试并确保没有破坏现有接口。
