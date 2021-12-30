var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123654789s",
  database:"mydb"
});


con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customers", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

  