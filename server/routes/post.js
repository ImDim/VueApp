module.exports = app => {
  const posts = require("../controllers/Post.js");
  const authMiddleware = require('../middleware/auth.js')

  var router = require("express").Router();

  // Create a new Post
  router.post("/", authMiddleware, posts.create);

  // Retrieve all Posts
  router.get("/", posts.findAll);

  // Retrieve all published Posts
  router.get("/published", posts.findAllPublished);

  // Retrieve a single Post with id
  router.get("/:id", posts.findOne);

  // Update a Post with id
  router.put("/:id", authMiddleware, posts.update);

  // Delete a Post with id
  router.delete("/:id", authMiddleware, posts.delete);

  // Create a new Post
  router.delete("/", authMiddleware, posts.deleteAll);

  app.use('/api/posts', router);
};