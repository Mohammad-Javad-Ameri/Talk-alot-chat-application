const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};
module.exports = connect;
