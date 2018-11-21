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
    return new Promise((resolve, reject) => {
        console.log('  SQL:' + sql);
        db.serialize( function() {
            db.all(sql, function (error, rows){
                if(error){
                    reject(new Error('Databse Error: SQL=' + sql + '\n-----\n' + error.stack ));
                }else{
                    resolve(rows);
                }
            });
        });
    });
}
exports.get =  function(sql, rows){
    return new Promise((resolve, reject) => {
        console.log('  SQL:' + sql);
        db.serialize( function() {
            db.get(sql, function (error, row){
                if(error){
                    reject(new Error('Databse Error: SQL=' + sql + '\n-----\n' + error.stack ));
                }else{
                    resolve(row);
                }
            });
        });
    });
}
exports.run =  function(sql, rows){
    return new Promise((resolve, reject) => {
        console.log('  SQL:' + sql);
        db.serialize( function() {
            db.run(sql, function (error){
                if(error){
                    reject(new Error('Databse Error: SQL=' + sql + '\n-----\n' + error.stack ));
                }else{
                    resolve(null);
                }
            });
        });
    });
}