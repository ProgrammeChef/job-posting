const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());

const auth = require("./src/routes/auth");
const job = require("./src/routes/job");

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

app.use("/api/auth", auth, (req, res) => res.sendStatus(401));
app.use("/api/job", job, (req, res) => res.sendStatus(401));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
