const express = require("express");

const { users } = require("./data/users.json");

const usersRoutes = require("./routes/users.js");

const booksRoutes = require("./routes/books.js");

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running successfully",
    data: "hey )-:",
  });
});

app.use("/users", usersRoutes);
app.use("/books", booksRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
