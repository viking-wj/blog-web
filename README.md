# blog-web

使用 Vue 3、TypeScript 与 Vite 构建的个人博客前端。

## 本地开发

```bash
npm install
npm run dev
```

复制 `.env.example` 为 `.env.local`，按需修改接口地址：

```env
VITE_API_BASE_URL=/api
VITE_APP_TITLE=W 的小站
```

## 质量检查

```bash
npm run typecheck
npm run lint
npm run build
npm run check
```

`npm run build` 会先进行完整的 Vue/TypeScript 类型检查。

## 目录结构

```text
src/
├─ components/     # 跨业务复用组件
├─ features/       # articles、comments 等业务切片
├─ router/         # 路由与页面元信息
├─ shared/         # API、配置、工具与通用能力
├─ style/          # 设计系统与全局样式
└─ views/          # 路由页面
```

详细的优化背景、迁移阶段和验收标准见 [重构方案](docs/REFACTORING.md)。
