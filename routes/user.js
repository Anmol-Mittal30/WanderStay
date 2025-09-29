const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl , isLoggedIn } = require("../middleware.js");

const userController = require("../controllers/users.js");


// Get And Post for  SignUp -> using router.route() 
router.route("/signup")
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signUp));

// Get And Post for Login 
router.route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }),
        userController.login
    );

  
 // My Profile Route 
router.get("/profile", isLoggedIn, userController.showProfile);

//  Edit And Update Profile Form Route 
router.get("/profile/edit", isLoggedIn, userController.renderEditProfileForm);
router.put("/profile", isLoggedIn, wrapAsync(userController.updateProfile));


//  show the change password form Routes 
router.get("/profile/change-password", isLoggedIn, userController.renderChangePasswordForm);

//   handle the password update Route
router.put("/profile/change-password", isLoggedIn, wrapAsync(userController.changePassword));


// Get Req for logout
router.get("/logout", userController.logOut)


module.exports = router;