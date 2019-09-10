const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        post: {
            title: 'My first Post',
            description: 'Ramdom data you shoudtnt access'
        }
    });
});

module.exports = router;