# blog-web 优化与完整重构方案

> 文档版本：1.0  
> 审计日期：2026-07-31  
> 适用范围：当前 `blog-web` 前端仓库  
> 核心原则：先恢复可维护基线，再按业务切片渐进重构；每一阶段都可独立发布、验证和回滚。

## 0. 重构进展（2026-08 更新）

> 下文 §1「项目现状」与 §5「阶段计划」为审计时的基线描述；截至 2026-08，以下项**已完成并通过 `npm run check` 验证**（lint / 28 个单元测试 / vue-tsc typecheck / 生产构建全绿）：

- ✅ 阶段 0–1 工程健康：README 冲突标记清除；源码统一 UTF-8；单一 npm 锁文件；ESLint/Prettier 配置收敛为一份（双配置已删除）；`typecheck/lint/check` 脚本与 GitHub Actions CI 接入。
- ✅ 阶段 2 数据与安全：`Article/Author/Comment/API Response` 类型建模；Axios client 重写为 `request<T>()` 直接返回数据 + `AppError` 统一错误；重试仅限幂等方法与 408/429/502/503/504；文章 ID 规范化；Markdown 白名单消毒（拦截 script/onerror/危险 URL scheme）并附安全测试；生产环境仅 HTTPS。
- ✅ 阶段 3 业务切片：articles/comments 按 feature 组织（api/components/composables/model）；容器与展示组件拆分；`$parent/$refs`、全局 router、jQuery、Element Plus 全部移除；UI 组件迁移至 TDesign（按需样式，仅 Button 进入产物）。
- ✅ 阶段 4 响应式与体验：design tokens 与 fluid 容器；Grid/Flex 布局；加载/空/错误三态组件与重试；键盘焦点管理、`prefers-reduced-motion`、图片懒加载与失败降级。
- ✅ 阶段 5 性能与 SEO：highlight.js 仅注册 7 种常用语言；系统字体栈（无自托管字体）；hero 图降采样压缩（338 kB → 188 kB）并生成移动端小图；动态 meta/OG/canonical；404 路由；robots.txt。
- ✅ 阶段 6 测试与发布：11 个测试文件 28 个用例（HTTP 重试、错误映射、消毒、表单、composables、组件）；Playwright E2E 覆盖首页→详情→评论、404、接口失败；CI 作为合并门禁。

**仍待办（进行中）：**

- 🔄 设计 token 色板统一：倾向黑白科技感配色，新设计定稿后统一 `index.html theme-color`、`design-system/blog-web/MASTER.md` 与 `src/style/design-system.css` 的色板定义。
- 🔄 `sitemap.xml` 生成与 `robots.txt` 域名替换（部署时）。
- 🔄 评论后端接口接入：当前评论提交为页面内本地临时展示。
- 🔄 Core Web Vitals 实网测量与发布/回滚流程建立。

## 1. 项目现状

项目是 Vue 3 + TypeScript + Vite 的个人博客前端，当前主要包含：首页、文章列表、文章详情、Markdown 渲染、代码高亮和评论界面。已有 Vue Router、Pinia、Axios、Element Plus，但工程仍处于“模板与旧项目代码混合迁移”的状态。

### 1.1 当前技术栈

| 类别 | 当前方案              | 现状                                         |
| ---- | --------------------- | -------------------------------------------- |
| 框架 | Vue 3.2               | Options API 与 Composition API 混用          |
| 语言 | TypeScript 4.9        | strict 已开启，但类型检查失败且大量 `any`    |
| 构建 | Vite 4.3              | 可构建，但存在大包告警                       |
| 路由 | Vue Router 4          | 仅首页、文章详情两个有效路由                 |
| 状态 | Pinia                 | 已安装和注册，尚未形成实际状态模型           |
| HTTP | Axios                 | 有拦截器，但响应类型、重试策略和配置存在问题 |
| UI   | Element Plus          | 全量注册，影响体积                           |
| 内容 | marked + highlight.js | 可渲染 Markdown，但未见 HTML 消毒            |
| 样式 | CSS + SCSS + Less     | 三套预处理方式并存，固定宽度和 float 较多    |

### 1.2 实测基线

执行命令：

```bash
npm run build
npx vue-tsc --noEmit
```

结果：

- 生产构建成功。
- 最大 JS chunk 约 `927.57 kB`，gzip 后约 `310.40 kB`，触发 Vite 500 kB 告警。
- Element Plus 相关 CSS 等产物中，最大 CSS 约 `326.22 kB`。
- 自定义字体约 `5,231.25 kB`，是明显的首屏资源负担。
- 类型检查失败：`App.vue`、`views/dynamic/index.vue` 使用 JavaScript，但当前 TypeScript 配置未启用 `allowJs`。
- README 含未解决的 Git 冲突标记。

## 2. 核心问题与优先级

### P0：交付基线与正确性

1. **源码中文乱码**：页面文案、注释、HTML title 和错误提示广泛乱码，直接影响用户体验和维护。
2. **类型检查不可用**：构建脚本未执行 `vue-tsc`，导致错误可绕过 CI 进入生产。
3. **接口返回契约错误**：响应拦截器返回 `res.data`，API 方法却声明返回 `AxiosResponse`，调用侧继续用 `({ data })` 解构；类型、运行时语义不一致。
4. **文章 ID 读取错误**：`params.id[0]` 在字符串 ID 下只取首字符，应规范为 `String(route.params.id)`。
5. **XSS 风险**：文章内容通过 `marked` 生成 HTML 后直接传给 `v-html`；若内容可由后台录入，必须在展示前消毒。
6. **HTTP 重试范围过宽**：当前对 4xx/5xx 均可能重试，包括 400、401、403、404；POST 请求也可能重复提交。
7. **配置硬编码且不一致**：`public/config.js` 与 `utils/http.ts` 使用不同后端地址，并包含 HTTP 明文地址。
8. **仓库卫生异常**：README 有冲突标记，多个 `debug.log` 混入工作区，同时存在 npm/yarn 双锁文件。

### P1：架构和可维护性

1. Vue 2 风格的 `destroyed`、`this.$parent`、`this.$refs` 与 Vue 3 写法混用。
2. `dynamic` 页面依赖全局 `$`，但路由未注册，属于不可达/半迁移代码。
3. Pinia 已注册但未使用，页面组件自行请求并持有业务状态。
4. API 参数存在 `useId` 疑似拼写错误，实体、DTO、响应结构均未建模。
5. `components/base`、`components/common` 和根组件职责重叠，存在两套 CommentList。
6. 页面中保留大量演示数据、空函数、console、无效 import 和未完成功能。
7. 组件直接 import 全局 router，不利于测试，应使用 `useRouter()`。
8. 请求加载、空态、错误态、重试态没有统一交互模型。

### P2：性能、体验与工程能力

1. Element Plus 全量注册，未采用自动按需引入。
2. 代码高亮语言包可能全量进入产物，应只注册实际使用语言。
3. 5.2 MB 字体未子集化、压缩和预加载策略设计。
4. 大量外链图片和运行时外部脚本，没有失败降级、SRI/CSP 或资源域治理。
5. 页面使用 `780px/800px` 最小宽度、float 和绝对定位，移动端基本不可用。
6. 图片无统一懒加载、尺寸声明、现代格式和响应式 `srcset`。
7. 缺少单元测试、组件测试、E2E、CI、提交检查和可观测性。
8. SEO 基础不足：缺少按文章生成的 title、description、Open Graph、canonical 等。

## 3. 重构目标

### 3.1 质量目标

- `npm run typecheck`、`npm run lint`、`npm run test`、`npm run build` 全部通过。
- 核心业务不使用隐式 `any`，API DTO 和领域实体拥有明确类型。
- 首页、文章详情和评论至少覆盖成功、空、失败、加载四种状态。
- 不允许未消毒的外部 HTML 进入 `v-html`。
- 仓库只有一种包管理器和一个锁文件。

### 3.2 性能目标

- 首屏路由 JS gzip 建议控制在 150 kB 内，单个异步 chunk gzip 建议低于 100 kB。
- 首屏字体总量建议低于 200 kB；非必要字体延迟加载。
- Lighthouse 移动端目标：Performance ≥ 85，Accessibility/Best Practices/SEO ≥ 90。
- LCP ≤ 2.5 s、CLS ≤ 0.1、INP ≤ 200 ms（以真实部署环境数据为准）。

### 3.3 架构目标

采用“按业务功能组织 + 共享基础设施”的结构：

```text
src/
├─ app/                  # 应用装配、路由、全局 Provider
├─ assets/               # 本地静态资源
├─ components/           # 真正跨业务复用的 UI 组件
├─ features/
│  ├─ articles/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ composables/
│  │  ├─ model/
│  │  └─ views/
│  └─ comments/
│     ├─ api/
│     ├─ components/
│     ├─ composables/
│     └─ model/
├─ layouts/              # DefaultLayout 等页面骨架
├─ shared/
│  ├─ api/               # axios client、错误标准化
│  ├─ config/            # 环境配置读取与校验
│  ├─ lib/               # markdown、sanitize、format 等
│  ├─ styles/            # tokens、reset、全局样式
│  └─ types/
└─ main.ts
```

依赖方向固定为：`app -> layouts/features -> components/shared`。`shared` 不反向依赖业务层，feature 之间不直接读取彼此内部文件。

## 4. 目标设计

### 4.1 数据模型与 API

建议至少定义：

```ts
interface Author {
  id: string
  name: string
  avatarUrl: string
  bio: string
}

interface ArticleSummary {
  id: string
  title: string
  excerpt: string
  thumbnailUrl: string
  publishedAt: string
  commentCount: number
  author: Author
}

interface ArticleDetail extends ArticleSummary {
  markdown: string
  comments: Comment[]
}

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
```

HTTP 层只做通信与协议适配：

- `request<T>()` 直接返回统一后的 `T`，调用方不再解构 AxiosResponse。
- 错误转换为统一 `AppError`，UI 层决定 toast、页面错误态或静默处理。
- 仅对网络错误、408、429、502、503、504 等临时错误重试。
- 默认只重试 GET/HEAD 等幂等请求；写请求必须由业务明确开启并携带幂等键。
- 401 交给认证流程，禁止无意义重试。
- API base URL 统一来自 `VITE_API_BASE_URL`，启动时校验。
- 生产环境只允许 HTTPS。

### 4.2 Markdown 安全链路

```text
后端 Markdown -> marked 解析 -> DOMPurify 消毒 -> v-html 展示
```

- 配置允许的标签和属性，禁止事件属性、脚本、危险 URL scheme。
- 外链统一补 `rel="noopener noreferrer"`。
- 代码高亮只注册常用语言，未知语言回退为纯文本。
- 服务端仍需做存储和输出侧安全校验，前端消毒不是唯一防线。

### 4.3 状态管理

- 页面私有状态使用 composable：如 `useArticleDetail(id)`、`useArticleList(filters)`。
- 只有跨路由共享、需要缓存或多组件协调的状态进入 Pinia。
- 若当前没有跨页面状态，允许先移除 Pinia，避免“为了使用而使用”。
- 统一返回 `data/loading/error/refresh`，避免各页面重复实现异步状态。

### 4.4 UI 与样式

- 统一使用 Composition API + `<script setup lang="ts">`。
- 建立颜色、间距、字号、圆角、阴影和层级 tokens，禁止散落魔法值。
- 用 Grid/Flex 替换 float；容器采用 `width: min(100% - 32px, 960px)`。
- 断点建议：`< 768px`、`768–1199px`、`>= 1200px`。
- 公共组件只接收 props/emit，不直接请求数据或操作父组件 ref。
- 图片组件统一处理 lazy、fallback、宽高、alt 和对象裁剪。
- 动画尊重 `prefers-reduced-motion`。

### 4.5 路由与页面

- 使用 route meta 管理 title、description 和布局。
- 文章 ID 变化时通过 `watch(() => route.params.id, ...)` 重新加载。
- 补充 404 路由、错误页和路由级懒加载。
- 清理不可达的 dynamic 页面；若保留，先迁移掉 jQuery 和 Vue 2 生命周期后再注册。
- 通过布局组件管理 Header、回到顶部和页面容器，消除 `$parent/$refs` 通信。

### 4.6 工程化

建议脚本：

```json
{
  "scripts": {
    "dev": "vite",
    "typecheck": "vue-tsc --noEmit",
    "lint": "eslint . --max-warnings=0",
    "format": "prettier --write .",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "build": "npm run typecheck && vite build",
    "check": "npm run lint && npm run test && npm run build"
  }
}
```

- ESLint 配置只保留一份，Prettier 配置只保留一份。
- 测试建议采用 Vitest + Vue Test Utils + MSW，关键流程用 Playwright。
- CI 对每个 PR 执行 install、lint、typecheck、test、build，并保存 bundle 报告。
- 引入依赖更新与漏洞扫描；高危漏洞阻断发布。

## 5. 分阶段实施计划

### 阶段 0：冻结基线（0.5–1 天）

- 记录首页与文章页截图、接口样例、构建体积和已知缺陷。
- 明确唯一包管理器；建议沿用 `package-lock.json` 对应的 npm。
- 为当前线上版本创建可回退 tag。

验收：能够从干净环境安装、启动并复现当前页面。

### 阶段 1：恢复工程健康（1–2 天）

- 修复 README 冲突、中文编码、index.html 结构和所有 debug.log。
- 将剩余 JS Vue 文件迁移为 TypeScript，或临时显式启用 allowJs 后逐个迁移。
- 合并 ESLint/Prettier 配置，补 typecheck/lint/check 脚本。
- 清除死代码、无效 import、console 和不可达组件。

验收：全新安装后 `npm run check` 通过，页面文案无乱码。

### 阶段 2：修正数据与安全链路（2–3 天）

- 建立 Article、Author、Comment、API Response 类型。
- 重写 Axios client、环境配置、错误映射和有限重试。
- 修复文章 ID、列表返回值和评论接口契约。
- 引入 HTML 消毒并为危险 Markdown 编写安全测试。

验收：接口成功/失败/超时场景可预测；XSS 测试不能执行脚本。

### 阶段 3：按业务切片重构（3–5 天）

- 先迁移 articles，再迁移 comments，最后迁移 layout/header。
- 拆分“容器组件”和“展示组件”，引入 composables。
- 删除重复 CommentList 和未使用 base 组件。
- 替换 `$parent/$refs` 和全局 router；移除 jQuery。

验收：首页、文章详情、评论展示/提交回归通过，组件职责清晰。

### 阶段 4：响应式与体验（2–4 天）

- 建立 design tokens 和统一页面容器。
- 用 Grid/Flex 重写文章卡片和评论区。
- 增加 skeleton、empty、error、retry、toast 和表单校验。
- 完成键盘操作、焦点状态、语义标签和图片 alt。

验收：360、768、1440 px 三档无横向滚动，关键流程仅键盘可完成。

### 阶段 5：性能与 SEO（2–3 天）

- Element Plus、图标、highlight.js 按需加载。
- 字体子集化，图片本地化/现代格式化和懒加载。
- 配置 manualChunks，但以路由和依赖边界为依据，避免机械拆包。
- 加入动态 meta、Open Graph、sitemap/robots；如依赖搜索流量，评估 SSG/SSR。

验收：达到第 3.2 节预算，Lighthouse 指标达标且无功能回归。

### 阶段 6：测试、CI 与发布（2–3 天）

- 单测覆盖解析、错误映射、重试、表单和 composables。
- E2E 覆盖首页进入文章、404、评论提交和接口失败。
- 建立预发布环境、错误监控、性能监控和回滚流程。

验收：CI 作为合并门禁；发布后有可观测指标和一键回滚方案。

## 6. 测试策略

| 层级     | 重点                                           | 建议           |
| -------- | ---------------------------------------------- | -------------- |
| 单元测试 | 格式化、Markdown 消毒、错误映射、重试判断      | Vitest         |
| 组件测试 | ArticleCard、CommentBox、CommentList、状态组件 | Vue Test Utils |
| API 模拟 | 成功、空数据、4xx、5xx、超时                   | MSW            |
| E2E      | 首页 → 详情、评论、404、移动端                 | Playwright     |
| 非功能   | Lighthouse、bundle size、a11y                  | CI 定期执行    |

关键安全用例必须包含：`<script>`、`onerror`、`javascript:` URL、恶意 SVG、超长 Markdown 和异常代码块。

## 7. 发布与回滚

1. 每个阶段独立 PR，禁止把编码修复、架构迁移、UI 改版一次性合并。
2. 保持旧 API 适配层到新链路验证完成，再删除旧实现。
3. 预发布环境至少完成冒烟、移动端和接口异常测试。
4. 静态产物使用内容哈希和长期缓存，HTML 禁止长期强缓存。
5. 发布保留上一版本产物或镜像；错误率、白屏率、LCP 显著恶化时立即回滚。

## 8. 风险清单

| 风险                  | 影响                      | 缓解措施                                        |
| --------------------- | ------------------------- | ----------------------------------------------- |
| 乱码文件原编码未知    | 修复时可能二次损坏        | 先备份并逐文件确认 UTF-8 内容，不做盲目批量转码 |
| 后端契约无文档        | 类型可能与真实响应不符    | 抓取真实样例，建立契约测试和适配层              |
| Markdown 历史内容复杂 | 消毒后样式或标签丢失      | 统计历史标签，配置白名单并做快照回归            |
| UI 全面改写           | 视觉回归范围大            | 按组件切片，保存基线截图，做视觉对比            |
| 外链资源不可控        | 图片/脚本失效或供应链风险 | 关键资源自托管，设置 CSP 和失败降级             |
| 一次升级全部依赖      | 故障定位困难              | 先修基线，再分组升级并逐组验证                  |

## 9. 完成定义（Definition of Done）

- [x] README 无冲突标记，仓库无调试日志和无效配置。
- [x] 所有源码、页面文案统一 UTF-8 且显示正常。
- [x] lint、typecheck、unit test、E2E、build 在 CI 全绿。
- [x] API 类型与运行时返回值一致，无页面级 `any` 数据模型。
- [x] Markdown 已消毒，HTTP 重试符合幂等与状态码策略。
- [x] 首页和文章详情具备加载、空、错误、重试状态。
- [x] 移动端无横向滚动，基本键盘与读屏体验可用。
- [ ] bundle、字体和 Core Web Vitals 达到约定预算（待实网测量）。
- [ ] SEO 元信息、404、监控、预发布和回滚流程可用（元信息与 404 已完成，监控/发布流程待建）。
- [x] 重构后的目录和依赖规则在 README/贡献指南中有说明。

## 10. 建议的首个迭代范围

第一个迭代只做“可交付基线”，不要同时改视觉：

1. 修复乱码、README 冲突和 index.html。
2. 统一 npm、ESLint、Prettier 和 TypeScript。
3. 增加 `typecheck/lint/check` 并接入 CI。
4. 修正 Axios 返回类型、文章 ID 和环境变量。
5. 对 Markdown 加消毒。
6. 删除 jQuery、不可达页面和重复/废弃组件前，先确认线上是否仍有入口。

完成这一迭代后，再以文章模块为第一个业务切片进入结构重构，风险最低、收益最高。
