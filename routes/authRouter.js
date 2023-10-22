const router = require("express").Router();

const Authenticate = require("../middlewares/authenticate");
const Auth = require("../controller/authController");

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.get("/me", Authenticate, Auth.authenticate);

module.exports = router;
