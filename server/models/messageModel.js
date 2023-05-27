const {model,Schema}=require("mongoose");

const MessageSchema = new Schema({
  content: String,
  from: Object,
  socketid: String,
  time: String,
  date: String,
  to: String
})

const Message = model("Message", MessageSchema);

module.exports = Message;
