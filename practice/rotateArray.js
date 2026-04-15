var arr=[1,2,3,4,5,6,7];
for(let i=0;i<3;i++){
    var x=arr.shift();
    arr.push(x)
}
console.log(arr)