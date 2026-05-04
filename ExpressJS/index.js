var express=require('express');
var app=express();
var fs=require('fs');
require('dotenv').config();
var cors=require('cors');
app.use(cors());
var mongoose = require("mongoose");
var jwt =require('jsonwebtoken');
var {v4:uuid}=require('uuid');
app.set('view engine', 'pug')
var connectDB=require('./db')
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

var multer=require('multer');
const storage=multer.diskStorage({
  destination:function (req,file,cb){
    cb(null,'./uploads');
  },

  filename:(req,file,cb)=>{
      console.log("req.file",file);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  
  }
}
)
const upload=multer({storage:storage});


var userRouter=require("./routers/User.router");

connectDB();



app.get('/',(req,res)=>{
  res.send("hello")
});
app.post('/login',(req,res)=>{
console.log(req.body);
var fd=JSON.parse(fs.readFileSync(__dirname + "/users.txt").toString());
var user=fd.find(u=>u.username==req.body.username && u.password==req.body.password);
if(user){
    var token=jwt.sign({...req.body},"secret");
    res.send({msg:"Login successful",token,username:req.body.username});
}
    else{
        res.send({msg:"login failed"});
    }
}
);


app.use('/users',userRouter);


app.get('/todos',(req,res)=>{
    console.log(req.headers.token);
    var k=jwt.verify(req.headers.token,"secret");
    console.log(k);
   var fd = JSON.parse(fs.readFileSync(__dirname + "/todos.txt").toString());
    var userTodos = fd.filter((todo) => {
    if (todo.username === k.username) {
      return true;
    }
  });
  res.send(userTodos);
})

app.listen(  process.env.PORT||3600,(req,res)=>{
    console.log("Server is running on port 3600");
})