const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./db/connect");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const User = require("./models/userModel");
const Message = require("./models/messageModel")
const port = process.env.PORT || 3000;

const app = express();

app.use(
  express.json(),
  cors({
    origin: "*",
    credentials: true,
  }),
  express.urlencoded({ extended: true })
);
app.use("/", authRoute);
app.use("/", userRoute);


const start = async () => {
  try {
    await connect(process.env.MONGU_URI);
    app.listen(port, () => {
      console.log("The server running on port:", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
