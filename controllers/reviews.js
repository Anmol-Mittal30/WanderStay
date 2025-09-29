
const Listing = require("../models/listing");
const Review = require("../models/review");

// Create Route for Review
module.exports.createReview = async (req, res) => {

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New review Created!")
    // res.redirect(`/listings/${listing._id}`);
    //  FIX: Wait for session to save before redirecting.
    req.session.save((err) => {
        if (err) return next(err);
        res.redirect(`/listings/${listing._id}`);
    });
}

// Delete Route For review 
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!")
    // res.redirect(`/listings/${id}`);
     req.session.save((err) => {
        if (err) return next(err);
        res.redirect(`/listings/${id}`);
    });
}