/**
 * todo - conf/config.js
 * zhangmhao@gmail.com
 */
'use strict';

var config = require('../conf/config');
var db = require('../common/db');

exports.index = function(req, res, next) {
	console.log('indexController');
	db.todo.findItems({}, {
		sort: {
			id: 1,
			finished: 1
		}
	}, function(err, rows) {
		if(err) {
			return next(err);
		}
		res.render('index.html', {
			todos: rows
		});
	});
};

exports.new = function(req, res, next) {
	console.log('newController');
	var title = req.body.title || '';
	title = title.trim();
	if(!title) {
		return res.render('error.html', {
			message: '标题是必须的'
		});
	}
	db.todo.save({
		title: title,
		post_date: new Date()
	}, function(err, row) {
		if(err) {
			return next(err);
		}
		res.redirect('/');
	});
};

exports.view = function(req, res, next) {
	res.redirect('/');
};

exports.edit = function(req, res, next) {
	var id = req.params.id;
	db.todo.findById(id, function(err, row) {
		if(err) {
			return next(err);
		}
		if(!row) {
			return next();
		}
		res.render('todo/edit.html', {
			todo: row
		});
	});
};

exports.save = function(req, res, next) {
	var id = req.params.id;
	var title = req.body.title || '';
	title = title.trim();
	if(!title) {
		return res.render('error.html', {
			message: '标题是必须的'
		});
	}
	db.todo.updateById(id, {
		$set: {
			title: title
		}
	}, function(err, result) {
		if(err) {
			return next(err);
		}
		res.redirect('/');
	});
};

exports.delete = function(req, res, next) {
	var id = req.params.id;
	db.todo.removeById(id, function(err) {
		if(err) {
			return next(err);
		}
		res.redirect('/');
	});
};

exports.finish = function(req, res, next) {
	var finished = req.query.status === 'yes' ? 1 : 0;
	var id = req.params.id;
	db.todo.updateById(id, {
		$set: {
			finished: finished
		}
	}, function(err, result) {
		if(err) {
			return next(err);
		}
		res.redirect('/');
	});
};

exports.refresh = function (req, res) {
    

};