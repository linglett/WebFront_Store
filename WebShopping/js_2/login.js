var app = new Vue({
    el: '#formlogin',
    data: {
        loginUser: {
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
            that.loginUser.userAccount=userAccount.value;
            that.loginUser.password=password.value;
            console.log(that.loginUser.userAccount);
            console.log(that.loginUser.password);
            console.log("运行loginJude");
            axios.get("http://localhost:8080/shitspring_war/user/loginJudge", {
                params: {
                    userAccount: that.loginUser.userAccount,
                    password: that.loginUser.password
                }
            }).then((response)=> {
                if (response.data===1) {
                    window.location.href = 'Index.html';
                } else {
                    alert("账号或密码错误");
                    this.loginUser.password = "";
                }
            }).catch(function (error) {
                alert("错误" + error);
            });
        }
    }
});
