const mysql = require("mysql");
//connection to Database
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "jesu1",
    password: "password123",
    database: "burgers_db",
  });
}
connection.connect();

module.exports = connection;
