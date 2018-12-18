<template>
	<div class="home">
		<div class="header">
			<h-header></h-header>
		</div>
		<div class="content">
			<leftbar></leftbar>
		</div>
		<div class="main">
			<!-- <transition name="slide-fade"> -->
			<router-view></router-view>
			<!-- </transition> -->
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import hHeader from "@/components/home/header";
	import leftbar from "@/components/home/leftbar";
	export default {
		name: "home",
		components: {
			hHeader,
			leftbar
		},
		data() {
			return {
				transitionName: "fade"
			}
		},
		methods: {
			getLocation() {
			}
		},
		mounted() {
			this.getLocation()
			// this.$progress.start();
		}
	};
</script>
<style lang='scss'>
	.home {
		box-sizing: border-box;

		.slide-fade-enter-active {
			transition: all .3s ease;
		}

		.slide-fade-leave-active {
			transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}

		.slide-fade-enter,
		.slide-fade-leave-to

		/* .slide-fade-leave-active for below version 2.1.8 */
			{
			transform: translateX(10px);
			opacity: 0;
		}

		.main {
			/* padding-top: 10px; */
		}
	}
</style>
