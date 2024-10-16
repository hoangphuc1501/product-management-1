const express = require("express");
const app = express();
const port = 3000;

const routeClient = require("./routes/client/index.route");
app.set('views', './views'); //Tìm đến thư mục tên là view
app.set('view engine', 'pug')// template engine sử dụng là pug

// routeClient(app) // khi ko có đặt tên hàm thì biến routeClinet chính là tên hàm
routeClient.index(app) // khi có đặt tên hàm


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});