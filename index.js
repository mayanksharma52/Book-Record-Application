const express = require("express");

const { users } = require("./data/users.json");

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
