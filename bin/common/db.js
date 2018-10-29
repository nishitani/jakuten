var fs = require('fs');
var path = require('path');

var SQL = require('sqlite3').verbose();

var file = './db.sqlite';
var db = prepare();

function prepare(){
    try{
        var stat = fs.statSync(file);
        stat.isFile();
    }catch(err){
        var data = fs.readFileSync(path.join(__dirname, '../../resources/db.sqlite'));
        fs.writeFileSync('./db.sqlite', data);
    }
    var db = new SQL.Database(file);
    db.serialize();
    return db;
};

exports.all =  function(sql, rows){
    return new Promise((resolve) => {
        db.serialize( function() {
            db.all(sql, function (error, rows){
                console.log('  SQL:' + sql);
                resolve(rows);
            });
        });
    });
}
exports.get =  function(sql, rows){
    return new Promise((resolve) => {
        db.serialize( function() {
            db.get(sql, function (error, row){
                console.log('  SQL:' + sql);
                resolve(row);
            });
        });
    });
}
exports.run =  function(sql, rows){
    return new Promise((resolve) => {
        db.serialize( function() {
            db.run(sql, function (error){
                console.log('  SQL:' + sql);
                resolve(null);
            });
        });
    });
}