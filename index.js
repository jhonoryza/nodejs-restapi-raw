const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require("mysql");

require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "secret",
  database: "restful_db",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("mysql connected");
});

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.get("/api/products", (req, res) => {
  let sql = "select * from product";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        data: result,
      }),
      200
    );
  });
});

app.get("/api/products/:id", (req, res) => {
  let sql = "SELECT * FROM product WHERE product_id=" + req.params.id;
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

app.post("/api/products", (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
  };
  let sql = "INSERT INTO product SET ?";
  conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

app.put("/api/products/:id", (req, res) => {
  let sql =
    "UPDATE product SET product_name='" +
    req.body.product_name +
    "', product_price='" +
    req.body.product_price +
    "' WHERE product_id=" +
    req.params.id;
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

app.delete("/api/products/:id", (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.params.id + "";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
