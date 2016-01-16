var express = require('express');
var favicon = require('serve-favicon');

var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use(favicon(__dirname+'/public/favicon.ico'));

app.listen(port, function() {
	console.log('servre is running on 3000');
});

var movies=[{
	title:'机械战警',
	_id:1,
	poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
},{
	title:'机械战警',
	_id:2,
	poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
},{
	title:'机械战警',
	_id:3,
	poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
},{
	title:'机械战警',
	_id:4,
	poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
},{
	title:'机械战警',
	_id:5,
	poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
},{
	title:'机械战警',
	_id:6,
	poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
}];

// index page
app.get('/', function(req, res) {
	res.render('index', {
		title: 'Film 首页',
		movies:movies
	})
});
// detail page
app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title: 'Film 详情页'
	})
});
// admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'Film 后台录入页'
	})
});
// list page
app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: 'Film 列表页'
	})
});