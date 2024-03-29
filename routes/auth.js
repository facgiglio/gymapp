const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

    //Data validation.
    const { error } = registerValidation(req.body);
    if (error) res.status(400).send(error.details);

    //Check if the user exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist.');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.header('auth-token').send({ user: user._id });

    } catch (err) {
        res.status(400, err);
    }
});

router.post('/login', async (req, res) => {
    //Login valdiation
    const { error } = loginValidation(req.body);
    if (error) res.status(400).send(error.details);

    //Check if the user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Wrong email or password.');

    //Checking if passwor is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Wrong email or password.');

    //Create and assing a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;