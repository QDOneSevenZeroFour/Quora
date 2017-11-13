<template>
	<div>
	<div id="zg-top-nav" class="zu-top-nav">
		<ul class="zu-top-nav-ul zg-clear">

			<li @click="isChange(arr[0])" :class="{'current':tip ==arr[0]}" class="zu-top-nav-li" id="zh-top-nav-home">
				<a class="zu-top-nav-link" href="#/show/index" id="zh-top-link-home" data-za-c="view_home" data-za-a="visit_home" data-za-l="top_navigation_home">首页</a>
			</li>

			<li @click="isChange(arr[1])" :class="{'current':tip == arr[1]}" class="top-nav-topic-selector zu-top-nav-li " id="zh-top-nav-topic">
				<a class="zu-top-nav-link" href="#/show/topic" id="top-nav-dd-topic">话题</a>
			</li>

			<li @click="isChange(arr[2])" :class="{'current':tip == arr[2]}" class="zu-top-nav-li " id="zh-top-nav-explore">
				<a class="zu-top-nav-link" href="#/show/discover">发现</a>
			</li>

			<li @click="isOpen()" class="top-nav-noti zu-top-nav-li ">
				<a :class="{'open':bool}" class="zu-top-nav-link" id="zh-top-nav-count-wrap" role="button"><span class="mobi-arrow"></span>消息<span id="zh-top-nav-count" class="zu-top-nav-count zg-noti-number" style="display: none;">0</span></a>
			</li>

			<li @click="showBol()" class="zu-top-nav-li">
				<a id="js-top-nav-link-profile" class="zu-top-nav-link">
					我<span class="mobi-arrow"></span>
				</a>
				<span id="zh-top-nav-pm-count" class="zu-top-nav-pm-count zg-noti-number" style="visibility:hidden" data-count="0">

</span>
			</li>

		</ul>
		<div :class="{'open':bool}" class="zu-top-nav-live zu-noti7-popup zg-r5px no-hovercard" id="zh-top-nav-live-new" role="popup" :style="{'display':bool?'block':'none'}" tabindex="0">
			<div class="zu-top-nav-live-inner zg-r5px">
				<div class="zu-top-live-icon">&nbsp;</div>
				<div class="zu-home-noti-inner" id="zh-top-nav-live-new-inner">
					<div class="zm-noti7-popup-tab-container clearfix" tabindex="0" role="tablist">
						<button @click="showStyle(a.id)" v-for="a in arr1" :class="{'current':ids==a.id}" class="zm-noti7-popup-tab-item message" role="tab">
	<span  class="icon" >{{a.title}}</span>
	</button>
					</div>
				</div>
				<div class="zm-noti7-frame-border top"></div>
				<div class="zm-noti7-frame">
					<div v-for="a in arr1" :class="a.clas" class="zm-noti7-content" v-show="ids==a.id">
						<div class="zm-noti7-content-inner">
							<div class="zm-noti7-content-body">
								<div class="zm-noti7-popup-empty">{{a.mes}}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="zm-noti7-frame-border bottom"></div>
				<div class="zm-noti7-popup-footer">
					<a href="/notifications" class="zm-noti7-popup-footer-all zg-right">查看全部 »</a>
					<a href="/settings/notification" class="zm-noti7-popup-footer-set" title="通知设置"><i class="zg-icon zg-icon-settings"></i></a>
				</div>
			</div>
		</div>
		<!--=========================================================-->
		<div id="mobile-top-nav-profile-popup" class="mobile-top-nav-popup mobile-top-nav-popup-profile" :style="{display:bol?'block':'none'}">
			<ul class="top-nav-dropdown" id="top-nav-profile-dropdown">
				<li>
					<a href="/people/shan-nian-13">
						<i class="zg-icon zg-icon-dd-home"></i>我的主页
					</a>
				</li>

				<li>
					<a href="/inbox">
						<i class="zg-icon zg-icon-dd-pm"></i>私信
						<span id="zh-top-nav-pm-count" class="zu-top-nav-pm-count zg-noti-number" style="visibility:hidden" data-count="0">

</span>
					</a>
				</li>
				<li>
					<a href="/settings">
						<i class="zg-icon zg-icon-dd-settings"></i>设置
					</a>
				</li>
				<li>
					<a href="/logout">
						<i class="zg-icon zg-icon-dd-logout"></i>退出
					</a>
				</li>
			</ul>

			<button @click="isFalse()" class="slide-up"></button>
		</div>
	</div>
	<router-view></router-view>
</div>
</template>

<script>
	export default {
		data: function() {
			return {
				arr1: [{
					id: 1,
					clas: "message",
					title: "消息",
					mes: "暂无新消息"
				}, {
					id: 2,
					clas: "user",
					title: "用户",
					mes: "有人关注你时会显示在这里"
				}, {
					id: 3,
					clas: "thanks",
					title: "感谢",
					mes: "你的答案收到赞同、感谢时会显示在这里"
				}],
				arr: [{
					id: 1,
				}, {
					id: 2,
				}, {
					id: 3
				}],
				tip: 1,
				ids: 1,
				bool: false,
				bol:false,
			}
		},
		methods: {
			isChange: function(id) {
				this.tip = id;
			},
			isOpen: function() {
				if(this.bol == false){
					this.bool = !this.bool;
				}
			},
			showStyle: function(id) {
				this.ids = id;
			},
			showBol:function(){
				this.bol = !this.bol;
				if(this.bol == true){
					this.bool = false;
				}
			},
			isFalse:function(){
				this.bol = false;
			}
		},
	}
</script>

<style>

</style>