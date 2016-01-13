var express=require('express');
var port=process.env.PORT || 3000;
var app=express();

app.set('views','./views');
app.set('view engine','jade');

app.listen(port,function(){
	console.log('servre is running on 3000');
});

// index page
app.get('/',function(req,res){
	res.render('index',{
		title:'Film 首页'
	})
});
// detail page
app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'Film 详情页'
	})
});
// admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'Film 后台录入页'
	})
});
// list page
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'Film 列表页'
	})
});