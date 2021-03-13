var express = require("express");
var app = express();
var cors = require("cors");
var mysql = require("mysql");

app.use(express.json());
app.use(cors());

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "users",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const gameInfo = JSON.stringify(req.body.gameInfo);

  db.query(
    "INSERT INTO usersinfo (username,password, gameInfo) VALUES(?,?,?)",
    [username, password, gameInfo]
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM usersinfo WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) res.send({ err: err });

      if (result.length > 0) res.send(result.data[0].password);
      else res.send({ message: "Wrong username and password" });
      console.log(result.password);
    }
  );
});

app.post("/save", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM usersinfo WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) res.send({ err: err });

      if (result.length > 0) res.send(result);
      else res.send({ message: "Wrong username and password" });
      console.log(result);
    }
  );
});

app.listen(3001, function () {
  console.log("server is running");
});
