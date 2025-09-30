
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//  Index Route 
module.exports.index = async (req, res) => {
    const { category, location, price } = req.query;
    const filter = {};

    if (category && category !== "") {
        filter.category = category;
    }
    if (location) {
        filter.$or = [
            { location: { $regex: location, $options: "i" } },
            { country: { $regex: location, $options: "i" } },
        ];
    }
    if (price) {
        filter.price = { $lte: parseInt(price) };
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", {
        allListings,
        category,
        location,
        price
    });
};

// New Route 
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// Show Route 
module.exports.showListing = async (req, res, next) => { // Added next for error handling
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id)
            .populate({
                path: "reviews", populate: {
                    path: "author",
                },
            })
            .populate("owner");

        if (!listing) {
            req.flash("error", "Listing you requested for does not exist!");
            //  Wait for session to save before redirecting.
            return req.session.save((err) => {
                if(err) return next(err);
                res.redirect("/listings");
            });
        }
        res.render("listings/show.ejs", { listing ,mapToken: process.env.MAP_TOKEN  });
    } catch (err) {
        req.flash("error", "Something Went Wrong. Try Again");
        //  Wait for session to save before redirecting.
        return req.session.save((err) => {
             if(err) return next(err);
             res.redirect("/listings");
        });
    }
};

// Create Route 
module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        })
        .send();

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();

    req.flash("success", "New Listing Created!");
 
    req.session.save((err) => {
        if(err) return next(err);
        res.redirect("/listings");
    });
};

// Edit Route 
module.exports.renderEditForm = async (req, res, next) => { // Added next
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return req.session.save((err) => {
             if(err) return next(err);
             res.redirect("/listings");
        });
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_300");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update Route 
module.exports.updateListing = async (req, res, next) => { // Added next
    let { id } = req.params;
    let data = req.body.listing;

    // First, update the geometry if the location has changed
    if (data.location) {
        try {
            const response = await geocodingClient.forwardGeocode({
                query: data.location,
                limit: 1
            }).send();

            if (response && response.body.features.length > 0) {
                data.geometry = response.body.features[0].geometry;
            } else {
                req.flash("error", "The location you entered could not be found. Please try again.");
                return req.session.save((err) => {
                    if (err) return next(err);
                    res.redirect(`/listings/${id}/edit`);
                });
            }
        } catch (err) {
            req.flash("error", "Something went wrong with location services.");
            return req.session.save((err) => {
                if(err) return next(err);
                res.redirect(`/listings/${id}/edit`);
            });
        }
    }

    // Then, update the listing in the database
    let updatedListing = await Listing.findByIdAndUpdate(id, data, { runValidators: true });

    // If a new file was uploaded, add its URL and filename
    if (req.file) {
        updatedListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await updatedListing.save();
    }

    req.flash("success", "Listing Updated!");
    // ✅ THE FIX for successful update
    req.session.save((err) => {
        if (err) return next(err);
        res.redirect(`/listings/${id}`);
    });
};


// Delete Route 
module.exports.destroyListing = async (req, res, next) => { // Added next
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
   
    req.session.save((err) => {
        if(err) return next(err);
        res.redirect("/listings");
    });
};
