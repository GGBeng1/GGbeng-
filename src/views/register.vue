<template>
	<mu-container style='marginTop: 10px' class='register'>
		<mu-form ref="form" :model="validateForm" class="mu-demo-form">
			<mu-form-item label="用户名" prop="username" :rules="usernameRules">
				<mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
			</mu-form-item>
			<mu-form-item label="昵称" prop="nackname" :rules="nacknameRules">
				<mu-text-field v-model="validateForm.nackname" prop="nackname"></mu-text-field>
			</mu-form-item>
			<mu-form-item label="密码" prop="password" :rules="passwordRules">
				<mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
			</mu-form-item>
			<mu-form-item label="重复密码" prop="repassword" :rules="repasswordRules">
				<mu-text-field type="password" v-model="validateForm.repassword" prop="repassword"></mu-text-field>
			</mu-form-item>
			<mu-form-item prop="isAgree" :rules="argeeRules">
				<mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
			</mu-form-item>
			<mu-form-item>
				<mu-button color="primary" @click="submit">提交</mu-button>
				<mu-button @click="clear">重置</mu-button>
			</mu-form-item>
		</mu-form>
	</mu-container>
</template>
<script>
	export default {
		data() {
			return {
				reg: /^[a-zA-Z]{0,5}$/,
				usernameRules: [{
						validate: (val) => !!val,
						message: '必须填写用户名'
					},
					{
						validate: (val) => val.length >= 3,
						message: '用户名长度大于3'
					}
				],
				nacknameRules: [{
						validate: (val) => !!val,
						message: '必须填写昵称'
					},
					{
						validate: (val) => this.reg.test(val),
						message: '用户昵称必须为字母且不超过5位'
					}
				],
				passwordRules: [{
						validate: (val) => !!val,
						message: '必须填写密码'
					},
					{
						validate: (val) => val.length >= 3 && val.length <= 15,
						message: '密码长度大于3小于15'
					}
				],
				repasswordRules: [{
						validate: (val) => !!val,
						message: '必须填写重复密码'
					},
					{
						validate: (val) => this.validateForm.password == val,
						message: '两次密码输入不一致'
					}
				],
				argeeRules: [{
					validate: (val) => !!val,
					message: '必须同意用户协议'
				}],
				validateForm: {
					username: '',
					password: '',
					nackname: "",
					repassword: '',
					isAgree: false
				}
			}
		},
		methods: {
			submit() {
				this.$refs.form.validate().then((result) => {
					if (result) {
						this.$progress.start();
						this.$http({
							method: "post",
							url: "regist",
							data: this.validateForm
						}).then(({data})=>{
							if(data.state) {
								this.$toast.success(data.message);
								this.$router.push("/home/login");
							}else {
								this.$toast.warning(data.message);
							}
							this.$progress.done();
						}).catch((err) =>{
							this.$progress.done();
							this.$toast.err(err.code);
						})
					}
				});
			},
			clear() {
				this.$refs.form.clear();
				this.validateForm = {
					username: '',
					password: '',
					nackname: "",
					repassword: '',
					isAgree: false
				};
			}
		}
	};
</script>
<style lang='scss'>
	.register {
		.mu-demo-form {
			width: 100%;
		}
	}
</style>
