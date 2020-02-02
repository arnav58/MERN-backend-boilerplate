// Import packages
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import models
const User = require("../models/User");

// Import validations
const { registerValidation, loginValidation } = require("../validation")

// @POST req: Register new user
router.post("/register", async (req, res) => {
    // User input validation
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if user is already in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email already exists!");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    // Saving new user
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch(err) {
        res.status(400).send(err);
    }
});

// @POST req: Login user
router.post("/login", async (req, res) => {
    // User input validation
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if user exists in database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("User doesn't exist!");

    // Validate password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password!");

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    res.header("auth-token", token).send(token);
});

module.exports = router;