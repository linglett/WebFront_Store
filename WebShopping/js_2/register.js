var register = new Vue({
    el: "#registerButton",
    data: {
        registerUser: {
            userName: "",
            password: "",
            email: "",
            phoneNumber: "",
            code: ""
        }
    },

    methods: {
        registerJudge: function () {
            console.log("运行registerJudge");
            var that = this;
            var userName = document.getElementById("registerUserName");
            var password = document.getElementById("registerPassword");
            var passwordCopy = document.getElementById("registerPasswordCopy");
            var email = document.getElementById("registerEmail");
            var phoneNumber = document.getElementById("registerPhoneNumber");
            var verificationCode = document.getElementById("registerVerificationCode");
            if (verificationCode.data!=="" && that.code === verificationCode.data) {
                if (password.value !== passwordCopy.value) {
                    alert("两次输入的密码不一致");
                    password.value = "";
                    passwordCopy.value = "";
                } else {
                    that.registerUser.userName = userName.value;
                    that.registerUser.email = email.value;
                    that.registerUser.password = password.value;
                    that.registerUser.phoneNumber = phoneNumber.value;
                    axios.get("http://localhost:8080/shitspring_war/user/checkAccount", {
                        params: {
                            userAccount: that.registerUser.phoneNumber
                        }
                    }).then((response) => {
                        console.log(response);
                        if (response.data === 1) {
                            alert("此电话号码已经注册过账号");
                            phoneNumber.value = "";
                            password.value = "";
                            passwordCopy.value = "";
                        } else {
                            console.log("运行账号注册");
                            axios.get("http://localhost:8080/shitspring_war/user/registerJudge", {
                                params: {
                                    phoneNumber: that.registerUser.phoneNumber,
                                    userName: that.registerUser.userName,
                                    password: that.registerUser.password,
                                    email: that.registerUser.email
                                }
                            }).then((response) => {
                                if (response.data === 1) {
                                    console.log("注册成功");
                                    alert("注册成功");
                                    window.location.href = 'Index.html';
                                }
                            }).catch(function (error) {
                                alert("注册失败" + error)

                            })
                        }
                    }).catch(function (error) {
                        alert("账号查重失败" + error);
                    });
                }

            }else{
                console.log("验证码输入错误");
            }

        },
        getCode: function () {
            var that = this;
            var phoneNumber = document.getElementById("registerPhoneNumber");
            that.registerUser.phoneNumber = phoneNumber.value;
            that.registerUser.code = Math.random().toString(36).substring(3, 7);
            if(phoneNumber.data===""){
                console.log("请输入手机号码");
            }else {
                axios.get("http://localhost:8080/shitspring_war/user/registerSSM", {
                    params: {
                        phoneNumber: that.registerUser.phoneNumber,
                        code: that.registerUser.code
                    }
                }).then((response) => {
                    console.log(response);
                    alert("短信已经发送");
                }).catch(function (error) {
                    alert("错误" + error);
                })
            }
        },
    }
});