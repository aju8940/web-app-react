const express = require('express');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
const userRoutes = require('./Routes/userRoutes');
const errorHAndler = require('./Middleware/errorHandler')
const connectDB = require('./Config/db')
const cors =require('cors')
const adminRoutes = require('./Routes/adminRoutes')


connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use('/api/user', userRoutes); // Use the user routes middleware
app.use('/api/admin',adminRoutes)
app.use(errorHAndler.erroHandler)

app.listen(port, () => {
  console.log('SERVER STARTED');
});
