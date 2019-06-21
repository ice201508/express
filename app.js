var express=require('express');
var bodyParser=require('body-parser'); //处理post请求的数据
var cookieParser=require('cookie-parser');
var fs=require('fs');

var app=express();
//创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser=bodyParser.urlencoded({extended:false});
//上传文件要使用的库
var multer=require('multer');

//设置模板引擎
//app.set('view engine','jade');
//处理静态文件的功能js/css/img    html属于页面文件
app.use(express.static('static')); //直接在浏览器出入 localhost:8000/css/style.css访问
app.use(multer({dest:'/tmp/'}).array('image'));
app.use(cookieParser());

app.get('/',function(req,res){
	console.log("Cookies:",req.cookies);
	res.sendFile(__dirname + "/views/" + "index.html");
});
app.get("/post",function(req,res){
	console.log("post请求");
	res.sendFile(__dirname+"/views/"+"post.html");
});
app.get('/ab*cd',function(req,res){
	console.log("ab*cd GET请求 正则匹配");
	res.send('正则匹配');
});
app.get('/process_get',function(req,res){
	var response={
		name:req.query.f_name,
		pass:req.query.password,
		text:req.query.textarea
	};
	console.log(response);
	//res.send("发送数据成功"); 输出json格式
	res.end(JSON.stringify(response));
});
app.post('/process_post' ,urlencodedParser, function(req,res){
	var response={
		name:req.body.f_name,
		password:req.body.password,
		test:req.body.textarea
	};
	console.log(response);
	res.end(JSON.stringify(response));
});
app.post('/file_upload',function(req,res){
	console.log(req.files[0]);//上传的文件信息
	var des_file=__dirname+"/"+req.files[0].originalname;
	console.log(des_file);
	fs.readFile(req.files[0].path,function(err,data){
		fs.writeFile(des_file,data,function(err){
			if(err){
				console.log(err);
			}else{
				var response={
					message:'File upload successfully',
					filename:req.files[0].originalname
				};
			}
			console.log(response);
			res.end(JSON.stringify(response));
		});
	});

});

// 下面是登录的路由，get请求，返回一个登录页面
// xxxxx
var server=app.listen(8000,'127.0.0.1',function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("服务器启动，访问地址%s:%s",host,port);
});