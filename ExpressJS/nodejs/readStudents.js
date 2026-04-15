var fs=require('fs');
var data=fs.readFileSync('students.txt');
var students=JSON.parse(data.toString());
var females=students.filter(s=>{
    if(s.gender=="Female"){
        return true
    }
})
fs.writeFileSync(__dirname+'/females.txt',JSON.stringify(females));