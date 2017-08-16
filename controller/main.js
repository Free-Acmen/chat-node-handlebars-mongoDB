var Models = require('../mongodb/mongoModel');


exports.init = function(req, res, next) {
    //判断是否记录登录,没有登陆状态设置未登录
    if (!req.session.signState) {
        req.session.signState = false;
    }
    //判断是否打开测试开关
    res.locals.showTests = chat.get('env') !== 'production' && req.query.test === '1';
    next();
}

exports.login = function(req, res) {
    req.session.signState = true;
    console.log(req.query);
    console.log(req.body);
    res.render('chat');
}

exports.registered = function(req, res) {
    let userPerson = new Models.User({
        authId: '0',
        name: 'admin',
        pwd: 'admin',
        email: 'lmllsq@126.com',
        phone: '18695875698',
        created: new Date().getTime()
    });

    userPerson.save(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render('sign');
        }
    });
}