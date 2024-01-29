// require("dotenv").config();
// const express = require('express');
// const app = express();

// app.use(express.json());

// let books = [];

// app.get("/books", (req, res) => {
//   res.json(books);
// });

// app.get("/books/:id", (req, res) => {
//   const book = books.find((b) => b.id === parseInt(req.params.id));
//   if (!book) res.status(404).send("Book not found");
//   res.json(book);
// });

// app.post("/books", (req, res) => {
//   const book = {
//     id: books.length + 1,
//     title: req.body.title,
//     author: req.body.author,
//   };
//   books.push(book);
//   res.send(book);
// });

// app.put("/books/:id", (req, res) => {
//   const book = books.find((b) => b.id === parseInt(req.params.id));
//   if (!book) res.status(44).send("Book not found");
//   book.title = req.body.title;
//   book.author = req.body.author;
//   res.send(book);
// });

// app.delete("/books/:id", (req, res) => {
//   const book = books.find((b) => b.id === parseInt(req.params.id));
//   if (!book) res.status(404).send("Book not found");
//   const index = books.indexOf(book);
//   books.splice(index, 1);
//   res.send(book);
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {console.log(`Listening on port http://localhost:${port}`)});


require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT||3000;

app.get("/" , (req,res) => {
  res.send("Hello World!");
});

app.listen(port , () => {
  console.log(`Example app listening at http//:localhost:${port}`);
})