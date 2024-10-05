const express = require('express');
const http = require('http');  // Step 1: Import the http module
const { Server } = require('socket.io'); // Step 2: Import socket.io
const productController = require('./controller');
const dbConnection = require('../config/database');
require('dotenv').config();
const {
  registerValidator,
  loginValidator,
  userUpdateValidator,
  userDeleteValidator,
  currentUserValidator,
  validate
} = require('../user-services/validators/userValidators');
const errorHandler = require("./middleware/errorHandler");
const { initI18next, i18nextMiddlewareHandler } = require('../i18n');

// Initialize express app
const productService = express();
initI18next();
productService.use(i18nextMiddlewareHandler);

const productPort = process.env.PRODUCT_SERVICES_PORT;

// Database connection
dbConnection('products');
productService.use(express.json());

// Product API endpoints
productService.get('/', productController.getProductList);
productService.get('/product-details/:productId', productController.productDetails);
productService.post("/add-product", productController.addProduct);
productService.put('/edit-product/:productId', productController.editProduct);
productService.delete('/delete-product/:productId', productController.deleteProduct);
productService.get('/catagory-products/:catagory', productController.catagoryProduct);

// Error handler
productService.use(errorHandler);

// Step 3: Create an HTTP server
const server = http.createServer(productService);

// Step 4: Initialize socket.io with the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Add CORS support if needed
    methods: ["GET", "POST"]
  }
});

// Step 5: Listen for WebSocket connections
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Listening for events from the client (for example, a "message" event)
  socket.on('message', (data) => {
    console.log('Message received from client:', data);

    // Emitting a message back to the client or broadcasting to all clients
    io.emit('message', `Message from server: ${data}`);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Step 6: Start the HTTP server (instead of productService.listen)
server.listen(productPort, (error) => {
  if (error) {
    throw new Error("Product catalog service - Couldn't start the server on port", productPort);
  }
  console.log("Product catalog service listening on port", productPort);
});
