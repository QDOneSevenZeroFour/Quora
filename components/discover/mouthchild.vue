<template>
	<div>
		<div v-show="bool" class="modal-dialog-bg" style="opacity: 0.5; width: 320px; height: 5756px;" aria-hidden="true"></div>
		<div v-show="bool" class="modal-wrapper">
			<div class="modal-dialog votebar-mobile-dialog centered" tabindex="0" role="dialog" aria-labelledby=":b8" style="">
				<div class="modal-dialog-title">
					<span  class="modal-dialog-title-text" id=":b8" role="heading"></span>
					<span @click="isBool" class="modal-dialog-title-close" role="button" tabindex="0" aria-label="Close"></span></div>
				<div class="modal-dialog-content">
					<div class="zm-votebar votebar-mobile votebar-answer" data-za-module="VoteBar">
						<button @click="isBool" class="up" aria-pressed="false" title="赞同">
<i class="icon vote-arrow"></i>
<span class="count">5949</span>
<span class="label sr-only">赞同</span>
</button>
						<button @click="isBool" class="down" aria-pressed="false" title="反对，不会显示你的姓名">
<i class="icon vote-arrow"></i>
<span class="label sr-only">反对，不会显示你的姓名</span>
</button>
					</div>
					<div class="text zg-clear"><label class="zg-left">赞同</label><label class="zg-right">反对</label></div>
				</div>
				<div class="modal-dialog-buttons" style="display: none;"></div>
			</div>
		</div>
	</div>
</template>

<script>


	export default{
		data:function(){
			return {
				
			}
		},
		computed:{
			bool:function(){
				return this.$store.state.bool;
			}
		},
		methods:{
			isBool:function(){
				this.$store.state.bool = false;
			}
		}
	}
</script>

<style scoped="scoped">
	.modal-wrapper{
		display: -webkit-flex;
		display: -ms-flexbox;
		display: -webkit-box;
		display: flex;
		justify-content: center;
		-ms-flex-pack: center;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-align-items: flex-start;
		-ms-flex-align: start;
		-webkit-box-align: start;
		align-items: center;
	}
</style>