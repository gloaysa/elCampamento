var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comments"),
    User = require("./models/users"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    timestamp = require('console-timestamp'),
    methodOverride = require('method-override'),
    flash           = require('connect-flash');
    
//REQUIRING ROUTES
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
//CONFIG
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://Clyde:mirthas@ds131512.mlab.com:31512/elcampamento");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB();
app.use(function(req, res, next){
    console.log('DD-MM-YY hh:mm'.timestamp + ": " + req.method, req.url, req.body);
    next();
});

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Bonnie es muy guapa",
    resave: false,
    saveUninitialized: false
}));

//MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(flash());

//USING ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//SERVER STARTS
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("===========================");
    console.log("YelpCamp server has started");
    console.log("===========================");
});
