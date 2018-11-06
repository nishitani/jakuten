
var path = require('path');
var Router = require("router");
var opts = { mergeParams: true };
var router = Router(opts);

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var ejs = require('ejs');
var db = require('../common/db');

router.get("/", async function(req, res) {
    if(!req.session || !req.session.user || !req.session.user.id){
        res.statusCode = 302;
        res.setHeader("Location", '/');
        res.end();
        return;
    }
    var uid = req.params.uid ? Number(req.params.uid) :  req.session.user.id;
    var result = await db.all('SELECT * FROM orders LEFT JOIN order_items ON orders.id = order_items.order_id WHERE user_id = ' + uid + ';');
    var histories = {};
    result.forEach(function(entry){
        if(!histories[entry.order_id]){
            histories[entry.order_id] = {
                user_id : entry.user_id,
                order_date : entry.order_date,
                pan : entry.pan,
                expire_month : entry.expire_month,
                expire_year : entry.expire_year,
                cvc : entry.cvc,
                zip : entry.zip,
                tel : entry.tel,
                shipping_address : entry.shipping_address,
                total : entry.total,
                items : [] 
            };
        }
        histories[entry.order_id].items.push({
            sku : entry.sku,
            item_name : entry.item_name,
            item_title : entry.item_title,
            price  : entry.price,
            amount : entry.amount
        });

        console.log(histories);
    });
    if(!histories){
        res.statusCode = 404;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile(path.join(__dirname, '../../resources/templates/_base.ejs'), {page: 'error', session: req.session}, function(err, output){
            res.end(output);  
        });
    }else{
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile(path.join(__dirname, '../../resources/templates/_base.ejs'), {page: 'history', session: req.session, histories: histories}, function(err, output){
            res.end(output);  
        });
    }
});

module.exports = router;

