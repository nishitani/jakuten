var http = require("http");
var Router = require("router");
var finalhandler = require('finalhandler');
var contents = require("./contents");
var api = require("./api");
require("./common/session");

function start() {
  var opts = { mergeParams: true };
  var router = Router(opts);
  var server = http.createServer(function onRequest(req, res) {
    router(req, res, finalhandler(req, res));
  });

  router.use("/js/*", contents);
  router.use("/css/*", contents);
  router.use("/img/*", contents);
  router.use("/api/:api", session, api);
  router.get("/", session, require("./page/top"));
  router.use("/cart", session, require("./page/cart"));
  router.use("/profile/:uid", session, require("./page/profile"));
  router.use("/cat/:cat", session, require("./page/cat"));
  router.use("/item/:id", session, require("./page/item"));

  server.listen(3000);
  console.log("Welcome to JAKUTEN STORE.");
}

exports.start = start;
