const userModel = require("./model");
const bcrypt = require("bcryptjs");
const { response, errorObject } = require("./utils");

const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    const fetchedUserSuccessfully = req.t("fetchedUserSuccessfully");
    return response({
      res,
      statusCode: 201,
      message: fetchedUserSuccessfully,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try{
    const {id} = req.body;
    const user = await userModel.findUser({ _id: id }).select('-password -__v').lean();
    //user does not exits
    if (!user) {
      return errorObject(req, "userDoesNotExist", 404);
    }
    const fetchedUserSuccessfully = req.t("fetchedUserSuccessfully");
    return response({
      res,
      statusCode: 201,
      message: fetchedUserSuccessfully,
      data: user,
    });

  } catch (err) {
     next(err);
  }
}

const updateUserDetails = async (req, res, next) => {
  try {
    // check if user exists
    const { id, data } = req.body;
    // check if the user is already registered
    const user = await userModel.findUser({ _id: id }).select("-password").lean();

    //user does not exits
    if (!user) {
      return errorObject(req, "userDoesNotExist", 404);
    }

    const { _id, __v, ...userData } = user;

    const userUpdatedDetails = {
      ...userData,
      ...data,
    };
    const updateduser = await userModel.updateUser(
      { _id: id },
      userUpdatedDetails
    );

    const updatedUserSuccessfully = req.t("updatedUserSuccessfully");
    return response({
      res,
      statusCode: 201,
      message: updatedUserSuccessfully,
      data: updateduser,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    // check if the user is already registered
    const user = await userModel.findUser({ _id: id }).lean();

    //user does not exits
    if (!user) {
      return errorObject(req, "userDoesNotExist", 404);
    }

    const deleteUser = await userModel.deleteUser({ _id: id });
    const deleteUserSuccessfully = req.t("deleteUserSuccessfully");
    return response({
      res,
      statusCode: 201,
      message: deleteUserSuccessfully,
      data: deleteUser,
    });
  } catch (err) {
    next(err);
  }
};

// login user
const loginUser = async (req, res, next) => {
  try {
    // find user
    const { email, password } = req.body;
    // check if the user is already registered
    const user = await userModel.findUser({ email: email });

    //user does not exits
    if (!user) {
      errorObject(req, "userDoesNotExist", 404);
    }
    // match password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      errorObject(req, "passwordDoesNotExist", 404);
    }
    const tokenData = { name: user.name, email: user.email };
    const token = `Bearer ${jwt.sign(tokenData, "secret", {
      expiresIn: "1h",
    })}`;
    const loginUserSuccessfully = req.t("loginUserSuccessfully");
    return response({
      res,
      statusCode: 201,
      message: loginUserSuccessfully,
      token,
    });
  } catch (err) {
    next(err);
  }
};
// register user
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
    return response({
      res,
      statusCode: 201,
      message: userRegisterSuccessfully,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers: getUsers,
  getCurrentUser:getCurrentUser,
  loginUser: loginUser,
  registerUser: registerUser,
  updateUserDetails: updateUserDetails,
  deleteUser: deleteUser,
};
