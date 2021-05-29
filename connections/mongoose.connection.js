const mongoose = require("mongoose");
require('dotenv').config();
const getConnection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://jimmy:${process.env.DB_PASS}@cluster0.tpjk1.mongodb.net/ecommerce?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("successfully connected to the database");
    } catch (error) {
        console.log("error while connecting to db", error);
    }
};

exports.getConnection = getConnection;