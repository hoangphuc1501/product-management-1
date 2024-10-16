const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false
    });

    for (const item of products) {
        item.priceNew = item.price*(100-item.discountPercentage)/100;
        item.priceNew = (item.priceNew).toFixed(0)
    }    
    console.log(products)
    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang danh sách sán phẩm",
        products: products
    });
}