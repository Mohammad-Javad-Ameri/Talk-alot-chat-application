const router = require("express").Router()
const {login,logout} = require("../controller/authController");
const authMiddleware = require("../middleware/jwtAuth");

router.post("/login", login);
router.post("/logout", logout);


module.exports = router;