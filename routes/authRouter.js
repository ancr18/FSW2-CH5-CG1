const router = require("express").Router();

const Authenticate = require("../middlewares/authenticate");
const Auth = require("../controller/authController");
const checkRole = require("../middlewares/checkRole");

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.get("/me", Authenticate, Auth.checkToken);
router.post(
  "/register/admin",
  Authenticate,
  checkRole("SuperAdmin"),
  Auth.register
);

module.exports = router;
