const {User}=require("../models/userModel");
const bcrypt = require("bcrypt");
// const io = require("socket.io")(server);

const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_KEY;

const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
		
        if (!email || !password) {
            return res.status(400).send({ message: "Invalid email or password" });
         }
		 
         const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).send({ message: "Invalid email or password" });
		}
        const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).send({ message: "Invalid email or password" });
		}
        const token = jwt.sign({ _id: user._id }, secretKey);
        user.status="online";
        user.token=token;
        await user.save();

		res.status(200).send({ token, message: "Logged in successfully" });
    } catch (error) {
        console.error(error.message);
		res.status(500).send({ message: "Internal Server Error" });
    }
}

    const logout = async (req, res) => {
	try {
        
		 const {email, newMessages} = req.body;
      const user = await User.findOne({email});
      console.log(user);
		//req.body.token = req.body.token.filter((token) => token.token !== req.token);
        user.status="offline";
        user.newMessages = newMessages;
		await user.save();
        const members = await User.find();
        socket.broadcast.emit('new-user', members);

		res.status(200).send({ message: "Logged out successfully" });
	} catch (error) {
		console.error(error.message);
		res.status(500).send({ message: "Internal Server Error" });
	}
};


module.exports = {
	login,
	logout,
};