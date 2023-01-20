const express = require("express");
const app = express();
const port = 3000;

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/sign-in", (req, res) => {
  const email = req.query.mail;
  const password = req.query.password;
  db.collection("users")
    .where("email", "==", email)
    .where("password", "==", password)
    .get()
    .then((docs) => {
      if (docs.size > 0) {
        var usersData = [];
        db.collection("users")
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              usersData.push(doc.data());
            });
          })
          .then(() => {
            console.log(usersData);
            res.render("ecommerce", { userData: usersData });
          });
      } else {
        res.send("Login failed");
      }
    });
});

app.get("/signup", (req, res) => {
  const full_name = req.query.name;
  //const last_name = req.query.last_name;
  const email = req.query.mail;
  const password = req.query.password;
  db.collection("users")
    .add({
      name: full_name,
      email: email,
      password: password,
    })
    .then(() => {
      res.send("Sign Up Successfully");
    });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.listen(port, () => {
  console.log("server is running on 3000");
});
