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
 * Routes Created /books
 * method: Post
 * description: add a new book
 * response: json
 * Access: public
 * Parameters: none
 */

router.post("/", (req, res) => {
  const { id, name, genre, price, publisher } = req.body;
  const book = books.find((each) => parseInt(each.id) === parseInt(id));
  if (book) {
    return res.status(404).json({
      status: false,
      message: "book already exists",
    });
  }
  const newBook = {
    id,
    name,
    genre,
    price,
    publisher,
  };
  books.push(newBook);
  res.status(201).json({
    status: true,
    message: "book created successfully",
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

/**
 * Routes Created /users/(id)
 * method: Put
 * description: Edit a book
 * response: json
 * Access: public
 * Parameters: Id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => parseInt(each.id) === parseInt(id));
  if (!book) {
    return res.status(404).json({
      status: false,
      message: "book not found",
    });
  } else {
    const updatedBooks = books.map((each) => {
      if (parseInt(each.id) === parseInt(id)) {
        return { ...each, ...data };
      }
      return each;
    });
    return res.status(201).json({
      status: true,
      message: "book updated",
      updated: updatedBooks,
    });
  }
});

module.exports = router;
