$(document).ready(function() {
	$('.del').click(function(e) {
		var target = $(e.target) //拿到当前的某一个按钮
		var id = target.data('id')
		var tr = $('.item-id-' + id)

		$.ajax({
			type: 'DELETE', //删除的请求类型，类似get/post
			url: '/admin/list?id' + id
		})
		.done(function(resilts) {
			if(results.success ===1) {
				if (tr.length > 0) {
					tr.remove()
				}
			}
		})
	})
});