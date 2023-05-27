const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./db/connect");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const User = require("./models/userModel");
const Message = require("./models/messageModel")
const rooms = ['general', 'tech', 'finance', 'crypto'];
const bodyParser = require("body-parser");
const passport = require("passport");
const router = express.Router();
const port = process.env.PORT || 3001;


const app = express();
app.use(passport.initialize());
require("./passport")(passport);
app.use(
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cors({
    origin: "*",
    credentials: true,
  })  
);
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true
   
  }
})
app.use("/", authRoute);
app.use("/", userRoute);
async function getLastMessagesFromRoom(room){
    let roomMessages = await Message.aggregate([
        {$match : {to:room}},
        {$group:{_id:"$date", messageBydate:{$push:"$$ROOT"}}}
    ])
    return roomMessages;
}


function sortRoomMessagesByDate(messages){
  return messages.sort(function(a, b){
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    date1 = date1[2] + date1[0] + date1[1]
    date2 =  date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1
  })
}


io.on('connection', (socket)=> {

  socket.on('new-user', async ()=> {
    const members = await User.find();
    io.emit('new-user', members)
  })

  socket.on('join-room', async(newRoom, previousRoom)=> {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit('room-messages', roomMessages)
  })

  socket.on('message-room', async(room, content, sender, time, date) => {
    console.log(room);
    const newMessage = await Message.create({content, from: sender, time, date});
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // sending message to room
    io.to(room).emit('room-messages', roomMessages);
    socket.broadcast.emit('notifications', room)
  })
  router.delete('/logout', async(req, res)=> {
    try {
      const {_id, newMessages} = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit('new-user', members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send()
    }
  })

})


  app.get('/rooms', (req, res)=> {
  res.json(rooms)
})

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
