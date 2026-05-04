var express=require('express');
const {
    getAllUsers,
    addNewUser
} =require('../controllers/User.controller');
var router=express.Router();
var UserModel=require("../models/User.model");

router.get('/getAllUsers',getAllUsers);

router.post('/uploadPic',(req,res)=>{
    console.log(req.body);
  console.log(req.file);
  var newUser = new UserModel({ ...req.body, profilePic: req.file.path });
  newUser.save();
  res.send("File uploaded to the location " + req.file.path);
});
module.exports=router;