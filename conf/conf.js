module.exports = function(env) {
    switch (env) {
        case 'development':
            return {
                domain: "localhost",
                port: 3000
            }
            break;
        case 'production':
            return {
                domain: "chat.lmllxy.cn",
                port: 3000
            }
            break;
    }
}