# API 设计

## 用户功能

### 获取用户信息

- method `get`
- path `/api/user/info`
- response `{ code: 0, data: {...} }` 或 `{ code: 10001, msg: 'xxx' }`

### 注册

- method `post`
- path `/api/user/register`
- request body `{ username, password }`
- response `{ code: 0 }`

### 登录

- method `post`
- path `/api/user/login`
- request body `{ username, password }`
- response `{ code: 0, data: { token } }` —— **JWT** 使用 token

## 问卷功能

根据用户Id获取该用户的问卷列表，对问卷的操作也是对当前用户的问卷进行操作，不会影响其他用户的问卷

### 创建问卷

- method `post`
- path `/api/question`
- request body - 无 （点击一个按钮即可创建，title 自动生成）
- response `{ code: 0, data: { id } }`

### 获取单个问卷

- method `get`
- path `/api/question/:id`
- response `{ code: 0, data: { id, title ... } }`

### 获取问卷列表

- method `get`
- path `/api/question`
- response: `{ code: 0, data: { list: [ ... ], total } }`

### 更新问卷信息

- method `patch`
- path `/api/question/:id`
- request body `{ title, isStar ... }` （之前忘记了，现补上）
- response: `{ code: 0 }`

PS：删除是`假删除`，实际是更新 `isDeleted` 属性

### 批量彻底删除问卷

- method `delete`
- path `/api/question`
- request body `{ ids: [ ... ] }`
- response: `{ code: 0 }`

### 复制问卷

- method `post`
- path `/api/question/duplicate/:id`
- response: `{ code: 0, data: { id } }`
