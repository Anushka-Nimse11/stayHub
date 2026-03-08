// if(process.env.NODE_ENV != "production"){
//   require('dotenv').config();
// }

// const express = require("express");
// const app = express();
// const cors = require('cors');
// const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
// // const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const userRouter = require("./routes/user.js");
// const ListingRouter = require("./routes/listing.js");
// const ReviewRouter = require("./routes/review.js");
// const User = require("./models/user.js");

// // Database
// // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlustA";
// const dbUrl = process.env.ATLASDB_URL;
// main()
//   .then(() => console.log("connected to db"))
//   .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(dbUrl);
// }

// app.use(
//   cors({
//     origin: "http://localhost:5173", // your frontend URL
//     credentials: true, // allow sending cookies
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // MangoDB Atlas
// const store = new MongoStore({
//   url: dbUrl,                    
//   secret: process.env.SECRET,
//   touchAfter: 24 * 3600,
// });

// store.on("error", (err) =>{
//   console.log("ERROR IN MONGO SESSION STORE", err);
// }); 

// // session
// const sessionOptions = {
//   store,
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };

// app.use(session(sessionOptions));

// // Authentication method
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// // file from routes
// app.use("/listings", ListingRouter);
// app.use("/listings/:id/reviews", ReviewRouter);
// app.use("/user", userRouter)

// app.use((req, res, next) =>{
//   res.locals.currUser = req.user;
//   next();
// });

// // port
// app.listen(8000, () => {
//   console.log("server is listening to port 8000");
// });





if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userRouter = require("./routes/user.js");
const ListingRouter = require("./routes/listing.js");
const ReviewRouter = require("./routes/review.js");
const User = require("./models/user.js");

// --- CORS ---
const allowedOrigins = [
  "http://localhost:5173",
  "https://stayhub-frontend-ib8c.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// --- Connect to MongoDB ---
mongoose.connect(process.env.ATLASDB_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("MongoDB connection error:", err));

// --- Session store ---
const store = new MongoStore({
  mongooseConnection: mongoose.connection,
  secret: process.env.SECRET,
  touchAfter: 24 * 3600,
});

store.on("error", (err) => console.log("MongoStore error:", err));

app.use(session({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

// --- Passport setup ---
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- Routes ---
app.use("/listings", ListingRouter);
app.use("/listings/:id/reviews", ReviewRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});

// --- Listen ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});