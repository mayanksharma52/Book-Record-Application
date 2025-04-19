const express = require("express");

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running successfully",
    data: "hey )-:",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "page not found",
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
