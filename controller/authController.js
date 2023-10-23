const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auth, User } = require("../models");
const ApiError = require("../utils/apiError");

const register = async (req, res, next) => {
  try {
    const { name, age, address, email, password, confirmPassword } = req.body;

    // validasi untuk check apakah email nya udah ada
    const existingUser = await Auth.findOne({
      where: {
        email,
      },
    });

    if (!name || !age || !address || !email || !password || !confirmPassword) {
      const required = [];
      if (!name) required.push("name");
      if (!age) required.push("age");
      if (!address) required.push("address");
      if (!email) required.push("email");
      if (!password) required.push("password");
      if (!confirmPassword) required.push("confirmPassword");

      return next(
        new ApiError(`Fields must be required : ${required.join(", ")}`, 400)
      );
    }

    if (existingUser) {
      return next(new ApiError("User email already taken", 409));
    }

    // minimum password length
    const passwordLength = password <= 8;
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 character", 422));
    }

    // minimum password length
    if (password !== confirmPassword) {
      return next(new ApiError("Password does not match", 400));
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    const newUser = await User.create({
      name,
      age,
      address,
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      //   token utk autentikasi
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.User.name,
          role: user.User.role,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.status(200).json({
        status: "Success",
        message: "Successfully login",
        data: token,
      });
    } else {
      next(new ApiError("Wrong email or password", 400));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const checkToken = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  checkToken,
};
