var express = require("express");
var bodyParser = require("body-parser");
var router = require("./router");
var credentials = require('./conf/credentials');
var socketIo = require("socket.io");
var chat = express();
var userList = [];

//视图模版引擎
var handlebars = require('express3-handlebars').create({
    partialsDir: './views/partials/', //默认也是这个目录
    layoutsDir: './views/layouts/', //默认也是这个目录
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        static: function(name) {
            return require('./conf/static.js').map(name);
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

//会话存储
chat.use(require('cookie-parser')(credentials.cookieSecret));
chat.use(require('express-session')());

//路由
router(chat);

const server = chat.listen(chat.get('port'), function() {
    console.log('Express started in ' + chat.get('env') + ' mode on http://localhost:' + chat.get('port') + ' ;press Ctrl-c to terminate');
});

socketIo.listen(server).on('connection', function(socket) {
    socket.on('message', function(data) {
        console.log(data);
        socket.broadcast.emit('message', data);
    });
    socket.on('join', function(name) {
        console.log(name);
        if (userList.indexOf(name) == -1) {
            userList.push(name);
        }
        socket.broadcast.emit('join', userList);
        socket.emit('join', userList);
    });
});