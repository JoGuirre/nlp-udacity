const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
app.listen(8080, () => console.log("Listening on port: 8080"));
app.use(express.static("dist"));
app.use(express.json({ limit: "1mb" }));
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/", (req, res) => {
  const data = req.body;
  res.json(data);
});
