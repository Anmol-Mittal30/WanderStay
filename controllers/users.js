
const User = require("../models/user");
const Booking = require("../models/booking");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password, name, mobile } = req.body;
        const newUser = new User({ email, username, name, mobile });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", `Welcome to Wanderlust, ${name}!`);
            req.session.save((err) => {
                if (err) return next(err);
                res.redirect("/listings");
            });
        });

    } catch (err) {
        req.flash("error", err.message);
        req.session.save((err) => {
            if (err) return next(err);
            res.redirect("/signup");
        });
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res, next) => { // Added next
    const userName = req.user.name || "Wanderlust";
    req.flash("success", `Welcome to Wanderlust, ${userName}. You are Logged in!`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    req.session.save((err) => {
        if (err) return next(err);
        res.redirect(redirectUrl);
    });
};

module.exports.showProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    const userWithWishlist = await User.findById(req.user._id).populate("wishlist");
    const bookings = await Booking.find({ user: req.user._id }).populate("listing");

    res.render("users/profile", {
        user: user,
        bookings: bookings,
        wishlist: userWithWishlist.wishlist
    });
};

module.exports.renderEditProfileForm = (req, res) => {
    res.render("users/edit_profile.ejs", { user: req.user });
};

module.exports.updateProfile = async (req, res, next) => { // Added next
    const { id } = req.user;
    await User.findByIdAndUpdate(id, req.body.user);
    req.flash("success", "Profile Updated Successfully!");
    req.session.save((err) => {
        if (err) return next(err);
        res.redirect("/profile");
    });
};

module.exports.renderChangePasswordForm = (req, res) => {
    res.render("users/change_password.ejs");
};

module.exports.changePassword = async (req, res, next) => { // Added next
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        req.flash("error", "New passwords do not match.");
        return req.session.save((err) => {
            if (err) return next(err);
            res.redirect("/profile/change-password");
        });
    }

    const user = await User.findById(req.user._id);
    user.changePassword(oldPassword, newPassword, (err) => {
        if (err) {
            req.flash("error", "Incorrect old password.");
            return req.session.save((saveErr) => {
                if (saveErr) return next(saveErr);
                res.redirect("/profile/change-password");
            });
        }
        req.flash("success", "Password updated successfully!");
        req.session.save((saveErr) => {
            if (saveErr) return next(saveErr);
            res.redirect("/profile");
        });
    });
};

module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Changed to pass the error
        }
        req.flash("success", "You are logged out now!");
        req.session.save((saveErr) => {
            if (saveErr) return next(saveErr);
            res.redirect("/listings");
        });
    });
};
