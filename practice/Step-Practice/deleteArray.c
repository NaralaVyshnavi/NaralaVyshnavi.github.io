
void main(){
    int a[]={1,2,3,4,5};
    int key=5;
    int n=5;
    int found=-1;
    for(int i=0;i<n;i++){
        if(key==a[i]){
            found=i;
            break;
        }
    }
    if(found==-1){
        printf("Invalid");
    }
    else{
        for(int i=found;i<n;i++){
            a[i]=a[i+1];
        }
        n--;
         printf("Array after deleting\n");
        for(int i=0;i<n;i++){
           
            printf("%d\n",a[i]);
        }
        
        
    }
}