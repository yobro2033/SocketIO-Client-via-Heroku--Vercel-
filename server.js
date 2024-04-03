const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const Message = require('./models/Message');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "*", // Adjust according to your security requirements
      methods: ["GET", "POST"]
    }
});

const MONGODB_URI = ""


// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.get('/', (req, res) => {
  res.send('<h1>Socket.IO Server</h1>');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming chat messages
    socket.on('chatMessage', async (data) => {
        const { user, recipient, content } = data;
        const message = new Message ({
            username: user,
            recipient: recipient,
            content: content,
        });
        console.log('Message received: ', message);

        await message.save(); // Save message to MongoDB
        console.log('Message saved to MongoDB');
        io.emit('message', data); // Broadcast message to all clients
        console.log('Message broadcasted to all clients');
    });
    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
