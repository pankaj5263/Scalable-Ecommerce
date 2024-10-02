const express = require('express');
const userController = require('./controller');
const dbConnection = require('../config/database');
require('dotenv').config();
const { registerValidator, loginValidator, userUpdateValidator, userDeleteValidator, validate } = require('./validators/userValidators');
const errorHandler = require("./middlewares/errorHandlers");
const { initI18next, i18nextMiddlewareHandler } = require('./i18n');

// start user server
const userService = express();

initI18next();
userService.use(i18nextMiddlewareHandler);
const userPort = process.env.USER_SERVICES_PORT;

dbConnection('users');
userService.use(express.json());
// users API endpoint
userService.get('/users', userController.getUsers);
userService.put('/users/update-user',userUpdateValidator, validate, userController.updateUserDetails)
userService.delete('/users/delete-user', userDeleteValidator, validate, userController.deleteUser);
// user login and register API endpint
userService.post('/users/login',loginValidator, validate, userController.loginUser);
userService.post('/users/register',registerValidator, validate, userController.registerUser);


userService.use(errorHandler);

userService.listen(userPort, function(error){
    if(error){
      throw new Error("User service - Couldn't listen the server", userPort)
    }

    console.log("User service listening on port", userPort);
});

