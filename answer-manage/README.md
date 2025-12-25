# answer-manage（问卷答题前端）

轻量的问卷答题端，基于 Next.js App Router + Ant Design。通过后端开放接口获取问卷结构并渲染，提交后写入答卷。

## 快速开始

前置：Node.js ≥ 18.18（Next.js 16 要求），npm。

```bash
npm install
npm run dev    # 默认 http://localhost:3000
```

构建/生产：

```bash
npm run build
npm run start  # 使用构建产物，支持配置 PORT
```

代码检查：`npm run lint`

## 环境变量

- `NEXT_PUBLIC_SERVICE_BASE_URL`：后端服务地址，默认 `http://localhost:8888`。接口依赖：
  - `GET /questionNoAuth/:id` 获取问卷（公开）
  - `POST /answer/:id` 提交答卷

开发示例（.env.local）：

```
NEXT_PUBLIC_SERVICE_BASE_URL=http://localhost:8888
```

## 主要页面

- `/question/[id]`：服务端获取问卷（禁用缓存），客户端渲染答题表单并提交。
- `/question/success`：提交成功页。
- `/`：入口提示用户使用正确问卷链接。

## 技术栈

- Next.js 16（App Router）、React 19
- Ant Design 6（@ant-design/nextjs-registry 处理 SSR/样式注入）
- Tailwind CSS 4（全局样式 `app/globals.css`）
- TypeScript

## 目录概览

- `app/`：Next App Router 页面与布局。
  - `layout.tsx`：全局字体、Antd 注册。
  - `question/[id]/`：动态问卷答题页及客户端组件。
  - `question/success/`：提交成功页。
- `components/QuestionComponents/`：根据后端数据类型渲染的题目组件（标题、输入框等）。
- `types/`：问卷与组件类型定义。

## 部署提示

- 确保后端已开放跨域（项目默认已在后端开启 `enableCors`）。
- 部署时设置 `NEXT_PUBLIC_SERVICE_BASE_URL` 指向真实后端。
- 如需自定义题型，扩展 `components/QuestionComponents` 并在渲染映射中注册。
