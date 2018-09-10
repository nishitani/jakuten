exports.parse = function(cookie){
    var session = {};
    try{
        var raw = (cookie + ';').match(/jakuten=(.+?);/);
        session = JSON.parse(unescape(raw[1]));
    }catch(err){
    }

    return session;
}
exports.build = function(session){
    return escape(JSON.stringify(session));
}