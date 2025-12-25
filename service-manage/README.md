# service-manage（后端）

本目录为 Sojump 项目的后端服务，基于 NestJS 开发，负责 API、认证与数据持久化。

## 先决条件

- Node.js >= 16
- npm
- MongoDB（本地或远程实例）

## 配置

- 核心连接与密钥在 `config/index.ts` 中管理：`mongodbUrl`、`mongodbDbName`、`secret`。
- 运行端口可通过环境变量 `PORT` 覆盖，默认 `8888`。
- 若需按环境拆分配置，可新增 `.env` 并在 `config/index.ts` 内读取。

## 快速启动（本地开发）

1. 进入后端目录并安装依赖：

```bash
cd service-manage
npm install
```

2. 按需调整 `config/index.ts` 后启动开发服务：

```bash
npm run start:dev
```

3. 默认服务地址：`http://localhost:8888`，Swagger 文档：`http://localhost:8888/docs`。

## 构建与运行（生产）

```bash
npm run build
PORT=8888 npm run start:prod
```

（按需设置 `PORT` 与数据库/JWT 配置）

## 数据与认证

- 使用 MongoDB（Mongoose）进行数据持久化。
- 用户密码写入时经 md5 + 固定前缀散列，登录时按散列值校验。
- 认证使用 JWT（密钥取自 `config/index.ts`），前端通过 `token` 请求头传递。

## 测试

后端包含 Jest 测试脚手架，可运行：

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
- 妥善管理配置与密钥（Vault、Kubernetes Secrets 等），并监控 MongoDB 连接状态。

## 贡献

- 提交 PR 前请运行测试，确保不破坏现有接口。
