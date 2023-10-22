const ApiError = require("../utils/apiError");

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      if (!role.includes(req.user.role)) {
        return next(new ApiError(`You are not ${role}. You cant access`, 401));
      }
      next();
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;
