var express = require('express');
var path = require('path');
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie');
var bodyParser=require('body-parser');
var favicon = require('serve-favicon');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname,'/public')));
app.locals.moment = require('moment')
app.listen(port, function() {
	console.log('servre is running on 3000');
});

// index page
app.get('/', function(req, res) {
	Movie.fetch(function(err,movies){
		if(err){
			console.log('fetch error:',err);
		}
		res.render('index', {
			title: 'Film 首页',
			movies: movies
		})
	})
});
// detail page
app.get('/movie/:id', function(req, res) {
	var id = req.params.id

	Movie.findById(id,function(err,movie){
		if(err){
			console.log('findById is err:',err)
		}
		res.render('detail', {
			title: 'Film 详情页',
			movie: movie
		})
	})
});

// admin update movie 更新电影的路由
app.get('/admin/update/:id',function(res,req){
	var id = req.params.id

	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'Film 后台更新页',
				movie:movie
			})
		})
	}
})


//admin post movie 接受从表单后面post过来的数据
app.post('/admin/movie/new',function(req,res){
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie
	//判断电影是否是新增的还是修改之前的
	if(id != 'undefined'){
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err)
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
			})
		})
	}
	else{
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			summary: movieObj.summary,
			flash: movieObj.flash
		})

		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}

			res.redirect('/movie/' + movie._id)
		})
	}
})

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
	Movie.fetch(function(err,movies){
		if(err){
			console.log('list page fetch error:',err);
		}
		res.render('list', {
			title: 'Film 首页',
			movies: movies
		})
	})
});

// list delete movie 接收删除请求的路由
app.delete('/admin/list',function(req,res) {
	var id = req.query.id

	if(id) {
		Moive.remove({_id:id},function(err,movie) {
			if(err){
				console.log('list delet remove:',err);
			}
			else{
				res.json({success: 1})
			}
		})
	}
})