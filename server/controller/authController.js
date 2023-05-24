const {User}=require("../models/userModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_KEY;

const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
		
        if (!email ) {
            return res.status(400).send({ message: "Invalid email" });
         }
		 if (!password ) {
            return res.status(400).send({ message: "Invalid password" });
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

		res.status(200).send({ token, message: "Logged in successfully" });
    } catch (error) {
        console.error(error.message);
		res.status(500).send({ message: "Internal Server Error" });
    }
}

    const logout = async (req, res) => {
	try {
		
		req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
		await req.user.save();

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