/**
 * 前端交互主文件 -- public/js/main.js
 * zhangmhao@gmail.com
 */

 $(function () {
 	var todoList = $('#todo-list').find('ul>li');
 	var last = null;
 	todoList.click(function (e) {
 		var $a = $(this).find('a')
 		if (last) {
 			last.hide();
 		}
 		$a.show();
 		last = $a;
 	});
 });