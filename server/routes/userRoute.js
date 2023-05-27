const router = require("express").Router()
const {getAllUsers,getUser,createUser,updateUser,deleteUser }=require("../controller/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/",getAllUsers)
router.post("/",createUser)
router.get("/me",getUser)
router.patch("/:id",updateUser)
router.delete("/:id",deleteUser)

module.exports=router;