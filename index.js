const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT;

const routeClient = require("./routes/client/index.route");
app.set('views', './views'); //Tìm đến thư mục tên là view
app.set('view engine', 'pug')// template engine sử dụng là pug
app.use(express.static('public'))// thiết lập thư mục chứa file tĩnh

// routeClient(app) // khi ko có đặt tên hàm thì biến routeClinet chính là tên hàm
routeClient.index(app) // khi có đặt tên hàm


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});