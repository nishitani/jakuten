var path = require('path');
var Router = require("router");
var opts = { mergeParams: true };
var router = Router(opts);

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var ejs = require('ejs');
var db = require('../common/db');
var utils = require('../common/utils');

router.get("/", async function(req, res) {
    var item = await db.get('SELECT id, sku, name, title, desc, original_price, sale_price FROM items WHERE id = ' + req.params.id + ';');
    var comments = await db.all('SELECT entry_date, comment, family_name , first_name FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE item_id = ' + req.params.id + ' ORDER BY entry_date desc limit 10;');
    if(!item){
        res.statusCode = 404;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile(path.join(__dirname, '../../resources/templates/_base.ejs'), {page: 'error', session: req.session}, function(err, output){
            res.end(output);  
        });
    }else{
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile(path.join(__dirname, '../../resources/templates/_base.ejs'), {page: 'item', session: req.session, item: item, comments : comments, utils: utils}, function(err, output){
            res.end(output);  
        });
    }
});

module.exports = router;
