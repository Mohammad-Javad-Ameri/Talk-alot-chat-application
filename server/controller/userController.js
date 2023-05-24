const {User,validate}= require("../models/userModel")
const bcrypt = require("bcrypt")

const getAllUsers=async(req,res)=>{
    try {
        const users = await User.find({}).sort({createdAt: -1});
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({error: error.massage})
    }
}


const getUser=async(req,res)=>{
    const {id}= req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({error: error.massage})
    }
}


const createUser = async(req,res)=>{
const { name, email, password, picture } = req.body;
    try {
        const {error}=validate(req.body);
        if (error) {
        return res.status(400).send({message: error.details[0].message})
        }

    

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(password,salt)
        const newUser=await new User({name,email,password:hashPassword,picture}).save();
        res.status(201).send({ message: "User created successfully" })

    } catch (error) {
          let msg;
    if(error.code == 11000){
      msg = "User already exists"
    } else {
      msg = error.message;
    }
        console.log(error);
    res.status(400).json(msg)
    }
}

const updateUser = async(req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not Found" });
    }

   

    if (req.body.password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      updatedUser.password = hashPassword;
    }

    await User.findByIdAndUpdate(req.params.id, ...req.body);

    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};


const deleteUser = async(req,res)=>{
    const {_id}=req.params;
    try {
         await User.findOneAndDelete(_id)
         res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = {getAllUsers,getUser,createUser,updateUser,deleteUser }