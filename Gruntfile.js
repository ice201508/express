'use strict';

//包装函数
module.exports=function(grunt){
	//任务配置，所有插件的配置信息 http://www.gruntjs.net/plugins 2种插件grunt团队和第三方
	grunt.initConfig({

		//获取package.json的信息
		pkg:grunt.file.readJSON('package.json'),

		//uglify插件的配置信息
		uglify:{
			options:{
				stripBanners:true,
				banner:'/*!<%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %>*/\n'
			},
			test:{
				src:'app.js',
				dest:'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
			}
		},
		// jshint插件的配置信息
		jshint:{
			build:['Gruntfile.js','app.js','routes/*.js'],
			options:{
				jshintrc:'.jshintrc'
			}
		},
		// watch插件的配置信息
		watch:{
			build:{
				files:['routes/*.js','app.js','static/css/*.css'],
				tasks:['jshint','uglify'],
				options:{spawn:false}
			}
		}
	});

	//告诉grunt我们要使用的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//告诉grunt当我们在终端中输入grunt时需要做些什么
	grunt.registerTask('default',['jshint','uglify','watch']);
};