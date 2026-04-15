void main(){
    int a[]={1,2,3,4,5};
    int new;
    int size=5;
    printf("Enter a number");
    scanf("%d",&new);
    a[size]=new;
    size++;
    for(int i=0;i<size;i++){
        printf("%d\n",a[i]);
    }
}