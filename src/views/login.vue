<template>
	<mu-container class='login'>
		<mu-form ref="form" :model="validateForm" class="mu-demo-form">
			<mu-form-item label="用户名" prop="username" :rules="usernameRules">
				<mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
			</mu-form-item>
			<mu-form-item label="密码" prop="password" :rules="passwordRules">
				<mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
			</mu-form-item>
			<mu-form-item prop="isAgree">
				<mu-checkbox label="保持7天登录" v-model="isAllLogin"></mu-checkbox>
			</mu-form-item>
			<mu-form-item>
				<mu-button color="primary" @click="submit">登录</mu-button>
				<mu-button @click="register" >注册</mu-button>
			</mu-form-item>
		</mu-form>
	</mu-container>
</template>
<script>
	export default {
		data() {
			return {
				usernameRules: [{
						validate: (val) => !!val,
						message: '必须填写用户名'
					},
					{
						validate: (val) => val.length >= 3,
						message: '用户名长度大于3'
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
				validateForm: {
					username: '',
					password: ''
				},
				isAllLogin: false,
				loading: true
			}
		},
		methods: {
			submit() {
				// this.loading = true;
				this.$refs.form.validate().then((result) => {
					if (result) {
						this.$progress.start();
						this.$http({
							method: 'post',
							url: "login",
							data: this.validateForm
						}).then(({
							data
						}) => {
							if (data.state) {
								if (this.isAllLogin) {
									this.set("user", data.id, 7)
								} else {
									this.set("user", data.id, 1)
								}
								console.log(data)
								this.$toast.success(data.message);
								window.localStorage.setItem("ggbengNackName", data.nackname)
								this.$store.commit("changeNackName", data.nackname)
								this.$router.push("/home/welcome")
							}else {
								this.$toast.warning(data.message);
							}
							this.$progress.done();
						}).catch((err) => {
							this.$progress.done();
							this.$toast.error(err.code);
						})
					}
				});
			},
			register() {
				this.$router.push("/home/register")
			},
			set(key, val, time) { //设置cookie方法
				var date = new Date(); //获取当前时间
				var expiresDays = time; //将date设置为n天以后的时间
				date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
				document.cookie = key + "=" + val + ";expires=" + date.toGMTString(); //设置cookie
			}
		}
	};
</script>
<style lang='scss'>
	.login {
		position: relative;
		margin-top: 10px;

		.mu-demo-form {
			width: 100%;

		}
	}
</style>
