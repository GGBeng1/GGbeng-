import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';
import "typeface-roboto";
// import 'muse-ui-loading/dist/muse-ui-loading.css';
// import Loading from 'muse-ui-loading'
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import NProgress from 'muse-ui-progress';
import axios from "axios";

import thor from 'thor-x'
import 'thor-x/dist/index.css'
// socket
import VueSocketio from 'vue-socket.io';

import Chat from 'vue-beautiful-chat'


// axios.defaults.baseURL= "https://localhost:443/hid/";
axios.defaults.baseURL= "https://www.ggbeng.xyz/hid/";
const config = {
	position: 'top', // 弹出的位置
	close: true
}
const config1 = {
	zIndex: 2000, // progress z-index
	top: 0, // position fixed top
	speed: 300, // progress speed
	color: '#9c27b0', // color
	size: 4, // progress size
	position: "absolute"
}
Vue.config.productionTip = false


Vue.use(new VueSocketio({
    // debug: true,
    connection: 'https://www.ggbeng.xyz'
    // vuex: {
    //     store,
    //     actionPrefix: 'SOCKET_',
    //     mutationPrefix: 'SOCKET_'
    // }
}))
Vue.use(NProgress,config1);
Vue.use(Chat)
Vue.use(thor)
// Vue.use(MuseUI)
// Vue.use(Loading)
Vue.use(Message)
Vue.use(Toast, config)
Vue.prototype.$http = axios
window.bus = new Vue

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
