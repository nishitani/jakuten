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
    var banners = db.exec("SELECT id, title, desc, link FROM banners;");
    var cards = db.exec("SELECT id, sku, name, title FROM items;");
    res.statusCode = 200;
    res.setHeader("Content-Type", 'text/html; utf-8');
    ejs.renderFile('./resources/templates/_base.ejs', {page: 'top', session: session, banners: banners[0].values, cards: cards[0].values}, function(err, output){
        res.end(output);  
    });
});

module.exports = router;
