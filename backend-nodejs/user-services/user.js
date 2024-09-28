const express = require('express');
require('dotenv').config();
const userService = express();
const userController = require('./controller');
const dbConnection = require('../config/database');

const userPort = process.env.USER_SERVICES_PORT;

dbConnection('users');
userService.use(express.json());

userService.post('/user/login', userController.loginUser);

userService.post('/user/register', userController.registerUser);

userService.listen(userPort, function(error){
    if(error){
      throw new Error("User service - Couldn't listen the server", userPort)
    }

    console.log("User service listening on port", userPort);
});

