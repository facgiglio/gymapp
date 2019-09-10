const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation')

router.post('/register', async (req, res) => {

    //Data validation.
    const { error } = registerValidation(req.body);
    if (error) res.status(400).send(error.details);

    //Check if the user exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist.');

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);

    } catch (err) {
        res.status(400, err);
    }



});


module.exports = router;