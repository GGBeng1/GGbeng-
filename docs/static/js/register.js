(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register"],{7803:function(e,a,r){"use strict";r.r(a);var t=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("mu-container",{staticClass:"register",staticStyle:{marginTop:"10px"}},[r("mu-form",{ref:"form",staticClass:"mu-demo-form",attrs:{model:e.validateForm}},[r("mu-form-item",{attrs:{label:"用户名",prop:"username",rules:e.usernameRules}},[r("mu-text-field",{attrs:{prop:"username"},model:{value:e.validateForm.username,callback:function(a){e.$set(e.validateForm,"username",a)},expression:"validateForm.username"}})],1),r("mu-form-item",{attrs:{label:"昵称",prop:"nackname",rules:e.nacknameRules}},[r("mu-text-field",{attrs:{prop:"nackname"},model:{value:e.validateForm.nackname,callback:function(a){e.$set(e.validateForm,"nackname",a)},expression:"validateForm.nackname"}})],1),r("mu-form-item",{attrs:{label:"密码",prop:"password",rules:e.passwordRules}},[r("mu-text-field",{attrs:{type:"password",prop:"password"},model:{value:e.validateForm.password,callback:function(a){e.$set(e.validateForm,"password",a)},expression:"validateForm.password"}})],1),r("mu-form-item",{attrs:{label:"重复密码",prop:"repassword",rules:e.repasswordRules}},[r("mu-text-field",{attrs:{type:"password",prop:"repassword"},model:{value:e.validateForm.repassword,callback:function(a){e.$set(e.validateForm,"repassword",a)},expression:"validateForm.repassword"}})],1),r("mu-form-item",{attrs:{prop:"isAgree",rules:e.argeeRules}},[r("mu-checkbox",{attrs:{label:"同意用户协议"},model:{value:e.validateForm.isAgree,callback:function(a){e.$set(e.validateForm,"isAgree",a)},expression:"validateForm.isAgree"}})],1),r("mu-form-item",[r("mu-button",{attrs:{color:"primary"},on:{click:e.submit}},[e._v("提交")]),r("mu-button",{on:{click:e.clear}},[e._v("重置")])],1)],1)],1)},s=[],o={data:function(){var e=this;return{reg:/^[a-zA-Z]{0,5}$/,usernameRules:[{validate:function(e){return!!e},message:"必须填写用户名"},{validate:function(e){return e.length>=3},message:"用户名长度大于3"}],nacknameRules:[{validate:function(e){return!!e},message:"必须填写昵称"},{validate:function(a){return e.reg.test(a)},message:"用户昵称必须为字母且不超过5位"}],passwordRules:[{validate:function(e){return!!e},message:"必须填写密码"},{validate:function(e){return e.length>=3&&e.length<=15},message:"密码长度大于3小于15"}],repasswordRules:[{validate:function(e){return!!e},message:"必须填写重复密码"},{validate:function(a){return e.validateForm.password==a},message:"两次密码输入不一致"}],argeeRules:[{validate:function(e){return!!e},message:"必须同意用户协议"}],validateForm:{username:"",password:"",nackname:"",repassword:"",isAgree:!1}}},methods:{submit:function(){var e=this;this.$refs.form.validate().then(function(a){a&&(e.$progress.start(),e.$http({method:"post",url:"regist",data:e.validateForm}).then(function(a){var r=a.data;r.state?(e.$toast.success(r.message),e.$router.push("/home/login")):e.$toast.warning(r.message),e.$progress.done()}).catch(function(a){e.$progress.done(),e.$toast.err(a.code)}))})},clear:function(){this.$refs.form.clear(),this.validateForm={username:"",password:"",nackname:"",repassword:"",isAgree:!1}}}},n=o,l=(r("8f89"),r("2877")),i=Object(l["a"])(n,t,s,!1,null,null,null);i.options.__file="register.vue";a["default"]=i.exports},"8f89":function(e,a,r){"use strict";var t=r("9e4f"),s=r.n(t);s.a},"9e4f":function(e,a,r){}}]);