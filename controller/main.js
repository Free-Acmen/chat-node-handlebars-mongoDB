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
    Models.User.find({ account: req.body.signAccount }, function(err, user) {
        if (err) {
            console.log("find err");
            return;
        }
        console.log(user.length);
        if (!user.length) {
            console.log("find null");
            return res.json({ state: "noone" });
        } else if (user.length > 1) {
            console.log("mongodb 数据异常");
            return;
        }

        var pwd = user[0].pwd;
        if (pwd == req.body.signPwd) {
            req.session.signState = true;
            console.log(req);
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
    Models.User.find(function(err, users) {
        if (err) return;
        let authId = users.length;
        let isExist = false;

        users.map(function(user) {
            if (user.account == req.body.signAccount) {
                isExist = true;
                return res.json({ state: "isExist" });
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
                        url: ""
                    }
                    res.json(context);
                }
            });
        }
    });


}