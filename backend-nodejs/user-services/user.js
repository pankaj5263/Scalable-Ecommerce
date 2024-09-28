const express = require('express');
const userController = require('./controller');
const dbConnection = require('../config/database');
require('dotenv').config();
const { registerValidator, loginValidator, validate } = require('./validators/userValidators');
const errorHandler = require("./middlewares/errorHandlers");
const { initI18next, i18nextMiddlewareHandler } = require('./i18n');

// start user server
const userService = express();

initI18next();
userService.use(i18nextMiddlewareHandler);
const userPort = process.env.USER_SERVICES_PORT;

dbConnection('users');
userService.use(express.json());

userService.post('/user/login',loginValidator, validate, userController.loginUser);

userService.post('/user/register',registerValidator, validate, userController.registerUser);

userService.use(errorHandler);

userService.listen(userPort, function(error){
    if(error){
      throw new Error("User service - Couldn't listen the server", userPort)
    }

    console.log("User service listening on port", userPort);
});

