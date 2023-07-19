const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://ajmallatheef8940:ajmal369@cluster0.kkqpecv.mongodb.net/mern-app?retryWrites=true&w=majority'
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(MONGO_URI)
        console.log(`DATABASE CONNECTED : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}


module.exports = connectDB