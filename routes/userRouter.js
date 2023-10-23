const router = require("express").Router();

const User = require("../controller/userController");

const upload = require("../middlewares/uploader");
const Autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post(
  "/create-admin",
  Autentikasi,
  checkRole("SuperAdmin"),
  User.createAdmin
);
router.get("/", Autentikasi, checkRole("SuperAdmin", "Admin"), User.findUsers);
router.get("/:id", User.findUserById);
router.patch("/:id", Autentikasi, User.updateUser);
router.delete(
  "/:id",
  Autentikasi,
  checkRole("SuperAdmin", "Admin"),
  User.deleteUser
);

module.exports = router;
