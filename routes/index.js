var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users");

//ROOT ROUTE
router.get("/", function(req, res){
   res.render("landing"); 
});

//REGISTER FORM
router.get("/register", function(req, res){
    res.render("register");
});

//SIGN UP HANDLING
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log("There was an error:");
           console.log(err);
           console.log("==================");
           req.flash("error", err.message);
           return res.redirect("back");
       }
       passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds");
       });
   });
});

//LOGIN ROUTE
router.get("/login", function(req, res){
    res.render("login");
});

//LOGIN HANDLING
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res){});
    
//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You've been logged out. Bye bye!");
    res.redirect("/campgrounds");
});



module.exports = router;