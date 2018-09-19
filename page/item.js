var Router = require("router");
var opts = { mergeParams: true };
var router = Router(opts);

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var ejs = require('ejs');
var db = require('../common/db');

router.get("/", function(req, res) {
    var sql = 'SELECT id, sku, name, title, desc FROM items WHERE id = ' + req.params.id + ';';
    console.log(' SQL: ' + sql);
    var items = db.exec(sql);

    if(!items || !items.length){
        res.statusCode = 404;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile('./resources/templates/_base.ejs', {page: 'error', session: req.session}, function(err, output){
            res.end(output);  
        });
    }else{
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile('./resources/templates/_base.ejs', {page: 'item', session: req.session, item: items[0].values[0]}, function(err, output){
            res.end(output);  
        });
    }
});

module.exports = router;
