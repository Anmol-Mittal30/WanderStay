const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

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

const intiDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>
    ({
        ...obj,
        // image: obj.image.url,
        owner: "68c95a75987af0a32c93ff0d"
    }));

    await Listing.insertMany(initData.data);
    console.log("data was initailized");

}
intiDB();