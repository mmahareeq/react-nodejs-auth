const express = require('express')
const app = express()

const path = require('path')
const cors = require('cors');
const corOptions = require('./config/corsOptions');
const credential = require('./middleware/credentials');
const mongoose = require('mongoose')
const registerRouter = require('./routes/registers');
const PORT = process.env.PORT || 3500;

app.use(credential)

app.use(cors(corOptions))

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/auth-user').
then(console.log('connection'))
.catch((err)=>{console.log(err)});



app.use('/register', registerRouter);
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})