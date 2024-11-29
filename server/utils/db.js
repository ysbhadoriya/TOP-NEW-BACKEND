const mongoose = require("mongoose");


const url ="mongodb+srv://YSBhadoriya:DOdju731@yogesh.k6tkyuh.mongodb.net/?retryWrites=true&w=majority&appName=YOGESH" ;


const connectDb = async () => {
    try {
        await mongoose.connect(url)
        console.log("Connection successful to DB");
    } catch (error) {
        console.error('Database connection failed');
    }
};

module.exports = connectDb;
