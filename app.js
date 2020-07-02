const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Wake Up", "Have Breakfast"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render("list", {listTitle: day, newItems: items});
});

app.post("/", function(req, res){
  const item = req.body.NewItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work list", newItems: workItems});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
