const mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ideathon19"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;