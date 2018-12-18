<template>
	<div class='hheader'>
		<mu-appbar style="width: 100%;" color="primary">
			<mu-button icon slot="left" @click='showLeftBar'>
				<mu-icon value="menu"></mu-icon>
			</mu-button>
			GGbeng

			<mu-button flat slot="right" @click='login' v-if='showLogin'>LOGIN</mu-button>
			<!-- <mu-button flat slot="right" @click='mySpace' v-if='!showLogin'>{{name}}</mu-button>
			 -->
			<mu-menu cover v-if='!showLogin' :open.sync="open">
				<mu-button color="primary">{{name}}</mu-button>
				<mu-list slot="content">
					<mu-list-item button @click='mySpace'>
						<mu-list-item-title>我的空间</mu-list-item-title>
					</mu-list-item>
					<mu-list-item button @click='newPassword'>
						<mu-list-item-title>修改密码</mu-list-item-title>
					</mu-list-item>
					<mu-list-item button @click.native='loginOut'>
						<mu-list-item-title>退出登录</mu-list-item-title>
					</mu-list-item>
				</mu-list>
			</mu-menu>
		</mu-appbar>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'hHeader',
		data() {
			return {
				open: false
			}
		},
		computed: {
			...mapState({
				name: state => state.nackName,
				showLogin: state => state.showLogin
			})
		},
		methods: {
			showLeftBar() {
				window.bus.$emit("open")
			},
			login() {
				this.$router.push("/home/login")
			},
			mySpace() {
				this.open = false;
				// this.$router.push('/home/myspace')
				this.$alert("近期开发","提示")
			},
			newPassword() {
				this.open = false;
				this.$router.push('/home/repassword')
			},
			loginOut() {
				this.$confirm('是否退出登录？', '提示', {
					type: "warning"
				}).then(({
					result
				}) => {
					if (result) {
						this.open = false;
						this.set("user", '', -1)
						window.localStorage.removeItem('ggbengNackName');
						this.$store.commit("loginOut")
						this.$router.push("/home/welcome")
					} else {
						this.open = false;
					}
				})
			},
			set(key, val, time) { //设置cookie方法
				var date = new Date(); //获取当前时间
				var expiresDays = time; //将date设置为n天以后的时间
				date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
				document.cookie = key + "=" + val + ";expires=" + date.toGMTString(); //设置cookie
			}
		},
		mounted() {
			let nackname = window.localStorage.getItem("ggbengNackName");
			if (nackname) {
				this.$store.commit("changeNackName", nackname)
			}

		},
		beforeCreate() {
			// console.log(this.options)
		},
		watch: {}
	}
</script>

<style lang='scss'>
	.hheader {
		position: relative;

		.mu-menu {
			/* margin-left: 100px; */
			position: absolute;
			right: 10px;
			top: 50%;
			transform: translateY(-30%);
		}

	}
</style>
