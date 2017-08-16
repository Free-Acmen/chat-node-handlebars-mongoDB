var Models = require('../mongodb/mongoModel')

exports.login = function(req, res) {
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