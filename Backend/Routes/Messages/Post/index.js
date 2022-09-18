const express = require('express');
const { Message } = require('../../../Models/messages');
const { User } = require("../../../Models/user");
const router = express.Router();

const { Server } = require('socket.io');
const { server } = require('../../../server');

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
})

router.post('/send', (req, res) => {
    const msg = new Message(req.body);
    msg.save( (err, doc) => {
        if(err) res.send(err);
        res.status(200).send(doc);
    } )
})

router.post('/room', (req, res) => {
    io.on("connection", (socket) => {})
})

module.exports = router;
