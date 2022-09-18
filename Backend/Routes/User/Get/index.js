const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const { User } = require('../../../Models/user');

router.get('/user', (req, res) => {
    User.find( {}, (err, doc) => {
        if(err) return err;
        res.status(200).send(doc);
    } )
})

module.exports = router;
