const express = require("express");

const { books } = require("../data/books.json");

const router = express.Router();

/**
 * Routes Created /books
 * method: Get
 * description: get all books
 * response: json
 * Access: public
 * Parameters: none
 */

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    data: books,
  });
});

/**
 * Routes Created /users/(id)
 * method: Get
 * description: get singke users
 * response: json
 * Access: public
 * Parameters: Id
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => parseInt(book.id) === parseInt(id));
  if (!book) {
    return res.status(404).json({
      status: false,
      message: "user not found",
    });
  }
  return res.status(200).json({
    status: true,
    data: book,
  });
});

module.exports = router;
