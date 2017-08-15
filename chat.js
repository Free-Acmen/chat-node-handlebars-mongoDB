global.BASE_DIR = __dirname;
global.CHAT = BASE_DIR + "/chat/";
global.CONT = CHAT + "/controller/";
global.CORE = CHAT + "/core/";
global.LIB = BASE_DIR + "/node_modules/";
global.CONF = BASE_DIR + "/conf/";
global.STATIC = BASE_DIR + "/static/";
global.view = BASE_DIR + "views";

var express = require("express");
var bodyParser = require("body-parser");
var chat = express();

//视图模版引擎
var handlebars = require('express3-handlebars').create({
    partialsDir: 'views/partials', //默认也是这个目录
    layoutsDir: 'views/layouts/', //默认也是这个目录
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

chat.engine('hbs', handlebars.engine);
chat.set('view engine', 'hbs'); //修改视图引擎配置

//监听端口设置\json和url解析中间件
chat.set('port', process.env.PORT || 3000);
chat.use(bodyParser.json());
chat.use(bodyParser.urlencoded({ extended: false }));

//静态中间件
chat.use(express.static(__dirname + '/public'));

//路由
chat.use(function(req, res, next) {
    if (!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.date = new Date();
    next();
});

chat.use(function(req, res, next) {
    res.locals.showTests = chat.get('env') !== 'production' && req.query.test === '1';
    next();
});

chat.get('/', function(req, res) {
    res.render('chat');
});


//404
chat.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//500
chat.use(function(err, req, res, next) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

chat.listen(chat.get('port'), function() {
    console.log('Express started in ' + chat.get('env') + ' mode on http://localhost:' + chat.get('port') + ' ;press Ctrl-c to terminate');
});



// global.lib = {
//     http: require("http"),
//     fs: require("fs"),
//     url: require("url"),
//     querystring: require("querystring"),
//     router: require("BASE_DIR" + "router"),
//     action: require("CORE" + "action"),
//     jade: require("jade"),
//     scoket: require("scoket.io"),
//     path: require("path"),
//     util: require("util"),
//     parseCoolie: require("connect").utils.parseCookie
// }

// global.onlineList = [];

// global.chat = lib.http.createServer(function(req, res) {
//     res.render = function() {
//         var template = arguments[0];
//         var options = arguments[1];
//         var str = lib.fs.readFileSync(template, 'utf8');
//         var fn = lib.jade.compile(str, { filename: template, pretty: true });
//         var page = fn(options);
//         res.writeHead(200, { 'content-Type': 'text/html' });
//         res.end(page);
//     }
//     lib.router.router(res, req);
// }).listen(8000);

// global.io = lib.scoket.listen(chat);