var mainCont = require("./controller/main");

module.exports = function(chat) {
    chat.use(mainCont.init);

    chat.get('/', function(req, res) {
        if (req.session.signState) {
            res.redirect(303, '/chat');
        } else {
            res.redirect(303, '/signin');
        };
    });

    chat.get('/signin', function(req, res) {
        res.render('sign');
    });
    chat.get('/signup', function(req, res) {
        res.render('register');
    });

    chat.get('/chat', mainCont.chatCont);
    chat.get('/signout', mainCont.signout);
    chat.post('/sign-in', mainCont.login);
    chat.post('/sign-up', mainCont.registered);

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