const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { redirectUrl } = require("../middleware");
const userController=require("../controllers/user");

router
    .route("/signup")
    .get((req,res)=>{
        res.render("users/signUp.ejs");
    })
    .post(wrapAsync(userController.signup));

router
    .route("/login")
    .get((req,res)=>{
        res.render("users/login.ejs");
    })
    .post(redirectUrl,
        passport.authenticate('local',
            {failureRedirect:"/login",failureFlash:true}),
        userController.login);

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
});

module.exports=router;