
## nodejs+express快速搭建电影网站

[TOC]

### 学习不会的东西优先上官网看API

[Express API](http://www.expressjs.com.cn/)
[Jade官网](http://jade.tilab.com/)
[Jade 引擎](http://jade-lang.com/)
[Moogodb]()

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

### Jade规范

[Jade API](http://naltatis.github.io/jade-syntax-docs/)

+ jade 模板中 缩进 tab和空格只能使用一种,不能都使用
+ jade模板的优势  可以实现继承，可以提取公共部分。去调整目录结构，views里面修改
+ 命令行编译 *.jade 为 *.html 文件

```
npm install jade -g
//每次编译后都是自动压缩后的html文件
// -P 表示不压缩
// -w 表示开启监听模式,每次修改后自动编译
jade -P -w jade.jade
```

> 各个页面的书写完成后，就是伪造数据测试，还没有涉及到数据库

```
res.render({
	title:'index',
	movies:[{title:'ss',id:1},{title:'ss',id:2}]
});
```

#### id/class

```
//标签和文本必须要有缩进
//元素的属性用()
#content
	.block
		input#bar.foo1.foo2(type='text',required)
```

#### 文本

+ 标签和文本间要空格，()内写属性
+ 冒号的作用 :+空格 可以代替换行
+ 使用外部变量 '#{book.name}' h2= book.name
+ 变量可以用在属性内部

```
//文本书写的2种方式
p.
	foo bar
	hello world

p
	| foo bar
	| hello world
//文本内添加标签
p element in text <input type='text' required>
//添加属性
p
	a.btn.btn-primary.del(href='/movie/#{id}' role='button') 播放
//冒号代替换行
ul#books
	li: a(href='#book-a') book A
	li: a(href='#book-b') book B
//外部变量 2种方式的区别
- var book={'name':'God Father','price':12.99}
	h2= book.name
	h3 '#{book.name}' is $#{book.price}
//=会原样输出,!=会转义输出
- var name='hello <em>World</em>'
	li= name
	li!= name
//属性内部用变量
input(type='text',placeholder='#{name}')

- var user={id:12,name:'Lucy'}
a(href='/user/'+user.id)= user.name
```

#### 注释

+ 注释分为输出的和不输出的，单行的和块 // //-
+ 还支持条件注释

```
// begin animate
//- begin animate
缩进表示继承上一步的符号的含义
// begin animate
	sdf
	asdf
```

#### if,unless,case

```
- var name='Lucy'
	if name=='Lucy'
		h1 this is lucy
	else
		h1!= name
//unless 后面的条件为假时才执行后面的语句
- var name=false
	unless name
		p no errors

//case语句代替if/else
case name
	when 'bob'
		p Hi bob
	when 'Alice'
		p hello alice
	default
		p hello #{name}
```

#### 循环 for/each 用来遍历数组和对象

```
//在jade中定义变量
- var jobs=['beijing','shanghai','guangdong']
		each job in jobs
			li=job

//也可以写
ul
	each job in jobs
		li=job
//each后面的参数可以有2个，一个表示序号,后面也可以有else语句
- var books=['A','B','C']
	select
		each book,i in books
			option(value=i) BOOK #{book}
//for后面也可以有2个参数,并且还有有个else语句
ul
	for book,i in books
		li(class='bar#{i}') #{book}
	else
		li no items
```

#### jade 3种可执行代码

```
- var foo = 'bar'

- for(var key in obj)
	p=obj[key]

- if(foo)
	ul
		li yar
- else
	p on SF

- if(items.lengths)
	ul
		- items.foreach(function(item){
				li= item
		- })
```

#### 模板继承 block/extends

+ block append head /  block prepend head / append head

```
//这里是引用外部的 .jade文件
extends ../extend-layout
//这里定义的块可以供外部使用
block scrpits
	script(src='/jquery.js')
	script(src='/jquery.js')
block content
	h1= title
```

+ 包含 include/yield 静态文件

```
html
	include includes/head
body
	p text
	include includes/foot
```

#### shell 中的makefile文件

### 设计数据库模型 mongoose

+ 相关概念 Schema/Model/Documents(模式/模型/文档) --> Mongoose --> Mongodb
+ Schema 模式定义  在模式里面设置外部变量在数据库里存储的数据类型

```
var mogoose=require('mongoose');
//在模式里面设置外部变量的数据类型
var MovieSchema = new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	year:Number,
	summary:String
})
```

+ Model 编译模型

```
var mongoose=require('mongoose');
var MovieSchema = require(../schemas/movie);

var Movie=mongoose.model(
	'Movie',
	'MovieSchema'
)
module.exports = Movie
```

+ Documents 文档实例化

```
var Movie =require('./models/movie')
var movie=new Movie({
	title:'机械战警',
	doctor:'詹姆斯·卡梅隆',
	year:2008
})
movie.save(function(err){
	if(err) return handleError(err)
})
```

#### 数据库查询

+ 数据库批量查询

```
var Movie=require('./models/movie')
app.get('/',function(req,res){
	Movie
		.find({})
		.exec(function(err,movies){
			res.render('index',{
				title:'Film 首页',
				movies:movies
			})
		})
})
```

+ 数据库单条查询

```
Movie
//传入一个指定的key
	.findOne({_id:id})
	.exec(function(err,movies){
		res.render('index',{
			title:'ss',
			movies:movies
		})
	})
```

+ 数据库单条数据的删除

```
//直接调模型的remove()方法
Movie.remove({_id:id},function(err,movie){
	if(err){
		console.log(err);
	}
})
```