const express = require("express");

const dotenv = require("dotenv");

const DbConnection = require("./databaseConnection.js");

const usersRoutes = require("./routes/users.js");

const booksRoutes = require("./routes/books.js");

dotenv.config();

DbConnection();

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
