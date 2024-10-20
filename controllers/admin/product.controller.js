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
    
    // Tìm kiếm
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i")
        find.title = regex;
    }
    // hết tìm kiếm

    // phân trang
    let limitItem = 4;
    let page = 1;
    if(req.query.page){
        page = parseInt(req.query.page);
    }
    if(req.query.limit){
        limitItem = parseInt(req.query.limit);
    }
    const skip = (page - 1) * limitItem;
    const totalProduct = await Product.countDocuments(find);
    const totalPage = Math.ceil(totalProduct/limitItem);
    
    // hết phần trang

    const products = await Product.find(find).limit(limitItem).skip(skip);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        totalPage: totalPage,
        currentPage: page
    });
}

module.exports.changeStatus = async (req, res) => {
    await Product.updateOne({
            _id: req.body.id
        },{
            status:req.body.status
        });

    res.json({
        code: "success",
        message: "Đổi trạng thái thành công!"
    })
}

module.exports.changeMulti = async (req, res) => {
    console.log(req.body)

    await Product.updateMany({
        _id: req.body.ids
    },{
        status:req.body.status
    })

    res.json({
        code: "success",
        message: "Đổi trạng thái thành công!"
    })
}

// Xóa sản phẩm vĩnh viễn
// module.exports.delete = async (req, res) => {
    
//     await Product.deleteOne({
//         _id: req.body.id
//     })

//     res.json({
//         code: "success",
//         message: "Xóa thành công"
//     })
// }

// Xóa mềm
module.exports.delete = async (req, res) => {
    
    await Product.updateOne({
        _id: req.body.id
    },{
        deleted: true
    })

    res.json({
        code: "success",
        message: "Xóa thành công"
    })
}