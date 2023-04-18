const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
require('dotenv').config()
connectToMongo();
 
const app = express()
const port = 5000;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Nilesh')
})

// Avilable routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
// app.use('/api/share', require('./routes/share'));
app.use('/api/share', require('./routes/share'))

app.listen(port, () => {
  console.log(`app listening on port : ${port}`)
  // console.log(process.env.DATABASE_URL)
})