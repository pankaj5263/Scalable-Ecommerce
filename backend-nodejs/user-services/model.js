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

const findUser = (query) => {
    const user  = UserModel.findOne(query);
    return user;
}

const getAllUsers = () => {
    const user  = UserModel.find({});
    return user;
}

const updateUser = (query, updateData) => {
   return UserModel.findOneAndUpdate(query, updateData, {upsert: true});
}

const deleteUser = (query) => {
   return UserModel.deleteOne(query);
}


module.exports = {
    registerUser: registerUser,
    findUser: findUser,
    getAllUsers:getAllUsers,
    updateUser:updateUser,
    deleteUser:deleteUser,
}
