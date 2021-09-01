//const db = require("../models");
const Post = require("../models/Post");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return {
    limit,
    offset
  };
};

// Create and Save a new Post
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Post
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Post in the database
  try {
    const data = await post.save(post);
    res.send(data);

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Post."
    });
    return;
  }
};

// Retrieve all Posts from the database.
exports.findAll = async (req, res) => {
  const {
    page,
    size,
    title
  } = req.query;

  const condition = title ? {
    title: {
      $regex: new RegExp(title),
      $options: "i"
    }
  } : {};

  const {
    limit,
    offset
  } = getPagination(page, size);

  try {
    const data = await Post.paginate(condition, {
      offset,
      limit
    });

    res.send({
      totalItems: data.totalDocs,
      posts: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving posts."
    });
    return;
  }
};

// Find a single Post with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Post.findById(id);
    if (!data) {
      res.status(404).send({
        message: "Not found Post with id " + id
      });
      return;
    }

    res.send(data);

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        message: "Error retrieving Post with id=" + id
      });
    return;
  }
};

// Update a Post by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  try {
    const data = await Post.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    });

    if (!data) {
      res.status(404).send({
        message: `Cannot update Post with id=${id}. Maybe Post was not found!`
      });
      return;
    }

    res.send({
      message: "Post was updated successfully."
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error updating Post with id=" + id
    });
    return;
  }
};

// Delete a Post with the specified id in the request
exports.delete = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const data = await Post.findByIdAndRemove(id);
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
      });
    } else {
      res.send({
        message: "Post was deleted successfully!"
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not delete Post with id=" + id
    });
    return;
  }
};

// Delete all Posts from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await Post.deleteMany({});
    res.send({
      message: `${data.deletedCount} Posts were deleted successfully!`
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || "Some error occurred while removing all posts."
    });
    return;
  }
};

// Find all published Posts
exports.findAllPublished = async (req, res) => {
  try {
    const {
      page,
      size
    } = req.query;
    const {
      limit,
      offset
    } = getPagination(page, size);

    const data = await Post.paginate({
      published: true
    }, {
      offset,
      limit
    });
    res.send({
      totalItems: data.totalDocs,
      posts: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving posts."
    });
    return;
  }
};