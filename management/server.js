const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

connection.connect();

app.get("/api/customers", (req, res, next) => {
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    res.send(rows);
  });
});

// app.get("/api/hello", (req, res, next) => {
//   res.send({ message: "HELLO EXPRESS" });
// });

app.listen(port, () => console.log(`listening on port  {${port}}`));
