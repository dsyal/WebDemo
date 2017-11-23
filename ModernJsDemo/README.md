# 现代 JavaScript 开发

## 一、使用 JavaScript 包管理工具（npm）

### 作用  

1. 自动完成 moment.js 的安装  
2. 代替手动下载和内联 JavaScript 文件  

### 步骤

---

npm 初始化，生成 package.json 文件

```
$ npm init
```

安装 moment.js 包，从 moment.js package 下载所有代码到 node_modules 的文件夹中 并修改 package.json 文件来追踪 moment.js 作为项目的依赖

```
$ npm install moment --save
```

## 使用JavaScript 模块打包工具（webpack）

### 作用  

1. 更简单的加载模块（文件）  
2. require 语句 -> require 文件的实际内容（打包后的 JavaScript文件）

### 步骤

```
// index.js
var moment = require('moment');
// or
import moment from 'moment'
```

```
// terminal
$ npm install webpack --save-dev
// --save-dev 参数，因为并不需要把它放到服务器上，只需要作为开发环境的依赖而不是生产环境
```

通过 webpack 工具将 index.js 找到所有 require 语句，并输出为 bundle.js 文件

```
// terminal
$ ./node_modules/.bin/webpack index.js bundle.js
```

简化 webpack 命令 通过 webpack.config.js 配置文件

```
// webpack.config.js
module.exports = {
 entry: './index.js',
 output: {
   filename: 'bundle.js'
 }
};
```

然后我们改变 index.js 之后可以直接通过以下代码打包

```
$ ./node_modules/.bin/webpack
```

## 使用新的语言特性并编译代码（babel）

### 作用

* 可以将 ES2015 语法编译成常规的 JavaScript 来保持浏览器的兼容性

### 步骤

abel-core 是 babel 的主要部分， babel-preset-env 是预定义编译哪些 JavaScript 的新特性，babel-loader 是一个使 babel 和 webpack 能够良好协作的一个包
```
// terminal
$ npm install babel-core babel-preset-env babel-loader --save-dev
```

配置 webpack 来使用 babel-loader
语法让人困扰，我们不用经常编辑它。作用是通过 webpack 寻找任何 .js 结尾的文件（除了 node_modules 目录）并使用 babel-loader 加载、用 babel-preset-env 作为设置编译 JavaScript 文件

```
// webpack.config.js
module.exports = {
 entry: './index.js',
 output: {
   filename: 'bundle.js'
 },
 module: {
   rules: [ // 手动加粗
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
         loader: 'babel-loader',
         options: {
           presets: ['env']
         }
       }
     }
   ]
 }
};
```

## 使用自动构建工具（npm脚本）

简单修改 package.json

```
{
 "name": "modern-javascript-example",
 "version": "1.0.0",
 "description": "",
 "main": "index.js",
 "scripts": { // 手动加粗
   "test": "echo \"Error: no test specified\" && exit 1",
   "build": "webpack --progress -p",
   "watch": "webpack --progress --watch"
 },
 "author": "",
 "license": "ISC",
 "dependencies": {
   "moment": "^2.19.1"
 },
 "devDependencies": {
   "babel-core": "^6.26.0",
   "babel-loader": "^7.1.2",
   "babel-preset-env": "^1.6.1",
   "webpack": "^3.7.1"
 }
}
```

运行构建任务 运行 webpack

```
// terminal
$ npm run build
```

执行 watch 脚本 每次修改完 JavaScript 文件后自动重新运行 webpack 命令

```
// terminal
$npm run watch
```

安装 webpack-dev-server 一个简单的带有热更新的 web 服务器

```
// terminal
$npm install webpack-dev-server --save-dev
```

向 package.json 添加一行脚本

```
// package.json
"server": "webpack-dev-server --open"
```

运行 dev server，通过localhost:8080（默认） 打开index.html 网页，并且会在你修改 index.js 代码后，重新打包 JavaScript 并自动刷新浏览器

```
// terminal
$ npm run server
```
