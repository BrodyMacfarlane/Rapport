require('dotenv').config()

const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , sc = require('./signer')

const app = express()

app.use( express.static( `${__dirname}/../build` ) )

app.use(bodyParser.json())
app.use(cors())

massive(process.env.CONNECTION_STRING).then((db) => {
    app.set('db', db)
})

app.post('/api/getPosts', (req, res) => {
  const data = req.body;
  const db = app.get('db')
  db.get_posts([data.position]).then(posts => {
      res.status(200).send(posts)
  })
})

app.get('/api/getCategories', (req, res) => {
  const db = app.get('db')
  db.get_categories().then(cats => {
      res.status(200).send(cats)
  })
})

app.post('/api/newPost', (req, res) => {
  const db = app.get('db')
  const data = req.body
  db.new_post([data.title, data.author, data.date, data.description, data.category, data.content]).then(response => {
    res.status(200).send(response)
  })
})

app.post('/api/getSignedURL', sc.getSignedURL)

const PORT = 3535
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))