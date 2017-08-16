const mongoose = require("mongoose");
const userModel = require('./user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/chat');
// 为这次连接绑定事件
const db = mongoose.connection;
db.on('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));

const User = userModel(mongoose);

module.exports = {
    User: User
}

// module.exports = Models