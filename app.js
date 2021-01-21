// require modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()

// set handlebars engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// set route
app.get('/', (req, res) => {
  res.render('index')
})

// listen app server
app.listen(3000, () => {
  console.log('App server is listening on http://localhost:3000')
})



