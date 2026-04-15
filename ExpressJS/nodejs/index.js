var express=require('express');
var app=express();
var session=require("express-session")
var {v4}=require('uuid');
var parser=require("body-parser");
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());
app.use(express.static(__dirname+'/public'));
var fs=require("fs");
app.use(session({
    secret:"hushh",
    genid:()=>{
        return v4();
    },
    resave: false,
    saveUninitialized: false,
    unset:'destroy'
}))
app.get('/',(req,res)=>{
    res.send("Session Authentication");
})
app.post('/login',(req,res)=>{
    var data=JSON.parse(fs.readFileSync('users.txt').toString());
    console.log(data);
    console.log(req.body)
    var user=data.find(u=>{
        if(u.username==req.body.username && u.password==req.body.password){
            return true;
        }
    })
    if(user){
        req.session.userDetails=user;
        res.send("Logged in")
    }
    else{
        res.send("Invalid credentials")
    }
})
function auth(req,res,next){
    if(req.session.userDetails){
        next();
    }
    else{
        res.redirect('/login.html')
    }
}
app.get('/getTodos',auth,(req,res)=>{
    var user=req.session.userDetails;
    var ui="<ul>";
    user.todos.forEach(t=>{
        ui+=`<li>${t}</li>`
    })
    ui+='</ul>'
    res.send(ui)
})
app.get('/add',auth,(req,res)=>{
    res.send("hello");
})
app.listen(3501,()=>{
    console.log("Server 3501")
})