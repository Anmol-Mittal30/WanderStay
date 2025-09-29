const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const wishlistController = require("../controllers/wishlist");

//  "My Wishlist" page Routes 
router.get("/", isLoggedIn, wrapAsync(wishlistController.showWishlist));


// full path will be /api/wishlist/:listingId  because of how we use it in app.js
router.post("/:listingId", isLoggedIn, wrapAsync(wishlistController.updateWishlist));

module.exports = router;