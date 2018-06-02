var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : '99.189.11.11',
  user            : 'CS290',
  password        : '1ch33s31',
  database        : 'website'
});
module.exports.pool = pool;