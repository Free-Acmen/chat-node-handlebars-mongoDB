var Models = require('../mongodb/mongoModel');

exports.init = function(req, res, next) {
    //判断是否记录登录,没有登陆状态设置未登录
    if (!req.session.signState) {
        req.session.signState = false;
    }
    //判断是否打开测试开关
    // res.locals.showTests = chat.get('env') !== 'production' && req.query.test === '1';
    next();
}

exports.chatCont = function(req, res) {
    if (req.session.signState) {
        res.render('chat');
    } else {
        res.redirect(303, '/');
    }
}

exports.login = function(req, res) {
    console.log(req.body);
    // res.render('chat');
    Models.User.find({ account: req.body.signName }, function(err, user) {
        if (err) {
            console.log("find err");
            return;
        }
        console.log(user.length);
        if (!user.length) {
            console.log("find null");
            return res.json({ state: "noone" });
        }

        console.log(user);
        var pwd = user[0].pwd;

        if (pwd == req.body.signPwd) {
            req.session.signState = true;
            var context = {
                state: "success",
                url: "chat"
            }
            return res.json(context);
        } else {
            return res.json({ state: "pwd worang" });
        }
    });
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