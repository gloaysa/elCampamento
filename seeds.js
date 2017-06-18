var mongoose = require("mongoose");
var CampGround = require("./models/campgrounds");
var Comment = require("./models/comments");

var data = [
    {
        name: "Hvítserkur's Land",
        image: "https://source.unsplash.com/-LRuNvY8W7Q",
        description: "Hvítserkur is a 15 m high basalt stack along the eastern shore of the Vatnsnes peninsula, in northwest Iceland. The rock has two holes at the base, which give it the appearance of a dragon who is drinking. The base of the stack has been reinforced with concrete to protect its foundations from the sea. Several species of birds, such as gulls and fulmars, live on at Hvítserkur and its name (“white shirt” in Icelandic) comes from the color of the guano deposited on its rocks."
    },
    {
        name: "Coastal Resort",
        image: "https://source.unsplash.com/ffH2zTGPSzA",
        description: "It was the first day of the week the sky wasn’t entirely covered with clouds. I left work, headed towards Laguna Beach with a clear mind of what to shoot."
    },
    {
        name: "Lake Braies",
        image: "https://source.unsplash.com/p7huyfLrdzc",
        description: "A beautiful mountain lake in Trentino Alto Adige (Italy). The water level is always low, because of a long period without rain, so you can walk under the wooden house."
    }
    ];

function seedDB(){
    //REMOVE ALL CAMPGROUNDS
    CampGround.remove({}, function(err){
        if(err){
            console.log(err);
        }
    //   //ADD FEW NEW CAMPGROUNDS
    //     data.forEach(function(seed){
    //         CampGround.create(seed, function(err, campground){
    //             if(err){
    //                 console.log(err);
    //             } else {
    //                 //CREATE A COMMENT
    //                 Comment.create({
    //                     text: "Hugely thought out! Engaging. It keeps your mind occupied while you wait.",
    //                     author: "Homer"
    //                 }, function(err, comment){
    //                     if(err){
    //                         console.log(err);
    //                     } else {
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                     }
                        
    //                 }); //create comments ends here
    //             }
    //         });//create campgrounds ends here
    //     });//forEach ends here
     });//campground.remove ends here
} //seedDB ends here

module.exports = seedDB;

