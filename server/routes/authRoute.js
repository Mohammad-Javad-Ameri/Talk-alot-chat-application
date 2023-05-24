const router = require("express").Router()
const {login,logout} = require("../controller/authController");
const authMiddleware = require("../middleware/jwtAuth");

router.post("/login", login);
router.put("/logout", authMiddleware, logout);


module.exports = router;