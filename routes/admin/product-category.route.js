const express = require("express");
const route = express.Router();
const multer = require('multer');
const upload = multer();

const controller = require("../../controllers/admin/product-category.controller");
const uploadCloud = require("../../middlewares/admin/uploadcloud.middleware");
const validate = require("../../validates/admin/product.validate");

route.get("/", controller.index);
route.get("/create", controller.create);
route.post("/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.createPost);
module.exports = route;