const User = require("../models/user");


module.exports.updateWishlist = async (req, res) => {

    try {
        const { listingId } = req.params;
        const { action } = req.body; // This will be 'add' or 'remove'
        const userId = req.user._id;

        if (action === 'add') {
            // Use $addToSet to add the listing ID to the user's wishlist
            await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: listingId } });
            return res.status(200).json({ message: "Listing added to wishlist." });
        } else if (action === 'remove') {
            // Use $pull to remove the listing ID from the wishlist
            await User.findByIdAndUpdate(userId, { $pull: { wishlist: listingId } });
            return res.status(200).json({ message: "Listing removed from wishlist." });
        }

        // If the action is something else, return an error
        res.status(400).json({ message: "Invalid action." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Show wishlist Page 
module.exports.showWishlist = async (req, res) => {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.render("listings/wishlist", { allListings: user.wishlist, category: "Wishlist" });
};