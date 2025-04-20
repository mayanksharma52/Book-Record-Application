const express = require("express");

const { users } = require("./data/users.json");

const { books } = require("./data/books.json");

const app = express();

const port = 3000;

app.use(express.json());

/**
 * Routes Created /users
 * method: Get
 * description: get all users
 * response: json
 * Access: public
 * Parameters: none
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    status: true,
    data: users,
  });
});

/**
 * Routes Created /users
 * method: Post
 * description: Create a new user
 * response: json
 * Access: public
 * Parameters: none
 */
app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => parseInt(each.id) === parseInt(id));

  if (user) {
    return res.status(400).json({
      status: false,
      message: "User already exists",
    });
  }

  const newUser = {
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  };

  users.push(newUser);

  return res.status(201).json({
    status: true,
    message: "User created successfully",
    data: users,
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

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => parseInt(user.id) === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "user not found",
    });
  }
  return res.status(200).json({
    status: true,
    data: user,
  });
});

/**
 * Routes Created /users/(id)
 * method: PUT
 * description: Update a user
 * response: json
 * Access: public
 * Parameters: Id
 */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => parseInt(each.id) === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "user not found",
    });
  } else {
    const updatedUser = users.map((each) => {
      if (parseInt(each.id) === parseInt(id)) {
        return { ...each, ...data };
      }
      return each;
    });
    return res.status(201).json({
      status: true,
      message: "user updated successfully",
      data: updatedUser,
    });
  }
});
/**
 * Routes Created /users/(id)
 * method: DELETE
 * description: Delete a user
 * response: json
 * Access: public
 * Parameters: Id
 */

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((each) => parseInt(each.id) === parseInt(id));
  if (index === -1) {
    return res.status(404).json({
      status: false,
      message: "user not found",
    });
  }
  const deleted = users.splice(index, 1);
  return res.status(201).json({
    status: true,
    message: "user deleted successfully",
    deleteddata: deleted,
    remainingData: users,
  });
});

/**
 * Routes Created /books
 * method: Get
 * description: get all books
 * response: json
 * Access: public
 * Parameters: none
 */

app.get("/books", (req, res) => {
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

app.get("/books/:id", (req, res) => {
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

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running successfully",
    data: "hey )-:",
  });
});

// app.get("*", (req, res) => {
//   res.status(404).json({
//     message: "page not found",
//     data: "404",
//   });
// });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
