// Import packages
const router = require("express").Router();
const verify = require("./verifyToken");

// Import models
const User = require("../models/User");

router.get("/", verify, function(req, res) {
    res.send(req.user);
    User.findOne({_id: req.user._id});
});

module.exports = router;