// var Login = require(CON + "login");

// exports.router = function(req, res) {
//     var pathname = decodeURI(lib.url.parse(req.url).pathname);
//     lib.httpParam.init(req, res);
// }

module.exports = function(chat) {
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
}