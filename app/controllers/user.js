var User = require('../models/user');

//signup
exports.showSignup = function(req, res){
	res.render('signup', {
		title:'注册页面'
	})
}

exports.signup = function(req, res){
	var _user = req.body.user;
	User.findOne({name:_user.name}, function(err, user){
		if(err){
			console.log(err);
		}
		if(user){
			console.log(user);
			return res.redirect('/signin');
		}else{
			user = new User(_user);
			user.save(function(err, user){
				if(err){
					console.log(err);
				}
				req.session.user = user
				res.redirect('/');
			})
		}
	})
	// important
	// router : /user/signup/:userid
	// var _userid = req.params.userid
	// router : /user/signup/111?userid=111
	// var _userid = req.query.userid
	// router : /user/signup => {userid:111} =>{such as ajax}
	// var _userid = req.body.userid 
}

//signin
exports.showSignin = function(req, res){
	res.render('signin', {
		title:'登录页面'
	})
}
exports.signin = function(req, res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	User.findOne({name:name},function(err, user){
		if (err) {
			console.log(err);
		}
		if (!user) {
			return res.redirect('/signup');
		}
		user.comparePassword(password, function(err, isMatch){
			if(err){
				console.log(err);
			}
			if(isMatch){
				req.session.user = user
				return res.redirect('/');
			}else{
				return res.redirect('/signin');
			}
		})
	})
}

// logout
exports.logout = function(req, res){
	delete req.session.user;
	//delete app.locals.user;
	res.redirect('/');
}

//user list
exports.list = function(req, res){
	User.fetch((err, users)=>{
		if(err){
			console.log(err);
		}
		res.render('userlist', {
			title:'imooc 用户列表页',
			users:users
		})
	})
}
// middleware for user
exports.signinRequired = function(req, res, next){
	var user = req.session.user;
	if(!user){
		return res.redirect('/signin');
	}
	next();
}
// middleware for user
exports.adminRequired = function(req, res, next){
	var user = req.session.user;
	console.log(user);
	if(user.role <= 10){
		return res.redirect('/signin');
	}
	next();
}