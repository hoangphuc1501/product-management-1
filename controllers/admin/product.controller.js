const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const systemComfig = require("../../config/system");
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    // lọc theo trạng thái
    if (req.query.status) {
        find.status = req.query.status;
    }
    // hết lọc theo trạng thái

    // Tìm kiếm
    if (req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i")
        find.title = regex;
    }
    // hết tìm kiếm

    // phân trang
    let limitItem = 4;
    let page = 1;
    if (req.query.page) {
        page = parseInt(req.query.page);
    }
    if (req.query.limit) {
        limitItem = parseInt(req.query.limit);
    }
    const skip = (page - 1) * limitItem;
    const totalProduct = await Product.countDocuments(find);
    const totalPage = Math.ceil(totalProduct / limitItem);

    // hết phânn trang

    // sắp xếp
    const sort = {}
    if(req.query.sortKey && req.query.sortValue){
        const sortKey = req.query.sortKey; 
        const sortValue = req.query.sortValue;

        sort[sortKey] = sortValue;
    }else{
        sort["position"] = "desc"
    }

    // hết sắp xếp
    const products = await Product
        .find(find)
        .limit(limitItem)
        .skip(skip)
        .sort(sort);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        totalPage: totalPage,
        currentPage: page,
        limitItem: limitItem
    });
}

module.exports.changeStatus = async (req, res) => {
    await Product.updateOne({
        _id: req.body.id
    }, {
        status: req.body.status
    });

    req.flash('success', 'Đổi trạng thái thành công!');

    res.json({
        code: "success"
    })
}

module.exports.changeMulti = async (req, res) => {
    switch (req.body.status) {
        case "active":
        case "inactive":
            await Product.updateMany({
                _id: req.body.ids
            }, {
                status: req.body.status
            });

            req.flash('success', 'Đổi trạng thái thành công!');
            res.json({
                code: "success"
            });
            break;
        case "delete":
            await Product.updateMany({
                _id: req.body.ids
            }, {
                deleted: true
            })
            req.flash('success', 'Xóa thành công!');
            res.json({
                code: "success"
            })
            break;
        default:
            res.json({
                code: "error",
                message: "Trạng thái không hợp lệ"
            })
            break;
    }
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
    }, {
        deleted: true
    })
    req.flash('success', 'Xóa thành công!');
    res.json({
        code: "success"
    })
}
// hết xóa mềm

// đổi vị trí
module.exports.changePosition = async (req, res) => {
    await Product.updateOne({
        _id: req.body.id
    }, {
        position: req.body.position
    });
    req.flash('success', 'Đổi vị trí thành công!');
    res.json({
        code: "success"
    })
}
// hết đổi vị trí

// thêm mới sản phẩm
module.exports.create = async (req, res) => {
    const listCategory = await ProductCategory.find({
        deleted: false
    })
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
        listCategory: listCategory
        
    });
}

module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }else{
        const countRecord = await Product.countDocuments()
        req.body.position = countRecord + 1;
    }
    const record = new Product(req.body);
    await record.save();
    res.redirect(`/${systemComfig.prefixAdmin}/products`);
}
// 

module.exports.edit = async (req, res) => {
    const id = req.params.id;
    
    const product = await Product.findOne({
        _id: id,
        deleted: false
    })
    
    const listCategory = await ProductCategory.find({
        deleted: false
    })
    res.render("admin/pages/products/edit", {
        pageTitle: "Chỉnh sửa sản phẩm",
        product: product,
        listCategory: listCategory
        
    });
}

// edit patch
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }
    await Product.updateOne({
        _id: id,
        deleted: false
    }, req.body)
    req.flash('success', 'Cập nhật thành công!');
    res.redirect("back");
}
// hết edit

// detail
module.exports.detail = async (req, res) => {
    const id = req.params.id;

    const product = await Product.findOne({
        _id: id,
        deleted: false
    })
    res.render("admin/pages/products/detail", {
        pageTitle: "Chi tiết sản phẩm",
        product: product
        
    });
}
// hết detail