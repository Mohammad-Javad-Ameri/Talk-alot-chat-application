const router = require("express").Router()
const {login} = require("../controller/authController");
const authMiddleware = require("../middleware/jwtAuth");

router.post("/login", login);
// router.post("/logout", logout);


module.exports = router;