

module.exports.index = (req, res) => {
    res.render("admin/pages/products/index", {
        pageTitle: "Trang tổng danh sách sản phẩm"
    });
}