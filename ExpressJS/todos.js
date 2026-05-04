var express=require('express');
var app=express();
var parser=require('body-parser');
app.use(parser.urlencoded({extended:true}))
app.use(parser.json())
app.use(express.static(__dirname+'/public'));
var fs=require("fs");
app.get('/',(req,res)=>{
    res.send("Em chestano emo")
})
app.get('/todos',(req,res)=>{
    var data=fs.readFileSync('todos.txt');
    var todos=JSON.parse(data.toString());
    var ui="<ul>";
    todos.forEach(t=>{
        ui+=`<li>${t}</li>`
    })
    ui+="</ul>"
    res.send(ui);
})
app.post('/todos/addTodo',(req,res)=>{
  var todo=req.body.todo;
  var data=fs.readFileSync('todos.txt');
  var todos=JSON.parse(data.toString());
  todos.push(todo);
  fs.writeFileSync('todos.txt',JSON.stringify(todos))
  res.send("Todo added")
})
app.get('/enquiries',(req,res)=>{
    var data=JSON.parse(fs.readFileSync("enquiries.txt").toString())
    var ui="<table border='1'>";
    data.forEach(e=>{
       ui+=`
       <tr>
            <td>${e.name}</td>
            <td>${e.mobilenumber}</td>
            <td>${e.course}</td>
       </tr>`
    })
    ui+="</table>"
    res.send(ui)
})
app.get('/getEnquiries',(req,res)=>{
      var data=JSON.parse(fs.readFileSync("enquiries.txt").toString())
      res.send(data)
})
app.post('/addEnquiry',(req,res)=>{
    var data=JSON.parse(fs.readFileSync('enquiries.txt').toString());
    data.push(req.body);
    fs.writeFileSync("enquiries.txt",JSON.stringify(data));
    res.send("data added");
})
app.listen(3500,()=>{
    console.log("Server running on 3500 anukunta")
})