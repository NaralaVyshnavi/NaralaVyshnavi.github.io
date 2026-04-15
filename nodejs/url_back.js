var url=require('url');
var x=new url.URL('https://api.example.com/users?name=John&age=25&city=Hyderabad');
var obj=x.searchParams;
console.log(obj)