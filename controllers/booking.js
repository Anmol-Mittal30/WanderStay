
// New Booking deployment 
const Booking = require("../models/booking");
const Listing = require("../models/listing");
const paypalClient = require("../utils/paypalClient");
const paypal = require('@paypal/checkout-server-sdk');

// --- API to Create a paypal purchase ---
module.exports.createPaypalOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { checkIn, checkOut } = req.body;
        const listing = await Listing.findById(id);

        // Availability Check
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const existingBookings = await Booking.find({
            listing: id,
            $or: [{ checkIn: { $lt: end }, checkOut: { $gt: start } }]
        });

        if (existingBookings.length > 0) {
            return res.status(400).json({ error: "Sorry, those dates are already booked." });
        }

        // Calculate Price
        const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
        if (nights < 1) return res.status(400).json({ error: "Check-out must be after check-in." });
        const totalPrice = (nights * listing.price).toFixed(2);

        // Create PayPal Order
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: { currency_code: 'USD', value: totalPrice },
                description: `Booking for ${listing.title} for ${nights} nights`,
            }]
        });

        const order = await paypalClient.execute(request);
        res.status(201).json({ orderID: order.result.id, totalPrice: totalPrice });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// --- API to Capture Payment and Save Booking ---
module.exports.capturePaypalOrder = async (req, res, next) => { // Added next
    const { orderID } = req.params;
    const { listingId, userId, checkIn, checkOut, price } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await paypalClient.execute(request);
        if (capture.result.status === 'COMPLETED') {
            const newBooking = new Booking({
                listing: listingId, user: userId,
                checkIn: new Date(checkIn), checkOut: new Date(checkOut),
                price: price, paypalOrderId: orderID,
            });
            await newBooking.save();
            req.flash("success", "Congratulations! Your booking is confirmed.");

            //  Wait for session with flash message to save before responding.
            req.session.save((err) => {
                if (err) {
                   
                    return res.status(500).json({ error: "Session could not be saved." });
                }
             
                return res.status(201).json({ redirectUrl: `/listings/${listingId}` });
            });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

//  ------- For Manual booking 
module.exports.createManualBooking = async (req, res, next) => { // Added next
    const { id } = req.params;
    const { checkIn, checkOut } = req.body.booking;
    const listing = await Listing.findById(id);

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.price;

    const newBooking = new Booking({
        listing: id,
        user: req.user._id,
        checkIn: start,
        checkOut: end,
        price: totalPrice,
        paypalOrderId: `manual_${Date.now()}` // Create a fake ID
    });

    await newBooking.save();
    req.flash("success", "Success! (Manual Booking)");

   req.session.save((err) => {
        if (err) return next(err);
        res.redirect(`/listings/${id}`);
    });
};

// --- Show "My Trips" inside My Profile Section Page ---
module.exports.showBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate("listing");
    res.render("bookings/index", { bookings });
};
