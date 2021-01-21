// require modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const Restaurant = require('./models/restaurant.js')

// set handlebars engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// connect to mongodb
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
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
// put default info to index-page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// create restaurant info
app.get('/restaurant/create', (req, res) => {
  res.render('create')
})

// storage new info to database
app.post('/restaurant', (req, res) => {
  const restaurantList = req.body
  return Restaurant.create(restaurantList)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// read details of the restaurant
app.get('/restaurant/:id/detail', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// listen app server
app.listen(3000, () => {
  console.log('App server is listening on http://localhost:3000')
})



