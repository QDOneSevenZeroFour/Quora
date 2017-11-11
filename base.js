import Vue from "vue"
import VueRouter from "vue-router"
import MuseUI from 'muse-ui'
import Vuex from "vuex"
//import "weui"
//
//import MuseUI from 'muse-ui'
//import 'muse-ui/dist/muse-ui.css'
//Vue.use(MuseUI)

Vue.use(VueRouter);
Vue.use(Vuex);



import xheader from "./components/header.vue";
import xnav from "./components/nav.vue";
import xindex from "./components/index.vue";
import xtopic from "./components/topic.vue";
import xdiscover from "./components/discover.vue";

import './css/index.css'

//var store = new Vuex.Store({
//	state:[{
//		bol:false;
//	}],
//	getters:{
//		getBol:function(state){
//			return state.bol;
//		}
//	}
//})

var router = new VueRouter({
	routes: [{
		path: '/index',
		component:xindex,
	},{
		path: '/topic',
		component:xtopic,
	},{
		path: '/discover',
		component:xdiscover,
	},{
		path:'/',
		redirect:'/index',
	}]
})
new Vue({
	el: "#app",
	data: {
		
	},
	router:router,
	template: `
		<div>
			<xheader></xheader>
			<xnav></xnav>
			<router-view></router-view>
		</div>
	`,
	components: {
		xheader,
		xnav,
		xindex,
		xtopic,
		xdiscover
	}
})