var UserModel=require('../models/User.model');
 var getAllUsers=(req,res)=>{
    UserModel.find().then((data)=>{
        res.send(data);
    })
}
var addNewUser=(req,res)=>{
    console.log(req.body);
    var newUser=new UserModel({...req.body});
    newUser.save();
    res.send("File uploaded");
}
module.exports={
    getAllUsers,
    addNewUser
}