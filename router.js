var Login = require(CON + "login");

exports.router = function(req, res) {
    var pathname = decodeURI(lib.url.parse(req.url).pathname);
    lib.httpParam.init(req, res);
}