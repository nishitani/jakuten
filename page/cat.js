var Router = require("router");
var opts = { mergeParams: true };
var router = Router(opts);

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var ejs = require('ejs');
var db = require('../common/db');

var sessionHandler = require("../common/session");

router.get("/", function(req, res) {
    var session = sessionHandler.parse(req.headers.cookie)  || {};
    console.log('PAGE: ' + req.params.page + ' / Session Data: ' + JSON.stringify(session));
    var items = db.exec('SELECT id, sku, name, title FROM items WHERE category = "' + req.params.cat + '";');
    if(!items || !items.length){
        res.statusCode = 404;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile('./resources/templates/_base.ejs', {page: 'error', session: session}, function(err, output){
            res.end(output);  
        });
    }else{
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile('./resources/templates/_base.ejs', {page: 'cat', session: session, category: req.params.cat, items: items[0].values}, function(err, output){
            res.end(output);  
        });
    }
});

module.exports = router;
