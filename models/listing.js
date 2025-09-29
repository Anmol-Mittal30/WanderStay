const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");
const Booking = require("./booking.js");
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        required: true,
    },

    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },

    },
    // Category section  
    category: {
        type: String,
        required: true,
        enum: [ // Optional: Use enum to restrict to a specific list of categories
            "Trending",
            "Rooms",
            "Iconic Cities",
            "Mountains",
            "Castles",
            "Amazing Pools",
            "Camping",
            "Farms",
            "Arctic",
            "Domes",
            "Boats"
        ]
    }


})

// listingSchema.post("findOneAndDelete", async (listing) => {
//     if (listing) {
//         await Review.deleteMany({ _id: { $in: listing.reviews } });

//         // if (listing.reviews.length) {
//         //     await Review.deleteMany({ _id: { $in: listing.reviews } });
//         // }
//         //  Delete associated bookings
//         await Booking.deleteMany({ listing: listing._id });
//     }
// })


// Virtual Properties 
listingSchema.virtual('cardImage').get(function () {
    //  creates URL for a smaller, optimized image for cards
    return this.image.url.replace('/upload', '/upload/w_300,q_auto:good');
});

listingSchema.virtual('showImage').get(function () {
    // creates a URL for a larger, high-quality image for the show page
    return this.image.url.replace('/upload', '/upload/w_800,q_auto:best');
});

//  middleware to delete associated reviews and bookings
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        // Delete associated reviews
        if (listing.reviews.length) {
            await Review.deleteMany({ _id: { $in: listing.reviews } });
        }
        // Delete associated bookings
        await Booking.deleteMany({ listing: listing._id });
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


