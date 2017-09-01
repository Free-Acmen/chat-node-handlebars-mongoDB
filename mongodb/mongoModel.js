const mongoose = require("mongoose");
const userModel = require('./user');

var dev = process.env.NODE_ENV || "development";
const config = require('../conf/conf')(dev.replace(/^\s|\s$/g, ""));
var connectUrl = 'mongodb://' + config.domain + ':27017/chat';

var opts = {
    server: {
        socketOptions: { keepAlive: true }
    },
    useMongoClient: true
};

mongoose.Promise = global.Promise;
mongoose.connect(connectUrl, opts); //指定 keepAlive 选项，以防止长期运行的应用程序（比如网站） 出现数据库连接错误
// 为这次连接绑定事件
const db = mongoose.connection;
db.on('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));

const User = userModel(mongoose);

User.find(function(err, user) {
    if (user.length) {
        return;
    }
    new User({
        authId: 0,
        name: "admin",
        pwd: "admin",
        account: "lmllsq@126.com",
        created: new Date().getTime(),
        isAdmin: true
    }).save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    });
});

module.exports = {
    User: User
}

// module.exports = Models