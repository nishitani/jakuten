// var fs = require('fs');

// if (!fs.existsSync('./node_modules/')) {
//     fs.mkdirSync('./node_modules/');
// }
// if (!fs.existsSync('./node_modules/sqlite3/')) {
//     fs.mkdirSync('./node_modules/sqlite3/');
// }
// if (!fs.existsSync('./node_modules/sqlite3/lib/')) {
//     fs.mkdirSync('./node_modules/sqlite3/lib/');
// }
// if (!fs.existsSync('./node_modules/sqlite3/lib/binding/')) {
//     fs.mkdirSync('./node_modules/sqlite3/lib/binding/');
// }
// if (!fs.existsSync('./node_modules/sqlite3/lib/binding/node-v64-win32-x64/')) {
//     fs.mkdirSync('./node_modules/sqlite3/lib/binding/node-v64-win32-x64/');
// }

// try{
//     var stat = fs.statSync(path.join(__dirname, '../node_modules/sqlite3/lib/binding/node-v64-win32-x64/node_sqlite3.node'));
// }catch(err){
//     var data = fs.readFileSync('../resources/node_sqlite3.node');
//     fs.writeFileSync(path.join(__dirname, '../node_modules/sqlite3/lib/binding/node-v64-win32-x64/node_sqlite3.node'), data);
// }