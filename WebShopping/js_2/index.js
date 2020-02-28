new Vue({
    el:"#threeClassify",
    data:{
        allClass:[]
    },
    methods:{
        listMouseOver:function(a,index){
            $(".fj").eq(index).addClass("nuw");
            $(".zj").eq(index).show();
        },

        listMouseLeave:function (a,index) {
            $(".fj").eq(index).removeClass("nuw");
            $(".zj").eq(index).hide();
        }
    },
    created(){
        axios.get("http://localhost:8080/shitspring_war/classify/getClassify",{
            params:{
                iniClassify:"start"
            }
        }).then((response)=>{
            console.log(response);
            if(response.data!==null){
                this.allClass=response.data;
                console.log(this.allClass);
            }
        }).catch(function (error) {
            alert("错误" + error);
        })
    },

});