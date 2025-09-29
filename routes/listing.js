const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateLisiting } = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer = require("multer");

const { storage } = require("../cloudConflict.js");
const upload = multer({ storage });

// Index and Create Route Handles 
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        // validateLisiting,
        upload.single("listing[image]"),
        wrapAsync(listingController.createListing)
    );

// New route 
router.get("/new", isLoggedIn, listingController.renderNewForm);
  
// Category Route 
router.get("/category/:category", wrapAsync(listingController.showByCategory));


// Show  , Update , Delete Route Handles 
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateLisiting,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing));






// Edit Route 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Reserve Route (Protected by isLoggedIn)  if user is not owner of that Listing 
router.get("/:id/reserve", isLoggedIn, (req, res) => {
    req.flash("error", "You are not the Owner of this listing!. Can't do Changes !");
    res.redirect(`/listings/${req.params.id}`);
});

module.exports = router;
