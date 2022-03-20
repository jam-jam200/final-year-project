const UserCategory = require("../models/userCategories");
const AppError = require("../utils/appError");

exports.create = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return next(new AppError("name is required", 400));
    }

    if (typeof req.body?.name !== "string") {
      return next(new AppError("name must a string", 400));
    }

    /**always don't to to validate your data */
    const category = await UserCategory.create(req.body);

    return res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    /**always don't to to validate your data */
    const category = await UserCategory.find();
    return res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(error);
  }
};
