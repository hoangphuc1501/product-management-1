const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
        
    }
    // lọc theo trạng thái
    if(req.query.status) {
        find.status = req.query.status;
    }
    // hết lọc theo trạng thái
    

    const products = await Product.find(find)

    res.render("admin/pages/products/index", {
        pageTitle: "Trang tổng danh sách sản phẩm",
        products: products
    });
}