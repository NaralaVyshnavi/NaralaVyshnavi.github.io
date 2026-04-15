var express=require('express');
var app=express();
var session=require("express-session")
var {v4}=require('uuid');
console.log(v4);
var totolUsers=0;
var totalRequests=0;
app.use(session({
    secret:"hushh",
    genid:()=>{
        totolUsers++;
        return v4();
    },
    unset:'destroy'
}))

app.get('/',(req,res,next)=>{
    totalRequests++;
    if(req.session){
        req.session.userCount++;
    }
    else{
        req.session.userCount=0;;
    }
    next();
},(req,res)=>{
    res.send(`
         <h2>Total Users (Sessions): ${totolUsers}</h2>
        <h2>Total Requests: ${totalRequests}</h2>
        <h2>Your Requests (Session): ${req.session.userCount}</h2>`);
  
})
app.listen(3501,()=>{
    console.log("Server running on 3501")
})