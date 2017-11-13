<template>
<div>
	<div class="zg-wrap zu-main clearfix " role="main">
		<div class="zu-main-content">
			<div class="zu-main-content-inner">
			
				<div id="zh-recommend">
					<xrecommed></xrecommed>
				</div>
				<div class="explore-tab" id="js-explore-tab">
					<a class="zg-anchor-hidden" name="daily-hot"></a>
					<a class="zg-anchor-hidden" name="monthly-hot"></a>
					<ul class="tab-navs clearfix">
						<li @click="isBool()" class="tab-nav" :class="{active:bool}">
							<a class="anchor" href="#/show/discover/today" data-za-c="explore" data-za-a="visit_explore_daily_trendings" data-za-l="explore_daily_trendings">今日最热</a>
						</li>
						<li @click="isBool1()" class="tab-nav" :class="{active:bol}">
							<a class="anchor" href="#/show/discover/tomouth" data-za-c="explore" data-za-a="visit_explore_monthly_trendings" data-za-l="explore_monthly_trendings">本月最热</a>
						</li>
					</ul>
				<router-view></router-view>
			</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import xrecommed from "./discover/recommed.vue";
	export default{
		data(){
			return {
				bool : true,
				bol:false,
			}
		},
		methods:{
			isBool:function(){
				this.bool = true;
				this.bol = false;
			},
			isBool1:function(){
				this.bool = false;
				this.bol = true;
			}
		},
		components:{
			xrecommed,
		}
	}
</script>

<style>

</style>