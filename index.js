// const express = require('express');
// const sqlite3 = require('sqlite3');
// const app = express();

// const db = new sqlite3.Database('./Database/Book.sqlite');

// app.use(express.json());

// db.run(`CREATE TABLE IF NOT EXISTS books (
//   id INTEGER PRIMARY KEY,
//   title TEXT,
//   author TEXT
// )`);

// app.get("/books", (req, res) => {
//     db.all(`SELECT * FROM books`, (err, rows) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(rows);
//         }
//     });
// });

// app.get("/books/:id", (req, res) => {
//     db.get(`SELECT * FROM books WHERE id = ?`, req.params.id, (err, row) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             if (!row) {
//                 res.status(404).send('Book not found');
//             } else {
//                 res.json(row);
//             }
//         }
//     });
// });

// app.post("/books", (req, res) => {
//     const book = req.body;
//     db.run(`INSERT INTO books (title, author) VALUES (?, ?)`, book.title, book.author, function (err) {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             book.id = this.lastID;
//             res.send(book);
//         }
//     });
// });

// app.put("/books/:id", (req, res) => {
//     const book = req.body;
//     db.run(`UPDATE books SET title = ?, author = ? WHERE id = ?`, book.title, book.author, req.params.id, function (err) {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.send(book);
//         }
//     });
// });

// app.delete("/books/:id", (req, res) => {
//     db.run(`DELETE FROM books WHERE id = ?`, req.params.id, function(err) {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.send({});
//         }
//     });
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));


const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
    host:'localhost',
    dialect:'sqlite',
    storage:'./Database/SQBooks.sqlite'
});

const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync();

// route to get all books
app.get('books', (req, res) => {
    Book.findAll().then(books => {
        res.json(books);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to get a book by id
app.get('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) res.status(404).send('Book not found');
        else res.json(book);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to create a new book
app.post('/books', (req, res) => {
    Book.create(req.body).then(book => {
        res.send(book);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to update a book
app.put('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) res.status(404).send('Book not found');
        else book.update(req.body).then(() => {
            res.send(book);
        }).catch(err => {
            res.status(500).send(err);
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to delete a book
app.delete('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) res.status(404).send('Book not found');
        else book.destroy().then(() => {
            res.send({});
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port (localhost:${port})...`));