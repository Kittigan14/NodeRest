const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


mongoose.connect(
    "mongodb://admin:YLSqnl55798@node58184-sxdx2003.proen.app.ruk-com.cloud:11915",
    {
        useNewUrlParser: true,
        useUnitfiedTopology: true,
    }
)

const Book = mongoose.model("Book", {
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    title: String,
    author: String,
})

const app = express()
app.use(bodyParser.json())


app.post('/books', async(req, res) => {
    try {

        const lastBook = await Book.findOne().Sort({ id: -1 })
        const nextId = lastBook ? lastBook.id + 1 : 1


        const book = new Book({
            id: nextId,
            ...req.body,
        })

        await book.save()
        res.send(book)
    } catch (err) {
        res.status(500).send('Error')
    }
})


app.get('/books', async(req, res) => {
    try {
        const books = await Book.find()
        res.send(books)
    } catch (err) {
        res.status(500).send('Error')
    }
})


app.get('/books/:id', async(req, res) => {
    try {
        const book = await Book.findOne({ id: req.params.id })
        res.send(book)
    } catch (err) {
        res.status(500).send('Error')
    }
})


app.put('/books/:id', async(req, res) => { // show create desktop
    try {
        const book = await Book.findOneAndUpdate({ id: req.params.id }, req.body, {
            new: true,
        })
        res.send(book)
    } catch (err) {
        res.status(500).send('Error')
    }
})


app.delete('/books/:id', async(req, res) => {
    try {
        const book = await Book.findOneAndDelete({ id: req.params.id })
        res.send(book)
    } catch (err) {
        res.status(500).send('Error')
    }
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server Started at http://localhost${port}`))