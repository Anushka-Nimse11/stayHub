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
  require('dotenv').config();
}

const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userRouter = require("./routes/user.js");
const ListingRouter = require("./routes/listing.js");
const ReviewRouter = require("./routes/review.js");
const User = require("./models/user.js");

// Database
const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// ------------------------
// CORS Setup
// ------------------------
const allowedOrigins = process.env.NODE_ENV === "production"
  ? ["https://stayhub-frontend-ib8c.onrender.com"]  // deployed frontend
  : ["http://localhost:5173"];                       // local frontend

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or curl requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from this origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // allow cookies
}));

// ------------------------
// Body parser
// ------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------
// MongoDB Session Store
// ------------------------
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

store.on("error", err => console.log("MongoStore Error:", err));

// ------------------------
// Session
// ------------------------
app.use(session({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
}));

// ------------------------
// Passport Authentication
// ------------------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ------------------------
// Routes
// ------------------------
app.use("/listings", ListingRouter);
app.use("/listings/:id/reviews", ReviewRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});

// ------------------------
// Start server
// ------------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});