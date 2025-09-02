const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
const path = require("path");
const ejsMate = require("ejs-mate");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");


const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

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

app.get("/", (req, res) => {
    res.send("Hii I am a root !.  succcessful");
})

// Index route 
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
})

// New route 
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

// show Route 
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
})

// Post route 
app.post("/listings", async (req, res) => {
    // let {title,description, image, price, country, location}= req.body
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    console.log(newListing);
})

// Edit Route 

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
})

// Update Route 
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
})

// Delete Route 
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

// app.get("/testListing", async(req, res) => {
//         let sampletesting= new Listing({
//             title: "My new Villa",
//             description: "BY the BeautiFul Location",
//             Price: 1200,
//             location: "Calangute , Goa",
//             country: "India",
//         })

//     await  sampletesting.save().then((res)=> console.log(res));
//     console.log("sample was saved");
//     res.send("Successful testing");

// })

app.listen(port, (req, res) => {
    console.log(`server is Listening to port:  ${port}`);
})