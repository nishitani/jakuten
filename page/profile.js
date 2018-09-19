var Router = require("router");
var opts = { mergeParams: true };
var router = Router(opts);

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var ejs = require('ejs');
var db = require('../common/db');

router.get("/", function(req, res) {
    if(!req.session || !req.session.user || !req.session.user.id){
        res.statusCode = 404;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile('./resources/templates/_base.ejs', {page: 'error', session: req.session}, function(err, output){
            res.end(output);  
        });
        return;
    }
    var sql = 'SELECT id, email, family_name, first_name, family_name_kana, first_name_kana FROM users WHERE id = ' + req.session.user.id + ';';
    console.log(' SQL: ' + sql);
    var users = db.exec(sql);
    if(!users || !users.length){
        res.statusCode = 404;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile('./resources/templates/_base.ejs', {page: 'error', session: req.session}, function(err, output){
            res.end(output);  
        });
    }else{
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile('./resources/templates/_base.ejs', {page: 'profile', session: req.session, user: users[0].values}, function(err, output){
            res.end(output);  
        });
    }
});

module.exports = router;
