var express=require('express');
var app=express();
var url=require('url');
var parser=require("body-parser");
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());
app.use(express.static(__dirname+'/public'));
var cookieParser=require("cookie-parser");
app.use(cookieParser())
var fs=require("fs");
   var c=0;
app.get('/',(req,res)=>{
    res.send("namaste Anaa!")
})
app.get('/count',(req,res)=>{ 
  res.send("Count:"+c);
});
app.get('/inc',(req,res)=>{
    c++
    res.send("Count:"+c)
})
app.get('/dec',(req,res)=>{
    c--
    res.send("Count:"+c)
})
function auth(req,res,next){
    if(req.cookies.username && req.cookies.password){
        next();
    }
    else{
       res.redirect("/login.html");
    }
}
app.post('/login',(req,res)=>{
    res.cookie("username",req.body.username);
    res.cookie("password",req.body.password);
    res.send("login aynav")
})
app.use(auth);
app.get('/add/:x/:y',(req,res)=>{
    res.send(+req.params.x + +req.params.y);
})
app.get('/div/:x/:y',(req,res)=>{
    res.send(+req.params.x / +req.params.y);
})
app.get('/mul/:x/:y',(req,res)=>{
   if(isNaN(req.params.x) || isNaN(req.params.y)){
     res.send("Cannot multiply");
   }
   else{
    res.send(req.params.x * req.params.y)
   }
})

app.get('/products',(req,res)=>{
    var data=fs.readFileSync('productsData.txt'); 
    var products=JSON.parse(data.toString());
    res.send(products);
})
app.get('/products/getRange',(req,res)=>{
    var start=+req.query.start;
    var end=+req.query.end;
    var data=fs.readFileSync("productsData.txt");
    var details=JSON.parse(data.toString());
    var filteredProducts = details.products.filter(p => {
        return p.id >= start && p.id <= end;
    });
    res.send(filteredProducts);
})
app.post('/products/getRange',(req,res)=>{
    var start=req.body.start;
    var end=req.body.end;
    console.log(start,end);
    res.send("ok");
})
app.get('/products/:id',(req,res)=>{
    var id=+req.params.id;
    var data=fs.readFileSync("productsData.txt");
    var details=JSON.parse(data.toString());
    var product=details.products.find((p)=> {
          return p.id==id;
    });
    res.send(product)
})

app.listen(3500,()=>{
    console.log("Servor running on 3500");
})
