# Vitejs + React + typescript +jest + Redux + antd 脚手架实现过程

## 1. 初始化项目

```bash
# step 1
pnpm create vite

# √ Project name: ... vite-react-scaffolder
# √ Select a framework: » React
# √ Select a variant: » TypeScript + SWC  这里我们尝试使用SWC构建项目，在开发时会将babel替换为SWC,在构建时，若使用插件则会使用SWC+esbuild, 若没有使用插件则仅会使用esbuild

# step 2
cd vite-react-scaffolder
pnpm install

```

初始化完成后我们可以得到以下的文件目录

```bash
根目录
│  .gitignore 
│  index.html
│  package.json
│  pnpm-lock.yaml
│  README.md
│  tsconfig.json
│  tsconfig.node.json
│  vite.config.ts
│
├─node_modules
├─public
│      vite.svg
│
└─src
    │  App.css
    │  App.tsx
    │  index.css
    │  main.tsx
    │  vite-env.d.ts
    │
    └─assets
            react.svg
```








## 附 插件官方文档地址
- [vitejs 中文官方文档](https://cn.vitejs.dev/)
- [esbuild 中文官方文档](https://esbuild.docschina.org/)
- [swc 官方文档](https://swc.rs/)