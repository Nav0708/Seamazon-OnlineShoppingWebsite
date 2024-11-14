
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB= require('./config/dbconnection');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Hello, Express Server');
});

const registerRoutes = require('./routes/registerRoute');
const login = require('./routes/login');
const home = require('./routes/home');
const cart = require('./routes/cart')
const userProfile = require('./routes/userProfile')
const products = require('./routes/products')

app.use('/', registerRoutes)
app.use('/', login)
app.use('/', home)
app.use('/', cart)
app.use('/', userProfile)
app.use('/', products)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app
