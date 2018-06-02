var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'xx.xxx.xx.xx',
  user            : 'username',
  password        : 'password',
  database        : 'databasename'
});
module.exports.pool = pool;
