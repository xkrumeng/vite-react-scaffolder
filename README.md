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
│  vite.config.ts   # vite 配置文件
│
├─node_modules
├─public
│      vite.svg
│
└─src
    │  App.css
    │  App.ts
    │  index.css
    │  main.tsx
    │  vite-env.d.ts
    │
    └─assets
            react.svg
```


## 2. 安装Jest
```bash 
# jest 测试框架
# @types/jest Jest 类型声明包  TS 声明类型包的大版本最好和 jest 一样。
# ts-jest 转译器 利用 tsc 来转译 TypeScript  
# ts-node  写完代码之后要用 tsc 作编译，之后再用 Node.js 来跑，这样比较麻烦，所以我们会用 ts-node 来直接跑 ts 代码，省去了编译阶段。
# jest-environment-jsdom dom操作

pnpm add -D jest @types/jest ts-jest ts-node jest-environment-jsdom

# 初始化jest 配置
npx jest --init

# ? Would you like to use Jest when running "test" script in "package.json"? » (Y/n) Y
# ? 是否在package.json的script添加test命令 » (Y/n)

# ? Would you like to use Typescript for the configuration file? » (y/N)  Y
# ? 配置文件是否用ts格式 ? » (y/N)

# ? Choose the test environment that will be used for testing » - Use arrow-keys. Return to submit.
# ? 选择运行环境 jsdom (browser-like)

# ? Do you want Jest to add coverage reports? » (y/N)
# 是否生成测试覆盖率报告

# ? Which provider should be used to instrument code for coverage? » - Use arrow-keys. Return to submit.
# 使用哪个提供程序来检测覆盖范围的代码 V8

# ? Automatically clear mock calls, instances, contexts and results before every test? 
# 是否在每个单元测试前自动清除模拟调用 Y
```
打开 **jest.config.ts** 文件, 修改为
```js
{
    preset: 'ts-jest', // 使用typescript 转译器
    ...
}
```

现在我们可以新建一个测试文件来测试一下配置是否可用

```ts
// src/utils/sum.ts
export const sum = (a: number, b: number) => a + b;

// src/utils/sum.test.ts
import { sum } from './sum';

describe('sum', () => {
    it('可以做整数的加法', () => {
        expect(sum(1, 3)).toEqual(4)
    })
})
```
运行 *yarn test* 命令，可以看到生成的测试结果如下：

```bash
 PASS  src/utils/sum.test.ts                                                                                                                                                                                                     
  sum
    √ 可以做整数的加法 (2 ms)                                                                                                                                                                                                                    
----------|---------|----------|---------|---------|-------------------                                                                                                                                                          
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                                                                                                           
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 | 
 sum.ts   |     100 |      100 |     100 |     100 | 
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.366 s
Ran all test suites.
Done in 4.95s.
```
这表明我们的 jest 测试已经可以正常工作。但现在也只能测试一些简单的用例，如果要能测试React的组件，还得安装@testing-library测试框库。具体的jest配置可以参考 [Jest 实践指南](https://github.yanhaixiang.com/jest-tutorial/) 和 [Jest 官方文档](https://jestjs.io/zh-Hans/)的配置。

安装 @testing-library
```bash
# @testing-library/react
# @testing-library/user-event
# @testing-library/jest-dom
# identity-obj-proxy
# @types/testing-library__jest-dom
# msw

pnpm add -D @testing-library/react @testing-library/user-event @testing-library/jest-dom identity-obj-proxy react-test-renderer @types/react-test-renderer @types/testing-library__jest-dom msw
```

jest 的详细配置参考代码


## 3. 集成antd 与 tailwindcss

```bash
# 安装 antd
pnpm add antd @ant-design/icons

# 安装 tailwindcss
pnpm add -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

**tailwind.config.cjs** 配置如下：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

```css
/** src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
```ts
// src/main.tsx
...
import './index.css'
...

```

## 4. 集成Redux
```
pnpm add @reduxjs/toolkit react-redux
```
创建store目录，在目录下创建需要的 **reducers**, 以counter为例。我们在 **src/store/reducers** 下创建了counter的reducers. 在 **src/store/index.ts**
创建store并导出。

我们在 **main.tsx** 把我们的状态store绑定到我们APP上
```tsx
...ts
import store from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
```

使用store示例如下：
```tsx
// src/hooks/reduxHooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

export const useAppDispath: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// src/App.tsx
import { Button } from 'antd'
import { useAppDispath, useAppSelector } from './hooks/reduxHooks'
import { decrement, increment, incrementByAmount } from './store/reducers/counter'

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispath()
  return (
    <div className="w-[200px] flex flex-wrap mx-auto">
      <h2 className="text-center text-lg font-bold text-indigo-600">{count}</h2>
      <Button onClick={() => dispatch(increment())}>加1</Button>
      <Button onClick={() => dispatch(decrement())}>减1</Button>
      <Button onClick={() => dispatch(incrementByAmount(6))}>加6</Button>
    </div>
  )
}

export default App
```

## 5 配置eslint, prettier
```bash
# eslint
pnpm add -D eslint
npx eslint --init

# prettier
 pnpm add -D prettier
# 配置见.prettierrc.js文件

# eslint + prettier
pnpm add -D eslint-config-prettier eslint-plugin-prettier
```
```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off"
    }
}

```
接下来在 **package.json** 的 **script** 中添加命令。

```json
{
    "script": {
        "lint": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./"
    }
}
```

Vite 中引入 ESLint

```bash
pnpm add -D vite-plugin-eslint
```
```js
// **vite.config.ts**
```


## husky =

## 附 插件官方文档地址
- [vitejs 中文官方文档](https://cn.vitejs.dev/)
- [esbuild 中文官方文档](https://esbuild.docschina.org/)
- [swc 官方文档](https://swc.rs/)
- [Jest 官方文档](https://jestjs.io/zh-Hans/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW - Mock Service Worker](https://mswjs.io/)
- [TailwindCss官方文档](https://tailwindcss.com/)
- [Redux 官网](https://cn.react-redux.js.org)