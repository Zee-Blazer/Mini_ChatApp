const express = require('express');
const router = express.Router();

const { User } = require('../../../Models/user');

router.post('/user', (req, res) => {
    const user = new User(req.body);
    user.save( (err, doc) => {
        if(err) return err;
        res.status(200).send(doc);
    } )
})

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(err) return err;

        if(!user) return res.status(400).json({ isAuth: false, msg: "No User found" })

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(err) return err;

            if(!isMatch) return res.status(400).json({ isAuth: false, msg: "Wrong Password" })

            res.status(200).json({ isAuth: true, user });
        })
    })
})

module.exports = router;
