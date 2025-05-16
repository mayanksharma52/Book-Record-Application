const express = require("express");

const { books } = require("../data/books.json");

const { users } = require("../data/users.json");

const router = express.Router();

const { book, user } = require("../models/index.js");

const {
  getAllUser,
  getUserById,
} = require("../controllers/books.controllers.js");

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

/**
 * Routes Created /issued/by-user
 * method: Get
 * description: get all issued books by user
 * response: json
 * Access: public
 * Parameters: none
 */

router.get("/issued/by-user", (req, res) => {
  const userwithissuedbook = users.filter((each) => {
    if (each.isIssuedBook) {
      return each;
    }
  });
  const issuedbook = [];
  userwithissuedbook.forEach((each) => {
    const book = books.find((book) => parseInt(book.id) === each.isIssuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.isIssuedDate;
    book.returnDate = each.returnDate;

    issuedbook.push(book);
  });
  if (issuedbook.length === 0) {
    return res.status(404).json({
      status: false,
      message: "no book issued",
    });
  }
  return res.status(200).json({
    status: true,
    data: issuedbook,
  });
});

/**
 * Routes Created /withFine/ofBook
 * method: Get
 * description: get all issued bookk by fine
 * response: json
 * Access: public
 * Parameters: none
 */

router.get("/withFine/ofBook", (req, res) => {
  const getDateInDays = (dateStr = "") => {
    const date = dateStr ? new Date(dateStr) : new Date();
    return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  };

  const getSubscriptionExpiry = (startDateStr, type) => {
    const startDate = new Date(startDateStr);
    let monthsToAdd = 0;

    if (type === "Basic") monthsToAdd = 3;
    else if (type === "Standard") monthsToAdd = 6;
    else if (type === "Premium") monthsToAdd = 12;

    startDate.setMonth(startDate.getMonth() + monthsToAdd);
    return Math.floor(startDate.getTime() / (1000 * 60 * 60 * 24));
  };

  const currentDate = getDateInDays();

  const usersWithFine = users
    .map((user) => {
      const returnDate = getDateInDays(user.returnDate);
      const subscriptionExpiry = getSubscriptionExpiry(
        user.subscriptionDate,
        user.subscriptionType
      );

      const book = books.find(
        (book) => parseInt(book.id) === parseInt(user.isIssuedBook)
      );

      let fine = 0;

      if (currentDate > returnDate) {
        const daysLate = currentDate - returnDate;

        if (currentDate <= subscriptionExpiry) {
          fine = 50 * daysLate;
        } else {
          fine = 100 + 50 * daysLate;
        }
      }

      return {
        userName: user.name + " " + user.surname,
        BookId: user.isIssuedBook,
        BookName: book?.name || "Unknown",
        fine,
      };
    })
    .filter((user) => user.fine > 0);

  res.json(usersWithFine);
});

module.exports = router;
