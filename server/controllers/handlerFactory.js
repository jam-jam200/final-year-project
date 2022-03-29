const { Model } = require("mongoose");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }

    res.status(204).json({
      status: "success",
      message: "deleted",
      data: null,
    });
  });

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No doc found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.getOne = (Model, popOptions) => {
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No doc found with that id", 404));
    }

    res.status(200).json({
      status: "success",
      message: "doc gotten",
      data: {
        doc,
      },
    });
  });
};

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // let filter = {};
    // if (req.params.postId) filter = { post: req.params.postId };
    const doc = await Model.find();
    res.status(200).json({
      status: "success",
      message: "all doc",
      results: doc.length,
      data: {
        doc,
      },
    });
  });
