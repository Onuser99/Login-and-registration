const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/mern_admin";

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection Successful!!");
    } catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
