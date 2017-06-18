var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds:allCampgrounds});
       }
    });
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to Campground 
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author:author};
    //Create a new campground and save it to DB
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log(req.user.username + " created a campground:");
            console.log(campground.name);
            res.redirect("/campgrounds");
        }
    });
});

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//SHOW
router.get("/:id", function(req, res){
   //find Campground with provided id and render template with that campground
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if (err){
          console.log(err);
      } else {
          res.render("campgrounds/show", {campground:foundCampground});
      }
   });
});

//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnerShip, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground:foundCampground});
    });
});

//UPDATE
router.put("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCampground){
       if(err){
          return res.redirect("/campgrounds");
       }
       console.log(req.user.username + " updated a campground:");
       console.log(foundCampground.name);
       res.flash("success", "Campground updated");
       res.redirect("/campgrounds" + req.params.id);
   });
});

//DELETE
router.delete("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            console.log(req.user.username + " deleted a campground:");
            console.log(foundCampground.name);
            res.flash("success", "Campground deleted");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;