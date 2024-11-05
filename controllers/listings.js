const Listing=require("../models/listing");

module.exports.home=async (req,res)=>{
    if(req.query.country===""&&req.query.category===""){
        documents=await Listing.find();
    }else{
        documents=await Listing.find(req.query);
    }
    res.render("listings/home.ejs",{documents});
}

module.exports.new=async (req,res)=>{
    res.render("listings/new.ejs");
}    

module.exports.show=async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!list){
        req.flash("error","Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
}

module.exports.addNewListing=async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename}
    await newListing.save();
    req.flash("success","New listing is added!");
    res.redirect("/listings");
}

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    let originalUrl=list.image.url;
    originalUrl=originalUrl.replace("/upload","/upload/w_200");
    if(!list){
        req.flash("error","Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{list,originalUrl});
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
        
    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }

    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroy=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
}