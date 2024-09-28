const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', schema);

const registerUser = (userDetails) => {
   const user = new UserModel(userDetails);
   return user.save();
}

const findUser = (userDetails) => {
    const user  = new UserModel.findOne(query);
    return user;
}


module.exports = {
    registerUser: registerUser,
    findUser: findUser
}
