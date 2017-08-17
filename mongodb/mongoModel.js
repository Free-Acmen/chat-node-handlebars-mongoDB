const mongoose = require("mongoose");
const userModel = require('./user');

var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    },
    useMongoClient: true
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/chat', opts); //指定 keepAlive 选项，以防止长期运行的应用程序（比如网站） 出现数据库连接错误
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