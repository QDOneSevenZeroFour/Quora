<template>
	<div>
			<div  role="navigation" :class="{'is-searching':bool}" class="zu-top" data-za-module="TopNavBar">
				<div class="zg-wrap modal-shifting clearfix" id="zh-top-inner">
				<a href="/" class="zu-top-link-logo" id="zh-top-link-logo" data-za-c="view_home" data-za-a="visit_home" data-za-l="top_navigation_zhihu_logo">知乎</a>
				
				
				
				<button class="zu-top-add-question" id="zu-top-add-question">提问</button>
				
				
				<div role="search" id="zh-top-search" class="zu-top-search">
				<form method="GET" action="/search" id="zh-top-search-form" class="zu-top-search-form">
				
				
				
				<input type="hidden" name="type" value="content">
				<label for="q" class="hide-text">知乎搜索</label><input v-model="txt" @click="isSearch"  type="text" class="zu-top-search-input" id="q" name="q" autocomplete="off" value="" maxlength="100" placeholder="搜索你感兴趣的内容..." role="combobox" aria-autocomplete="list">
				<button type="submit" class="zu-top-search-button"><span  class="hide-text">搜索</span><span  class="sprite-global-icon-magnifier-light"></span></button>
				</form>
		</div>
		</div>
	</div>
		</div>
</template>

<script>
	export default {
		data:function(){
			return {
				bool:false,
				txt:"",
			}
		},
		methods:{
			isSearch:function(){
				this.bool = !this.bool;
			},
		}
	}
</script>

<style>
	
</style>