// File: routes/booking.js

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/booking");

// Page to show user's bookings
router.get("/", isLoggedIn, wrapAsync(bookingController.showBookings));

// --- Routes  FOR MANUAL booking  ---
router.post("/:id/book-manually", isLoggedIn, wrapAsync(bookingController.createManualBooking));

// --- API Routes for PayPal ---
router.post("/:id/create-order", isLoggedIn, wrapAsync(bookingController.createPaypalOrder));
router.post("/:orderID/capture", isLoggedIn, wrapAsync(bookingController.capturePaypalOrder));

module.exports = router;