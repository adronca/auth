const express = require('express'),
  mongoose = require('mongoose'),
  dotenv = require('dotenv'),
  app = express();

  dotenv.config();

mongoose.connect(process.env.DB_CON, { useNewUrlParser: true }, () => console.log('DB START...'))

//Import Routes
const authRote = require('./routes/auth');

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user', authRote);

app.listen(3000, () => {
  console.log('Server START...')
})