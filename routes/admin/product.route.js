const express = require("express");
const route = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName)
    }
});
const upload = multer({ storage: storage });
const validate = require("../../validates/admin/product.validate");
const controller = require("../../controllers/admin/product.controller");

route.get("/", controller.index);

route.patch("/change-status", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.patch("/delete", controller.delete);
route.patch("/change-position", controller.changePosition);
route.get("/create", controller.create);


route.get("/edit/:id", controller.edit);
route.patch(
    "/edit/:id", 
    upload.single('thumbnail'),
    validate.createPost, 
    controller.editPatch);    



module.exports = route;