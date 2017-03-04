var Category = require('../models/category')
var _ = require('underscore');
// admin page
exports.new = function(req, res){
	res.render('category', {
		title:'超爱电影 后台分类录入',
		category:{}
	})
}
// admin post movie
exports.save = function(req, res){
	var _category = req.body.category;
	
	var category = new Category(_category);
	category.save((err, category)=>{
		if (err) {
			console.log(err);
		}
		res.redirect('/admin/category/list');
	})
}
// list
exports.list = function(req, res){
	Category.fetch((err, categories)=>{
		if(err){
			console.log(err);
		}
		res.render('categorylist', {
			title:'imooc 分类列表页',
			categories:categories
		})
	})
}