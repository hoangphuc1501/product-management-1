const express = require("express");
const route = express.Router();
const multer = require('multer');
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadcloud.middleware");
const controller = require("../../controllers/admin/account.controller");


route.get("/", controller.index);
route.get("/create", controller.create);
route.post("/create", 
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    controller.createPost);
module.exports = route;