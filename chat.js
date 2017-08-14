global.BASE_DIR = __dirname;
global.CHAT = BASE_DIR + "/chat/";
global.CONT = CHAT + "/controller/";
global.CORE = CHAT + "/core/";
global.LIB = BASE_DIR + "/node_modules/";
global.CONF = BASE_DIR + "/conf/";
global.STATIC = BASE_DIR + "/static/";
global.view = BASE_DIR + "view";
global.lib = {
    http: require("http"),
    fs: require("fs"),
    url: require("url"),
    querystring: require("querystring"),
    router: require("BASE_DIR" + "router"),
    action: require("CORE" + "action"),
    jade: require("jade"),
    scoket: require("scoket.io"),
    path: require("path"),
    util: require("util"),
    parseCoolie: require("connect").utils.parseCookie
}

global.onlineList = [];

global.chat = lib.http.createServer(function(req, res) {
    res.render = function() {
        var template = arguments[0];
        var options = arguments[1];
        var str = lib.fs.readFileSync(template, 'utf8');
        var fn = lib.jade.compile(str, { filename: template, pretty: true });
        var page = fn(options);
        res.writeHead(200, { 'content-Type': 'text/html' });
        res.end(page);
    }
    lib.router.router(res, req);
}).listen(8000);

global.io = lib.scoket.listen(chat);