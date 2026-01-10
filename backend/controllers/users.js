const User = require("../models/user");
const passport = require("passport");

module.exports.signUp = async (req, res) =>{
    try{
        let {username, email, password} = req.body;

        // check if username or email exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    
        const newUser = User({email, username});
        const registeredUser = await User.register(newUser, password);
    res.status(201).json(registeredUser);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user)
      return res
        .status(401)
        .json({ error: info?.message || "Invalid username or password" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // get redirect URL
      const redirectUrl = req.session.redirectUrl || "/";

      // clear redirect URL from session
      delete req.session.redirectUrl;

      res.status(200).json({
        message: "Login successful",
        user: {_id: user._id, username: user.username, email: user.email },
        redirectUrl,
      });
    });
  })(req, res, next);
}

module.exports.logOut = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Logged out successfully" });
  });
} 


module.exports.currentUser = (req, res) => {
  if (req.isAuthenticated()) {
return res.json({
  user: {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  },
});
  }
  res.status(401).json({ user: null });
}