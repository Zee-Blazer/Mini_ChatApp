const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const http = require('http');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/', (req, res) => {
    res.send("Hello there")
})

// GET USERS
app.use('/view', require('./Routes/User/Get/index'));

// POST USERS
app.use('/add', require('./Routes/User/Post/index'));

// POST MESSAGES
app.use('/msg', require('./Routes/Messages/Post/index'));

const port = process.env.PORT || 9000

server.listen( port, () => console.log(`Server is running on PORT: ${process.env.PORT}`) )

module.exports = { server };

// io.on("connection", (socket) => {

//     socket.on("join__room", (data) => {
//         socket.join(data);
//     })

//     socket.on("send__msg", (data) => {
//         socket.to(data.room).emit("received__msg", data);
//     })
// })