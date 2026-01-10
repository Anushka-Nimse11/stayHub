const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// create database
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlustA";

main().then(() =>{                        // calling main function
    console.log("connected to db");
})
.catch((err) =>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({
        ...obj, owner: "695f863745abdc8dffe8321e"
    }))
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};

initDB();