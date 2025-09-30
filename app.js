if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const helmet = require("helmet");

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const wishlistRouter = require("./routes/wishlist.js");
const bookingRouter = require("./routes/booking.js");

const Mongo_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

// const Mongo_URL = process.env.MONGO_URL                     //   use when  want to see deploying preview in local machine  
// const Mongo_URL =  "mongodb://127.0.0.1:27017/wanderlust";  // when you clone this ->  prefer to use this for better understanding  


main()
    .then(() => {
        console.log("Connected to Db");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(Mongo_URL);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // <-- ADD THIS LINE HERE
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// In app.js

// ---------------------- HELMET SECURITY MIDDLEWARE (CORRECTED) ---
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://www.paypal.com", // Added for PayPal script
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://www.paypal.com", // Added for PayPal API calls
];
// ✅ THE FIX IS HERE
const fontSrcUrls = ["https://fonts.gstatic.com"];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dhpaiyp7b/",
                "https://images.unsplash.com/",
            ],
            // ✅ THE FIX IS APPLIED HERE
            fontSrc: ["'self'", ...fontSrcUrls],
            // Added for PayPal iFrame
            frameSrc: ["'self'", "https://www.paypal.com"],
        },
    })
);
// ---------------------- END OF HELMET CONFIG ---------------------



const store = MongoStore.create({
    mongoUrl: Mongo_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on("error", (err) => {
    console.log("Error in Mongo Session Store ", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}




app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    next();
})





// ---------------'
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/wishlist", wishlistRouter);
app.use("/bookings", bookingRouter);
app.use("/", userRouter); // Keep general routes like login/signup last

// API routes
app.use("/api/wishlist", wishlistRouter);
app.use("/api/booking", bookingRouter);



app.get("/", (req, res) => {
  res.redirect("/listings");
})


// Middlewares used 

app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!."));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });


})

app.listen(port, (req, res) => {
    console.log(`server is Listening to port:  ${port}`);
})