const userModel = require('./model');
const loginUser = (req, res) => {
  return res.send("<h1>login user</h1>");
}

const registerUser = async (req, res) => {
    try{
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    
        await userModel.registerUser(user);
        return res.status(201).json({message:"User registered successfully", status:201});;
    } catch(error){
      res.status(500).json({message: error.message, status: 500});
    }

}

module.exports ={
    loginUser: loginUser,
    registerUser: registerUser
}