const userModel = require("./model");
const bcrypt = require("bcryptjs");
const { response, errorObject } = require("./utils");

const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
  try{
    // find user
    const {email, password } = req.body;
    // check if the user is already registered
    const user = await userModel.findUser({ email: email });

    //user does not exits
    if(!user){
      errorObject(req, "userDoesNotExist", 404);
    }
    // match password
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched){
      errorObject(req, 'passwordDoesNotExist', 404);
    }
    const tokenData = { name:user.name, email:user.email}
    const token = `Bearer ${jwt.sign(tokenData, 'secret', { expiresIn: '1h' })}`;
    const loginUserSuccessfully = req.t("loginUserSuccessfully");
    return response({res, statusCode:201, message:loginUserSuccessfully, token});
  } catch(err){
     next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    
    const { name, email, password } = req.body;
    // check if the user is already registered
    const isAlreadyRegistered = await userModel.findUser({ email: email });
     
    // user exists already
    if (isAlreadyRegistered) {
      errorObject(req, "userAlreadyRegistered", 409);
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword };

    // adding user to the database
    await userModel.registerUser(user);

    const userRegisterSuccessfully = req.t("userRegisterSuccessfully");
    return response({res, statusCode:201, message:userRegisterSuccessfully});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser: loginUser,
  registerUser: registerUser,
};
