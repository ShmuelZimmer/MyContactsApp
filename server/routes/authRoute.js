
const { register } = require("../controllers/authController");
const {login} = require("../controllers/authController")
const router = require("express").Router();

router.post("/register", register)
router.post("/login", login)



module.exports = router;