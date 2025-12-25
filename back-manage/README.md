# back-manage（前端）

本目录包含 Sojump 问卷系统的前端管理端（编辑器、管理台），基于 React + TypeScript + Vite 开发。

## 先决条件

- Node.js >= 16
- npm 或 yarn

## 快速启动（本地开发）

1. 进入项目目录并安装依赖：

```bash
cd back-manage
npm install
```

2. 启动开发服务器（默认端口 5173，`/api` 由 Vite 代理到后端 8888）：

```bash
npm run dev
```

3. 构建生产包：

```bash
npm run build
```

4. 本地预览构建产物：

```bash
npm run preview
```

## 环境变量

前端使用 Vite，支持通过 `.env` 文件注入变量，常用：

- `VITE_BASE_API` - 后端 API 根地址。开发默认 `/api`，由 `vite.config.ts` 代理到 `http://localhost:8888`；部署时可改为真实地址（如 `https://api.example.com`）。

示例 `.env`：

```
VITE_BASE_API=/api
```

## 常用脚本

- `npm run dev`：启动开发服务器
- `npm run build`：构建生产包
- `npm run preview`：预览生产包
- `npm run lint`：运行 ESLint（如配置）
- `npm run format`：运行 Prettier（如配置）

（如果 package.json 中无某些脚本，请按项目实际脚本执行）

## 开发调试建议

- 确保后端服务 `service-manage` 在本地启动并且 `VITE_BASE_API` 指向正确地址（默认 `/api` 代理到 8888）。
- 可在浏览器打开 `http://localhost:5173` 进行调试。控制台可查看网络请求与日志。
- 常见热更新、样式问题请检查 Tailwind 与 PostCSS 配置。

## 技术栈（前端）

- React, TypeScript, Vite
- Ant Design, Tailwind CSS
- @dnd-kit（拖拽）、ahooks、axios
- Zustand（状态管理）

## 贡献

- 请在提交前运行 `npm run lint` 与 `npm run format`（若已配置）。
- 遇到问题欢迎提交 Issue 或 PR，保持分支与提交信息清晰。

## 其它

如需在不同环境运行或调试某些功能（Mock、代理等），可查看 `vite.config.ts` 中的 proxy 配置或新增 `.env` 文件覆盖 `VITE_BASE_API`。
