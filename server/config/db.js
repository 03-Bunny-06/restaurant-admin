const mongoose = require("mongoose");

const connectDb = async() => {
    try {
        const dbUrl = process.env.DB_URL;
        await mongoose.connect(dbUrl);
        console.log('Database connection successfull!')
    }
    catch(e){
        console.log('MongoDB Error: ', e.message);
    }
}

module.exports = connectDb;