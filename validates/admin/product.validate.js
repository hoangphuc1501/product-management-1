module.exports.createPost = (req, res, next) => {
    if(!req.body.title){
        req.flash('error', 'Tiêu đề không được bỏ trống~');
        res.redirect("back");
        return;
    }

    if(req.body.title.length < 5){
        req.flash('error', 'Tiêu đề ít nhất 5 ký tự!');
        res.redirect("back");
        return;
    }
    next();
}