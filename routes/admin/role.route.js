const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/role.controller");


route.get("/", controller.index);
route.get("/create", controller.create);
route.post("/create", controller.createPost);
module.exports = route;