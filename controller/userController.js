const { Op } = require("sequelize");

const { User, Auth } = require("../models");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      const required = [];
      if (!name) required.push("name");
      if (!email) required.push("email");
      if (!password) required.push("password");
      if (!confirmPassword) required.push("confirmPassword");

      return next(
        new ApiError(`Fields must be required : ${required.join(", ")}`, 400)
      );
    }

    // validasi untuk check apakah email nya udah ada
    const existingUser = await Auth.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return next(new ApiError("User email already taken", 400));
    }

    // minimum password length
    const passwordLength = password <= 8;
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 character", 400));
    }

    // minimum password length
    if (password !== confirmPassword) {
      return next(new ApiError("Password does not match", 400));
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    console.log("cek");
    const newUser = await User.create({
      name,
      role: "Admin",
    });
    const test = await Auth.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      userId: newUser.id,
    });

    console.log(test);

    res.status(201).json({
      status: "Success",
      data: {
        ...newUser,
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findUsers = async (req, res, next) => {
  try {
    // cek akses
    let access = {};
    if (req.user.role === "SuperAdmin") {
      access = { [Op.not]: "SuperAdmin" };
    } else if (req.user.role === "Admin") {
      access = "Member";
    }

    const users = await User.findAll({
      where: { role: access },
      include: ["Auth"],
    });

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateUser = async (req, res, next) => {
  const { name, age, email, address, password, confirmPassword } = req.body;
  try {
    const existingUser = await Auth.findOne({
      where: {
        email,
      },
    });

    if (!name || !email || !password || !confirmPassword) {
      const required = [];
      if (!name) required.push("name");
      if (!email) required.push("email");
      if (!password) required.push("password");
      if (!confirmPassword) required.push("confirmPassword");

      return next(
        new ApiError(`Fields must be required : ${required.join(", ")}`, 400)
      );
    }

    if (existingUser) {
      return next(new ApiError("User email already taken", 400));
    }

    const passwordLength = password <= 8;
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 character", 400));
    }

    // minimum password length
    if (password !== confirmPassword) {
      return next(new ApiError("Password does not match", 400));
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    const updateUser = await User.update(
      {
        name,
        age,
        address,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    await Auth.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      userId: updateUser.id,
    });

    res.status(200).json({
      status: "Success",
      message: "Successfully updated user",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    let access = {};
    if (req.user.role === "SuperAdmin") {
      access = { [Op.not]: "SuperAdmin" };
    } else if (req.user.role === "Admin") {
      access = "Member";
    }

    const user = await User.findOne({
      where: {
        id: req.params.id,
        role: access,
      },
    });

    if (!user) {
      next(new ApiError("User id not found", 404));
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted user",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createAdmin,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
