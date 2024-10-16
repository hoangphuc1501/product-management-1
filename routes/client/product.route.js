const express = require("express");
const route = express.Router();


route.get("/", (req, res) => {
    res.render("client/pages/products/index.pug");
});

module.exports = route;