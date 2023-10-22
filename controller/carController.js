const { Car, User, AuditCarTrail } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");
const { Op } = require("sequelize");

const uploadImage = async (file, next) => {
  try {
    const split = file.originalname.split(".");
    const extension = split[split.length - 1];

    // upload file ke imagekit
    const image = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-Cars-${Date.now()}.${extension}`,
    });

    if (!image) return next(new ApiError("Failed uploaded image", 400));
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const createCar = async (req, res, next) => {
  const { name, price, category, available } = req.body;
  const file = req.file;
  let img;

  try {
    if (file) {
      img = await uploadImage(file);
    }

    const newCar = await Car.create({
      name,
      price,
      available,
      category,
      imageUrl: img,
    });

    await AuditCarTrail.create({
      carId: newCar.id,
      action: "Create",
      performedBy: req.user.id,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newCar,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCars = async (req, res, next) => {
  try {
    const cars = await Car.findAll({
      include: ["AuditCarTrail"],
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      status: "Success",
      data: {
        cars,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCarsById = async (req, res, next) => {
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
      include: ["AuditCarTrail"],
    });

    res.status(200).json({
      status: "Success",
      data: {
        car,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateCar = async (req, res, next) => {
  const { name, price, category, available } = req.body;
  const file = req.file;
  let img;

  try {
    if (file) {
      img = await uploadImage(file);
    }
    const update = await Car.update(
      {
        name,
        price,
        available,
        category,
        imageUrl: img,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await AuditCarTrail.create({
      carId: req.params.id,
      action: "Update",
      performedBy: req.user.id,
    });

    res.status(200).json({
      status: "Success",
      message: "Successfully updated car",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const product = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      next(new ApiError("Car not found", 404));
    }

    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    await AuditCarTrail.create({
      carId: req.params.id,
      action: "Delete",
      performedBy: req.user.id,
    });

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted car",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const availableCars = async (req, res, next) => {
  try {
    const cars = await Car.findAll({
      include: ["AuditCarTrail"],
      order: [["id", "ASC"]],
      paranoid: false,
    });

    res.status(200).json({
      status: "Success",
      data: {
        cars,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createCar,
  findCars,
  findCarsById,
  updateCar,
  deleteCar,
  availableCars,
};
