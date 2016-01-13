
## nodejs+express快速搭建电影网站

### 学习不会的东西优先上官网看API

[Jade官网](http://jade.tilab.com/)

### 开发环境介绍

+ 后端: nodejs(express/jade)+mongoDB(mongoose/moment.js) 括号的都是通过npm安装
+ 前端: bower(jquery/bootstrap)
+ 本地环境: less/cssmin/JSHint/UglifyJS/mocha/grunt

### 流程

+ 原型图-首页/详情页
+ 后台录入页
+ 确定相应的路由和测试前端流程

### 代码开发

#### 确定基本的目录结构

+ 安装需要的npm模块

```
//多个包一起安装
npm install express jade moment mongoose
```

+ 代码中自己不知道的地方

```
//端口号可以优先从环境变量中得到
var port=process.env.PORT || 3000;
启动:  PORT=8000 node app.js
```

+ jade 模板中 tab和空格只能使用一种,不能都使用