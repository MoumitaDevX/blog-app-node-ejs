const express = require("express");
const app = express();
const PORT = 3000;

let blogs = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// Show all blogs
app.get("/blogs", (req, res) => {
  res.render("index", { blogs });
});

// Form to create new blog
app.get("/blogs/new", (req, res) => {
  res.render("new");
});

// Handle new blog post
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  const newBlog = {
    id: Date.now(),
    title,
    content,
  };
  blogs.push(newBlog);
  res.redirect("/blogs");
});

// Show individual blog
app.get("/blogs/:id", (req, res) => {
  const blog = blogs.find((b) => b.id == req.params.id);
  if (!blog) return res.send("Blog not found");
  res.render("show", { blog });
});

// Edit blog form
app.get("/blogs/:id/edit", (req, res) => {
  const blog = blogs.find((b) => b.id == req.params.id);
  if (!blog) return res.send("Blog not found");
  res.render("edit", { blog });
});

// Update blog post
app.post("/blogs/:id/update", (req, res) => {
  const blog = blogs.find((b) => b.id == req.params.id);
  blog.title = req.body.title;
  blog.content = req.body.content;
  res.redirect("/blogs/" + blog.id);
});

// Delete blog post
app.post("/blogs/:id/delete", (req, res) => {
  blogs = blogs.filter((b) => b.id != req.params.id);
  res.redirect("/blogs");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
