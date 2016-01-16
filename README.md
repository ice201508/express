
## nodejs+express快速搭建电影网站

### 学习不会的东西优先上官网看API

[Express API](http://www.expressjs.com.cn/)
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

[serve-favicon 包说明](https://www.npmjs.com/package/serve-favicon)

+ 使用 app.use(express.favicon()); 会提示错误,中间件的问题 使用serve-favicon 代替

```
//文件名一定不能写错， .ico 不是 .icon
app.use(favicon(__dirname+'/public/favicon.ico'));
```

+ 代码中自己不知道的地方

```
//端口号可以优先从环境变量中得到
var port=process.env.PORT || 3000;
启动:  PORT=8000 node app.js
```

+ jade 模板中 tab和空格只能使用一种,不能都使用
+ jade模板的优势  可以实现继承，可以提取公共部分。去调整目录结构，views里面修改
+ 各个页面的书写完成后，就是伪造数据测试，还没有涉及到数据库