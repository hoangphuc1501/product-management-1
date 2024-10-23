const express = require("express");
require('dotenv').config(); 
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
const systemConfig = require("./config/system");
const app = express();
const port = process.env.PORT;

const database = require("./config/database"); // nhúng file database
database.connect(); // gọi hàm
const routeAdmin = require("./routes/admin/index.route"); //nhúng file route
const routeClient = require("./routes/client/index.route"); //nhúng file route

app.set('views', `${__dirname}/views`); //Tìm đến thư mục tên là view
app.set('view engine', 'pug')// template engine sử dụng là pug
app.use(express.static(`${__dirname}/public`))// thiết lập thư mục chứa file tĩnh

// khai báo biến toàn cục cho file pug
app.locals.prefixAdmin = systemConfig.prefixAdmin
// routeClient(app) // khi ko có đặt tên hàm thì biến routeClinet chính là tên hàm

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// khai báo đường dẫn
routeAdmin(app) ;
routeClient.index(app); // khi có đặt tên hàm khi gọi hàm





app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});

