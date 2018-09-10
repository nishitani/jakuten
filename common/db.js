var fs = require('fs');
var SQL = require('sql.js');
var file = './db.sqlite';
var db = prepare();
module.exports = db;

function prepare(){
    try{
        var stat = fs.statSync(file);
        if(!stat.isFile()){
            file = './resources/db.sqlite';
        }
    }catch(err){
        file = './resources/db.sqlite';
    }
    var filebuffer = fs.readFileSync(file);
    var db = new SQL.Database(filebuffer);
    return db;
};
