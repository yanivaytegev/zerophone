const express = require('express');
const config = require('./config/db')
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const clientRouter = require('./routes/client');
const phoneRouter = require('./routes/phonePackage')
const adminRouter = require('./routes/admin')
const cookieParser = require('cookie-parser')
const Cookie = require('express-session')

app.use(Cookie({ secret: 'somesecretvalue', cookie: { maxAge: 60000 } }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useFindAndModify: false }, (err) => {
    if (err) { throw err; }
    console.log("connection successfully to zero database !");
})
app.get('/', (req, res) => {
    res.write("hello");
    res.end();
})

app.use('/client/', clientRouter);
app.use('/phone/', phoneRouter);
app.use('/admin/', adminRouter);


const port = process.env.PORT || 3000;
app.listen(port);