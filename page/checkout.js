var Router = require("router");
var opts = { mergeParams: true };
var router = Router(opts);

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var ejs = require('ejs');

router.get("/", function(req, res) {
    if(!req.session || !req.session.cart || !req.session.cart.items){
        res.statusCode = 404;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile('./resources/templates/_base.ejs', {page: 'error', session: req.session}, function(err, output){
            res.end(output);  
        });
    }else{
        var items = req.session.cart.items;
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/html; utf-8');
        ejs.renderFile('./resources/templates/_base.ejs', {page: 'checkout', session: req.session}, function(err, output){
            res.end(output);  
        });
    }
});

module.exports = router;
