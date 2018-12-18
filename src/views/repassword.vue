<template>
	<mu-container style='marginTop: 10px' class='repassword'>
		<mu-form ref="form" :model="validateForm" class="mu-demo-form">
			<mu-form-item label="用户名" prop="username" :rules="usernameRules">
				<mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
			</mu-form-item>
			<mu-form-item label="原密码" prop="oldpassword" :rules="oldpasswordRules">
				<mu-text-field type="password" v-model="validateForm.oldpassword" prop="oldpassword"></mu-text-field>
			</mu-form-item>
			<mu-form-item label="新密码" prop="password" :rules="passwordRules">
				<mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
			</mu-form-item>
			<mu-form-item label="重复密码" prop="repassword" :rules="repasswordRules">
				<mu-text-field type="password" v-model="validateForm.repassword" prop="repassword"></mu-text-field>
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
				// reg: /^[a-zA-Z]{0,5}$/,
				usernameRules: [{
						validate: (val) => !!val,
						message: '必须填写用户名'
					},
					{
						validate: (val) => val.length >= 3,
						message: '用户名长度大于3'
					}
				],
				oldpasswordRules: [{
						validate: (val) => !!val,
						message: '必须填写原密码'
					},
					{
						validate: (val) => val.length >= 3 && val.length <= 15,
						message: '密码长度大于3小于15'
					}
				],
				passwordRules: [{
						validate: (val) => !!val,
						message: '必须填写密码'
					},
					{
						validate: (val) => val.length >= 3 && val.length <= 15,
						message: '密码长度大于3小于15'
					},
					{
						validate: (val) => val !== this.validateForm.oldpassword,
						message: '新密码不能与原密码相等'
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
					oldpassword: "",
					repassword: '',
				}
			}
		},
		methods: {
			submit() {
				this.$refs.form.validate().then((result) => {
					if (result) {
						this.$progress.start();
						this.$http({
							method: 'post',
							url: "repassword",
							data: this.validateForm
						}).then(({data})=>{
							if(data.state) {
								this.$alert("密码修改成功,请重新登录",'提示',{
									type:"success"
								})
								this.set("user", '', -1)
								window.localStorage.removeItem('ggbengNackName');
								this.$store.commit("loginOut")
								this.$router.push("/home/welcome")
							}else {
								this.$alert(data.message,'提示',{
									type:"error"
								})
							}
							this.$progress.done()
						}).catch((err)=>{
							console.log(err)
							this.$progress.done()
						})
					}
				});
			},
			clear() {
				this.$refs.form.clear();
				this.validateForm = {
					username: '',
					password: '',
					oldpassword: "",
					repassword: '',
				};
			}
		}
	};
</script>
<style lang='scss'>
	.repassword {
		.mu-demo-form {
			width: 100%;
		}
	}
</style>
