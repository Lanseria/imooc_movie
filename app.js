var multipart = require('connect-multiparty'),
	cookieParser = require('cookie-parser'),
	serveStatic = require('serve-static'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	express = require('express'),
	logger = require('morgan'),
	path = require('path'),
	fs = require('fs');

var mongoStore = require('connect-mongo')(session),
	port = process.env.PORT || 3000,
	app = express(),
	dbUrl = 'mongodb://localhost/imooc',
	models_path = __dirname + '/app/models';
	
app.locals.moment = require('moment'),

mongoose.connect(dbUrl);

//models loading

var walk = function(path){
	fs.readdirSync(path).forEach(function(file){
		var newPath = path+'/'+file;
		var stat = fs.statSync(newPath);
		if(stat.isFile()){
			if(/(.*)\.(js|coffee)/.test(file)){
				require(newPath);
			}
		}else if(stat.isDirectory()){
			walk(newPath);
		}
	})
}
walk(models_path);

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret:'imooc',
  resave: false,
  saveUninitialized: true,
  store:new mongoStore({
  	url:dbUrl,
  	collection: 'sessions'
  })
}));
var env = process.env.NODE_ENV || 'development';

if('development' === env){
	app.set('showStackError', true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug', true);
}
require('./config/routes')(app);

app.listen(port);

console.log('imooc started on port '+port);
