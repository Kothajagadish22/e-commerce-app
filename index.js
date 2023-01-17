const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Good morning");
});
app.get("/movie", (req, res) => {
  res.send("RRR and valteir verraya is famous");
});
app.listen(port, () => {
  console.log("server is running on 3000");
});
