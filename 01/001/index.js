var app=new Vue({
    el:'#app',
    data:{
            list:[
                {
                    id:1,
                    name:'iphone7',
                    price:6188,
                    count:1
                },
                {
                    id:2,
                    name:'ipad pro',
                    price:5888,
                    count:1
                },
                {
                    id:3,
                    name:'Macbook pro',
                    price:21488,
                    count:1
                }

            ],

    },
 computed:{
    totalPrice:function(){
        var total=0;
        for(var i=0;i<this.list.length;i++){
            var item=this.list[i];
            total+=item.price*item.count;
        }
        return total;
    }
 },
    methods: {
        // 减
        handleReducer:function(index){
            if(this.list[index].count==1) return;
            this.list[index].count--;
        },
        // 加
        handleAdd:function(index){
            this.list[index].count++;
        },
        // 移
        handleRemove:function(index){
            this.list.splice(index,1);
        }
    }
})