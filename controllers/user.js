const User=require("../models/user");

module.exports.signup=async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=new User({
            email:email,
            username:username,
        });
        let registerUser=await User.register(newUser,password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WonderLust");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.login=async(req,res)=>{
    let redirectUrl=res.locals.redirectUrl || "/listings";
    req.flash("success","Welcome back to WonderLust");
    res.redirect(redirectUrl);
}