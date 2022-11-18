const _ = require("lodash");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
mongoose.connect(
  "mongodb+srv://admin-darrell:bandung60906@cluster0.6xltdwt.mongodb.net/blogDB"
);

const postSchema = {
  title: String,
  body: String,
  link: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  Post.find((err, found) => {
    res.render("index", {
      posts: found,
    });
  });
});

app.get(`/post/:post`, (req, res) => {
  const id = req.params.post;
  Post.findById(id, (err, found) => {
    res.render("post", { title: found.title, body: found.body });
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/", (req, res) => {
  const title = req.body.title;
  const body = req.body.post;
  const link = _.kebabCase(title);
  const post = new Post({
    title: title,
    body: body,
    link: link,
  });
  post.save().then(res.redirect("/"));
});

app.listen(3000, () => console.log("App listening on port 3000!"));
