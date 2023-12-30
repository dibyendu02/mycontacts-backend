const express = require("express");
const { userRegister, userLogin, currentUser } = require("../controllers/userControllers");
const { validateToken } = require("../middlewares/handleUserToken");
const router = express.Router();

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)
router.route("/current").get(validateToken, currentUser)

module.exports = router;