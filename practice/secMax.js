var a=1;
var b=7;
var c=4;
var max;
var secMax;
// if(a>b && a>b){
//     max=a;
// }
// else if(b>a && b>c){
//     max=b;
// }
// else{
//     max=c
// }
// console.log(max)
if(a>b && b>a){
    max=a
    if(b>c){
        secMax=b;
    }
    else{
        secMax=c
    }
}
else if(b>a && b>c){
    max=b;
    if(a>c){
        secMax=a;
    }
    else{
        secMax=c;
    }
}
else{
    max=c;
    if(a>b){
        secMax=a
    }
    else{
        secMax=b
    }
}
console.log(secMax)