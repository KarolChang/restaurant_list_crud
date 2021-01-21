// require modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

// set handlebars engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// connect to mongodb
mongoose.connect('mongodb://localhost/restaurant-list')
// get status of connection
const db = mongoose.connection
// set action of connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

// set route
app.get('/', (req, res) => {
  res.render('index')
})

// listen app server
app.listen(3000, () => {
  console.log('App server is listening on http://localhost:3000')
})



