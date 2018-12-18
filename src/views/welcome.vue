<template>
	<div class="welcome">
		<div class="header">
			<p class="title">GGbeng-UI</p>
			<p class='text1'>基于 vue.js 的多端高质量 UI 组件</p>
			<div class="list">
				<a href="https://ggbeng1.github.io/GGbengUI/">指南</a>
				<a href='https://ggbeng1.github.io/GGbengUI/baseComponents/base/doc.html'>安装</a>
				<a href="https://ggbeng1.github.io/GGbengUI/baseComponents/">组件</a>
				<a href="https://ggbeng1.github.io/GGbengUI/baseComponents/base/updata.html">更新日志</a>
				<a href="https://github.com/GGBeng1/GGbengUI">GitHub</a>
			</div>
		</div>
		<div class="content" id='content'>
			<ball></ball>
		</div>
	</div>
</template>

<script>
	import ball from "../components/tools/threeball.vue"
	export default {
		components: {
			ball
		},
		data() {
			return {
					
			}
		},
		methods: {
			resize() {
				let content = document.getElementById('content');
				content.style.height = window.innerHeight - 56 +"px"
			}
		},
		mounted() {
			this.resize()
		}
	}
</script>

<style lang='scss'>
.welcome {
	position: relative;
	overflow: hidden;
	box-sizing: border-box;
	.content {
		width: 100%;
	}
	.header {
		position: absolute;
		width: 100%;
		.title {
			color: #fff;
			text-align: center;
			font-size: 35px;
		}
		.text1 {
			color: #fff;
			font-weight: 400;
			margin-top: 50px;
			font-size: 16px;
			text-align: center;
		}
		.list {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 50px;
			a {
				display: block;
				padding: 10px 10px;
				color: #2d8cf0;
				cursor: pointer;
				transition: color .2s ease;
				position: relative;
				text-decoration: none;
				outline: 0;
				margin-right: 5px;
			}
			a:hover {
				color: #fff;
				&::before {
					opacity: 1;
					transform: translateY(0px);
				}
				&::after {
					opacity: 1;
					transform: translateY(0px);
				}
			}
			a::before {
				position: absolute;
				top: 0;
				-webkit-transform: translateY(-10px);
				transform: translateY(-10px);
				left: 0;
				width: 100%;
				height: 2px;
				background: #fff;
				content: "";
				opacity: 0;
				transition: opacity .3s,-webkit-transform .3s;
				transition: opacity .3s,transform .3s;
				-webkit-transform: translateY(-10px);
				transform: translateY(-10px);
				box-sizing: border-box;
			}
			a::after {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 2px;
				background: #fff;
				content: "";
				opacity: 0;
				transition: opacity .3s,-webkit-transform .3s;
				transition: opacity .3s,transform .3s;
				-webkit-transform: translateY(-10px);
				transform: translateY(10px);
				box-sizing: border-box;
			}
		}
	}
}
</style>