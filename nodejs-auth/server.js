const express = require('express')
const app = express()

const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500;

mongoose.connect('mongodb://localhost:27017/auth-user').
then(console.log('connection'))
.catch((err)=>{console.log(err)});

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})