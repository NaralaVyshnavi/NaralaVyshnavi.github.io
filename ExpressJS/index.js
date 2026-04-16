var express=require('express');
var app=express();
var fs=require('fs');
app.set('view engine', 'pug')
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
  res.render('index');
});
app.get('/issues',(req,res)=>{
    var issues=JSON.parse(fs.readFileSync('issues.txt').toString());
    res.send(issues);
})
app.get('/movies',(req,res)=>{
    var movies=JSON.parse(fs.readFileSync('movies.txt').toString());
    res.render('index',{movies:[...movies]});
})
app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})