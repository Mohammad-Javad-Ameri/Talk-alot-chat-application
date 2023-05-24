const {model,Schema}=require("mongoose");

const MessageSchema = new Schema({
  content: {type:String
  },
  from: {type:Object},
  socketid: {type:String
  },
  time: {type:String
  },
  date: {type:String
  },
  to: {type:String
  },
})

const Message = model("Message", MessageSchema);

module.exports = Message;
