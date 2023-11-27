const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo.js");
const User = require("../models/User.js");
// RSA KEY
const privateKey = process.env.PRIVATE_KEY;

// Authorization middleware
router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing!" });
  }
});

// CREATE
router.post("/", function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
  });
  return todo
    .save()
    .then(async (savedTodo) => {
      // updating user with ref of todo
      await User.findById(req.payload.id).then((user) => {
        user.todos.push(savedTodo._id);
        user.save();
      });
      return res.status(201).json(savedTodo);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

// READ
router.get("/", function (req, res) {
  User.findById(req.payload.id)
    .populate("todos")
    .then((user) => res.status(200).json(user.todos))
    .catch((error) => res.status(400).json({ error: error.message }));
});

// UPDATE
router.put("/:id", function (req, res) {
  Todo.findById(req.params.id)
    .then((todo) => {
      todo.complete = req.body.complete;
      todo.dateCompleted = req.body.dateCompleted;
      todo
        .save()
        .then((updatedTodo) => res.status(201).json(updatedTodo))
        .catch((error) => res.status(500).json({ error: error.message }));
    })
    .catch((error) => res.status(400).json({ error: error.message }));
});

// DELETE
router.delete("/:id", function (req, res) {
  Todo.findByIdAndDelete(req.params.id)
    .then(async (deletedTodo) => {
      await User.findById(req.payload.id).then((user) => {
        user.todos = user.todos.filter((todo) => !todo.equals(deletedTodo._id));
        user.save();
      });
      return res.status(200).json(deletedTodo);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = router;
