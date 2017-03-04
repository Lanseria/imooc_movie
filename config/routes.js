var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function(app){
	//pre handle user
	app.use(function(req, res, next){
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	})

	// index page
	app.get('/', Index.index)

	//signup
	app.post('/user/signup', User.signup)
	// important
	// router : /user/signup/:userid
	// var _userid = req.params.userid
	// router : /user/signup/111?userid=111
	// var _userid = req.query.userid
	// router : /user/signup => {userid:111} =>{such as ajax}
	// var _userid = req.body.userid 

	//signin
	app.post('/user/signin', User.signin)
	app.post('/user/signup', User.signup)
	// logout
	app.get('/signin', User.showSignin)
	app.get('/signup', User.showSignup)
	app.get('/logout', User.logout)
	//user list
	app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)

	// detail page
	app.get('/movie/:id', Movie.detail)
	// list page
	app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
	// admin page
	app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
	// admin update movie
	app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
	// admin list delete
	app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)
	// admin post movie save
	app.post('/admin/movie', multipartMiddleware, User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save)	

	//category
	app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
	app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
	app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)

	//comment
	app.post('/comment', User.signinRequired, Comment.save);
	//results
	app.get('/results', Index.search)
}