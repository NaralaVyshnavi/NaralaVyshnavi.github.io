
void main(){
    
int a[]={1,2,3,4,5};
int sum=0;
for(int i=0;i<sizeof(a)/sizeof(a[0]);i++){
    sum=sum+a[i];
}
printf("Sum %d",sum);
}