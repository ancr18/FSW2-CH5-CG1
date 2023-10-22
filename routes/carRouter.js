const router = require("express").Router();

const Car = require("../controller/carController");

const upload = require("../middlewares/uploader");
const Autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.get("/avail", Car.availableCars);
router.get(
  "/",
  Autentikasi,
  checkRole("SuperAdmin", "Admin"),
  upload.single("image"),
  Car.findCars
);
router.get(
  "/:id",
  Autentikasi,
  checkRole("SuperAdmin", "Admin"),
  upload.single("image"),
  Car.findCarsById
);
router.post(
  "/",
  Autentikasi,
  checkRole("SuperAdmin", "Admin"),
  upload.single("image"),
  Car.createCar
);

router.patch(
  "/:id",
  Autentikasi,
  checkRole("SuperAdmin", "Admin"),
  Car.updateCar
);
router.delete(
  "/:id",
  Autentikasi,
  checkRole("SuperAdmin", "Admin"),
  Car.deleteCar
);

module.exports = router;
