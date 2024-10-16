const express = require("express");
const app = express();
const port = 3000;

app.set('views', './views'); //Tìm đến thư mục tên là view
app.set('view engine', 'pug')// template engine sử dụng là pug

app.get("/", (req, res) => {
    res.render("client/pages/home/index.pug");
});

app.get("/products", (req, res) => {
    res.render("client/pages/products/index.pug");
});


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});