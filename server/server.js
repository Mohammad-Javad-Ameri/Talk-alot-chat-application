const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./db/connect");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const User = require("./models/userModel");
const Message = require("./models/messageModel")
const io = require("socket.io");
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

const server = require("http").createServer(app);
 io(server,{
    cors:{
        origin: "*",
    credentials: true,
    }
})

async function getLastMessagesFromRoom(room){
    let roomMessages = await Message.aggregate([
        {$match : {to:room}},
        {$group:{_id:"$date", messageBydate:{$push:"$$ROOT"}}}
    ])
    return roomMessages;
}

const start = async () => {
  try {
    await connect(process.env.MONGU_URI);
    server.listen(port, () => {
      console.log("The server running on port:", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
