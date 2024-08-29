const http = require("http");
const app = require("./app"); // Import your Express app
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: ["https://b2b-mern-frontend.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", (ticketId, message) => {
    // Emit the message to all clients listening to this ticketId
    io.emit(`messageReceived:${ticketId}`, message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Export the server and io instance
module.exports = { server, io };
