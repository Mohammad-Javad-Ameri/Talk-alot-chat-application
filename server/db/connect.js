const mongoose = require("mongoose")

const connect =()=>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database");
    }
    catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
}
module.exports=connect;