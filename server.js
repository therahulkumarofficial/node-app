const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config(); 

const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

// const MenuItem = require('./models/MenuItem')  // Use it in menuRoutes.js

// const Person = require('./models/Person'); // Use it in personRoutes.js



app.get('/', function (req, res) {
  res.send('Welcome to our Hotel');
})

/*
app.get('/chicken', function (req, res) {
    res.send('sure sir, i would love to serve you chicken')
  })

  app.get('/idli', function (req, res) {
    var customized_idli = {
        name: 'rava idli',
        size: '10cm diameter',
        is_sambhar: true,
        is_chutney: false
    }
    // res.send('Welcome to South India, i would love to serve you IDLI')
    res.send(customized_idli)
  })

*/


const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes);


const menuItemRoutes = require('./routes/menuItemRoutes')
app.use('/menu', menuItemRoutes);

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
}) // 3000 is port




