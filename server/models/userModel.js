const {model,Schema}=require("mongoose");
const jwt = require("jsonwebtoken");
const joi=require("joi")
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema({
    name: {
        type:String,
        required : [true,"Must be completed"]
    },
    email: {
        type: String,
        required: [true,"Must be completed"],
        lowercase:true,
        unique: true,
        
     },
     password: {
        type: String,
        required: [true, "Must be completed"]
      },
      picture: {
        type: String
       },
       newmessage: {
        type: Object,
        default :{}
        },
        status:{
            type:String,
            default : "online"
        }
},{minimize:false},{timestamps:true});

userSchema.methods.generateAuthToken = function(){
    const token =jwt.sign({_id:this._id},process.env.JWT_KEY,{
       expiresIn:"7d" 
    });
    return token;
};

const validate = (data)=>{
    const schema=joi.object().keys({
        name:joi.string().required().label("Name"),
        email:joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    })
    return schema.validate(data)
}

const User = model("User",userSchema);

module.exports = {User,validate};