const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const produtCategoryRoute = require("./product-category.route");
const role = require("./role.route");
const accounts = require("./account.route");
const systemConfig = require("../../config/system");

module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
    app.use(`${PATH_ADMIN}/products`, productRoute);
    app.use(`${PATH_ADMIN}/products-category`, produtCategoryRoute);
    app.use(`${PATH_ADMIN}/roles`, role);
    app.use(`${PATH_ADMIN}/accounts`, accounts);
}