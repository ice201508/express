var express = require('express');
var path = require('path');
var bodyParser=require('body-parser');
var favicon = require('serve-favicon');

var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname,'bower_components')));

app.listen(port, function() {
	console.log('servre is running on 3000');
});

var movies = [{
	title: '机械战警',
	_id: 1,
	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
}, {
	title: '机械战警',
	_id: 2,
	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
}, {
	title: '机械战警',
	_id: 3,
	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
}, {
	title: '机械战警',
	_id: 4,
	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
}, {
	title: '机械战警',
	_id: 5,
	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
}, {
	title: '机械战警',
	_id: 6,
	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
}];

// index page
app.get('/', function(req, res) {
	res.render('index', {
		title: 'Film 首页',
		movies: movies
	})
});
// detail page
app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title: 'Film 详情页',
		movie: {
			doctor: '迈克尔.乔丹',
			country: '美国',
			title: '机械战警',
			year: 2014,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			submary: '《教父》是派拉蒙影业公司出品的一部黑帮题材的电影，改编自马里奥·普佐的同名小说，由弗朗西斯·福特·科波拉执导，马龙·白兰度、阿尔·帕西诺等主演。影片于1972年在美国上映。该片讲述了以维托·唐·科莱昂为首的黑帮家族的发展过程以及科莱昂的小儿子迈克如何接任父亲成为黑帮首领的故事。1973年这部电影获得了第45届奥斯卡奖最佳电影、最佳男主角、最佳改编剧本三项奖项；此外还获得了第30届美国金球奖最佳电影奖、最佳导演等奖项。2007年美国电影协会评选了“百年百佳影片”，《教父》排名第二。'
		}
	})
});
// admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'Film 后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
});
// list page
app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: 'Film 列表页',
		movies: [{
			title: '机械战警',
			_id: 1,
			doctor: '迈克尔.乔丹',
			country: '美国',
			year: 2014,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			submary: '《教父》是派拉蒙影业公司出品的一部黑帮题材的电影，改编自马里奥·普佐的同名小说，由弗朗西斯·福特·科波拉执导，马龙·白兰度、阿尔·帕西诺等主演。影片于1972年在美国上映。该片讲述了以维托·唐·科莱昂为首的黑帮家族的发展过程以及科莱昂的小儿子迈克如何接任父亲成为黑帮首领的故事。1973年这部电影获得了第45届奥斯卡奖最佳电影、最佳男主角、最佳改编剧本三项奖项；此外还获得了第30届美国金球奖最佳电影奖、最佳导演等奖项。2007年美国电影协会评选了“百年百佳影片”，《教父》排名第二。'
		}]
	})
});