var Router = require("router");
var opts = { mergeParams: true };
var router = Router(opts);

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var ejs = require('ejs');
var db = require('../common/db');

// var session = require("../common/session");

router.get("/", function(req, res) {
    var sql = 'SELECT id, title, desc, link FROM banners;';
    console.log(' SQL: ' + sql);
    var banners = db.exec(sql);
    sql = 'SELECT id, sku, name, title FROM items;';
    console.log(' SQL: ' + sql);
    var cards = db.exec(sql);
    res.statusCode = 200;
    res.setHeader("Content-Type", 'text/html; utf-8');
    ejs.renderFile('./resources/templates/_base.ejs', {page: 'top', session: req.session, banners: banners[0].values, cards: cards[0].values}, function(err, output){
        res.end(output);  
    });
});

module.exports = router;
