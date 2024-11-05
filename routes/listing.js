const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router
    .route("/")
    .get(wrapAsync(listingController.home))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.addNewListing)
    );

router.get("/new",isLoggedIn,wrapAsync(listingController.new));

router.get("/")

router
    .route("/:id")
    .get(wrapAsync(listingController.show))
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroy));

router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEditForm)); 

module.exports=router;