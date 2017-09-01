var Models = require('../mongodb/mongoModel');

exports.init = function(req, res, next) {
    //判断是否记录登录,没有登陆状态设置未登录
    if (!req.session.signState) {
        req.session.signState = false;
    } else {
        res.locals.signState = true;
    }
    console.log(req);
    //判断是否打开测试开关
    // res.locals.showTests = chat.get('env') !== 'production' && req.query.test === '1';
    next();
}

exports.chatCont = function(req, res) {
    if (req.session.signState) {
        res.locals.userName = req.session.username;
        res.render('chat');
    } else {
        res.redirect(303, '/signin');
    }
}

exports.login = function(req, res) {
    Models.User.find({ account: req.body.signAccount }, function(err, user) {
        const faileMsg = {
            state: "faile",
            msg: ""
        }
        if (err) {
            console.log("find err");
            faileMsg.msg = "服务器错误,请刷新尝试!";
            return res.json(faileMsg);
        }
        if (!user.length) {
            console.log("find null");
            faileMsg.msg = "该用户不存在!";
            return res.json(faileMsg);
        } else if (user.length > 1) {
            console.log("mongodb 数据异常");
            return;
        }

        var pwd = user[0].pwd;
        if (pwd == req.body.signPwd) {
            req.session.signState = true;

            req.session.username = req.body.signAccount;
            var context = {
                state: "success",
                url: "chat"
            }
            return res.json(context);
        } else {
            faileMsg.msg = "密码错误!";
            return res.json(faileMsg);
        }
    });
}

exports.registered = function(req, res) {
    Models.User.find(function(err, users) {
        if (err) return;
        let authId = users.length;
        let isExist = false;

        users.map(function(user) {
            if (user.account == req.body.signAccount) {
                isExist = true;
                return res.json({ state: "isExist", msg: "该用户已经存在" });
            }
        });

        if (!isExist) {
            let userPerson = new Models.User({
                authId: authId,
                name: req.body.signName,
                pwd: req.body.signPwd,
                account: req.body.signAccount,
                created: new Date().getTime(),
                isAdmin: false
            });

            userPerson.save(function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    var context = {
                        state: "success",
                        url: "signin"
                    }
                    res.json(context);
                }
            });
        }
    });


}

exports.signout = function(req, res) {
    req.session.signState = false;
    res.locals.signState = false;
    res.redirect(303, '/signin');
}