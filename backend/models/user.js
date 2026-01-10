const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// .default extracts the actual plugin function
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);



/* passport-local-mongoose

passport-Local-Mongoose will automatically add a userName, hash and salt field to store the userName, the hashed password and salt value.
so there is no need to create column password and userName */