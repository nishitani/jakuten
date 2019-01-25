var md5 = require('md5');

sessions = {};
session = (req, res, next) => {
    var sid = (req.headers.cookie + ';').match(/jakuten=(.+?);/);
    if(!sid || !sid[1] || !sessions[sid[1]]){
        // sid = md5(String(Object.keys(sessions).length + 1));
        sid = String(Object.keys(sessions).length + 4307).padStart(12, '0');
        sessions[sid] = {user: {}, cart: {}};
    }else{
        sid = sid[1];
    }
    console.log('  SID: ' + sid + ", SESSION: " + JSON.stringify(sessions[sid]));
    req.sid = sid;
    req.session = sessions[sid];
    res.setHeader('Set-Cookie', 'jakuten=' + sid + '; path=/; max-age=1800;');
    var role = (req.headers.cookie + ';').match(/role=(.+?);/);
    if(!role){
        res.setHeader('Set-Cookie', 'role=guest; path=/; max-age=1800;');
    }
    next();
};

function update(sid, session){
    sessions[sid] = session;
}
// exports.parse = function(cookie){
//     var session = {};
//     switch(session_scheme){
//         case 'mem':
//             try{
//                 var raw = (cookie + ';').match(/jakuten=(.+?);/);
//                 session = sessions[raw[1]];
//             }catch(err){
//                 console.log(JSON.stringify(err));
//             }
//             break;
//         default:
//             try{
//                 var raw = (cookie + ';').match(/jakuten=(.+?);/);
//                 session = JSON.parse(unescape(raw[1]));
//             }catch(err){
//                 console.log(JSON.stringify(err));
//             }
//     }
//     console.log(' SESSIOM:' + JSON.stringify(session));
//     return session;
// }
// exports.build = function(session){
//     var value = '';
//     switch(session_scheme){
//         case 'mem':
//             var sid = md5(String(session.user.id));
//             sessions[sid] = session;
//             value = sid;
//             break;
//         default:
//             value = JSON.stringify(session);
//     }
//     return escape(value);
// }

