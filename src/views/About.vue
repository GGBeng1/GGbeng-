<template>
	<div class="admin">
		<div class="header">
			<p class="title">GGbeng-UI</p>
			<p class='text1'>基于vue.js的多端高质量UI组件</p>
			<p class='text1'>~任何平凡的梦想，经过努力都会发出自己喜欢的光芒~</p>
			<div class="list">
				<a href="https://ggbeng1.github.io/GGbengUI/">指南</a>
				<a href='https://ggbeng1.github.io/GGbengUI/baseComponents/base/doc.html'>安装</a>
				<a href="https://ggbeng1.github.io/GGbengUI/baseComponents/">组件</a>
				<a href="https://ggbeng1.github.io/GGbengUI/baseComponents/base/updata.html">更新日志</a>
				<a href="https://github.com/GGBeng1/GGbengUI">GitHub</a>
			</div>
		</div>
		<div class="content" id='contents'>
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
				linkList: [
					{
						link:'',
						title:'开发文档'
					}
				]
			}
		},
		mounted() {
			let contents = document.getElementById('contents');
			contents.style.height = window.innerHeight +"px";
		}
	}
</script>
<style lang='scss'>
	.admin {
		box-sizing: border-box;
		height: 100%;
		background-color: #13194B;
		position: relative;
		overflow: hidden;
		.header {
			position: absolute;
			width: 100%;
			padding-top: 170px;
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
		.content {
			/* // box-sizing: border-box; */
			padding-top: 400px;
			width: 100%;
		}
	}
</style>