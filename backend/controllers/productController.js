const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandles");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create Product--admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.User.id; //adding id of admin user who added the product
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
    c,
  });
});
//Get All Products-Admin
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 3;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let productId = Product.findById(req.params.id);
  if (!productId) {
    return next(new ErrorHandler("Product not found!", 500));
  }
  productId = await Product.findByIdAndUpdate(req.params.id, req.body, {
    mew: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({
    success: true,
    productId,
  });
});

//Delete Product--Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Delete Successfull!!",
  });
});

//Get Single Product
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  const productCount = await Product.countDocuments();
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});
