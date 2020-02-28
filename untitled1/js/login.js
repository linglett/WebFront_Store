var app = new Vue({
    el: '#formlogin',
    data: {
        User: {
            password: "",
            userAccount: ""
        }
    },
    methods: {
        loginJudge: function () {
            console.log("运行loginJude");
            var that = this;
            var userAccount=document.getElementById("login_userAccount");
            var password=document.getElementById("login_password");
            that.User.userAccount=userAccount.value;
            that.User.password=password.value;
            console.log(that.User.userAccount);
            console.log(that.User.password);
            console.log("运行loginJude");
            axios.get("http://localhost:8080/shitspring_war/user/loginJudge", {
                params: {
                    userAccount: that.User.userAccount,
                    password: that.User.password
                }
            }).then((response)=> {
                console.log(response);
                if (response.data===1) {
                    window.location.href = 'index.html';
                } else {
                    alert("账号或密码错误");
                    this.User.password = "";
                }
            }).catch(function (error) {
                alert("错误" + error);
            });
        }
    }
});
