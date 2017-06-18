var Campground = require("../models/campgrounds"),
    Comment = require("../models/comments");


var middlewareObj = {};

middlewareObj.checkCampgroundOwnerShip = function(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.flash("error", "Campground not found");
               res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.flash("error", "Permission denied :(");
                    res.redirect("back");
                }
            }
        });
        
    } else {
        req.flash("error", "You need to login first");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnerShip = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
               res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.flash("error", "Permission denied :(");
                    res.redirect("back");
                }
            }
        });
        
    } else {
        req.flash("error", "You need to login first");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to login first");
    res.redirect("/login");
};

module.exports = middlewareObj;