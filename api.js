var Router = require("router");
var opts = { mergeParams: true };
var router = Router(opts);

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var sessionHandler = require("./common/session");

var db = require('./common/db');

router.post("/", function(req, res) {
    var session = sessionHandler.parse(req.headers.cookie) || {};
    console.log('API: ' + req.params.api + ' / Session Data: ' + JSON.stringify(session));
    res.setHeader("Content-Type", "application/json");
    var body = {};
    switch(req.params.api){
        case "login":
            var query = 'SELECT id, email, family_name, first_name, family_name_kana, first_name_kana FROM users WHERE email = "' + req.body.email + '" AND password = "' + req.body.password + '";';
            console.log(query);
            var result = db.exec(query);
            if(result.length > 0){
                res.statusCode = 200;
                body = {
                    id: result[0].values[0][0],
                    email: result[0].values[0][1],
                    display_name: result[0].values[0][2] + " " + result[0].values[0][3],
                    family_name: result[0].values[0][2],
                    first_name: result[0].values[0][3]
                };
                session.user = body;
            }else{
                res.statusCode = 404;
                body = {error:'Login failed.'};
            }
            break;
        case "logout":
            res.statusCode = 200;
            body = {};
            session.user = {};
            break;
        case "register":
            if(!req.body.email || !req.body.password || !req.body.family_name || !req.body.first_name || !req.body.family_name_kana || !req.body.first_name_kana){
                res.statusCode = 400;
                body = {error:'Parameter missing.'};
            }else{
                try{
                    var query = 'insert into users (email, password, family_name, first_name, family_name_kana, first_name_kana) VALUES('
                        + '"' + req.body.email + '",'
                        + '"' + req.body.password + '",'
                        + '"' + req.body.family_name + '",'
                        + '"' + req.body.first_name + '",'
                        + '"' + req.body.family_name_kana + '",'
                        + '"' + req.body.first_name_kana + '"'
                        + ');';
                    console.log(query);
                    var result = db.exec(query);
                    res.statusCode = 200;
                    body = {
                        id: 9,
                        email: req.body.email,
                        display_name: req.body.family_name + " " + req.body.first_name,
                        family_name: req.body.family_name,
                        first_name: req.body.first_name
                    };
                    session.user = body;
                }catch(err){

                }
            }
            break;
        default:
            res.statusCode = 404;
            body = {error: 'No such API.'};
}
    res.setHeader('Set-Cookie','jakuten=' + sessionHandler.build(session) + '; path=/; max-age=1800;');
    res.end(JSON.stringify(body));
});

module.exports = router;
