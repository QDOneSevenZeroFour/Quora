import Vue from "vue"
import VueRouter from "vue-router"
import MuseUI from 'muse-ui'
import Vuex from "vuex"
import $ from "jquery"
window.$ = $
//import "weui"
//
//import MuseUI from 'muse-ui'
//import 'muse-ui/dist/muse-ui.css'
//Vue.use(MuseUI)

Vue.use(VueRouter);
Vue.use(Vuex);

//import "./index.js";




import xdetail from "./components/detail.vue";
import xshow from "./components/show.vue";
import xindex from "./components/index.vue";
import xtopic from "./components/topic.vue";
import xdiscover from "./components/discover.vue";


import './css/index.css';


import xtoday from "./components/discover/today.vue";
import xtomouth from "./components/discover/tomouth.vue";
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
		path:'/show',
		component:xshow,
		children:[{
			path:'index',
			component:xindex,
		},{
		path: 'topic',
		component:xtopic,
	},{
		path: 'discover',
		component:xdiscover,
		children:[{
			path:'today',
			component:xtoday,
		},{
			path:'tomouth',
			component:xtomouth,
		}]
	}]},{
		path:'/',
		redirect:'/show/index',
	},{
		path:'/detail',
		component:xdetail
	}]
})
new Vue({
	el: "#app",
	data: {
		
	},
	router:router,
	template: `
		<div>
			
			<router-view></router-view>
		</div>
	`,
	components: {
		xshow,
		xindex,
		xtopic,
		xdiscover,
		xdetail

	}
})