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

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
  console.log(process.env.DATABASE_URL)
})