<template>
	<div>
		<div class="tab-panel" style="display: block;">
			<div data-type="monthly" data-zop-feedlist="">
				<div v-for="a in arr" class="explore-feed feed-item" data-offset="5" data-za-module="AnswerItem" data-za-index="">
					<h2><a class="question_link" href="/question/21746164/answer/244376879" target="_blank" data-id="879434" data-za-element-name="Title"> {{a.title}}</a></h2>
					<div tabindex="-1" class="zm-item-answer " itemscope="" itemtype="http://schema.org/Answer" data-aid="74502648" data-atoken="244376879" data-collapsed="0" data-created="1507981765" data-deleted="0" data-isowner="0" data-helpful="1" data-copyable="1" data-zop="">
						<link itemprop="url" href="/question/21746164/answer/244376879" />
						<meta itemprop="answer-id" content="74502648" />
						<meta itemprop="answer-url-token" content="244376879" />
						<a class="zg-anchor-hidden" name="answer-74502648"></a>
						<div class="answer-head">
							<div class="zm-item-answer-author-info">
								<span class="summary-wrapper"> <span class="author-link-line"> <a class="author-link" data-hovercard="p$t$meng-xu-50" target="_blank" href="/people/meng-xu-50">{{a.name}}</a></span> </span>
							</div>
							<div class="zm-item-vote-info" data-votecount="5949" data-za-module="VoteInfo">
								<span class="voters text"><a href="#" class="more text"><span class="js-voteCount">5949</span>&nbsp;人赞同</a>
								</span>
							</div>
						</div>
						<div class="zm-item-rich-text expandable js-collapse-body" data-resourceid="879434" data-action="/answer/content" data-author-name="Meng Xu" data-entry-url="/question/21746164/answer/244376879">
							<div v-show="!a.bool">
								<p>在巴塞罗那机场和异地恋男朋友在过边境时，</p>
								<p>男朋友陪我一起排队，但只有我一个人过海关。（男朋友同时搭乘不同航班，不需要出欧盟区域）</p>
								<p>排队时，我们不停地互相叮嘱照顾好自己，并都哭得梨花带雨。</p>
								<p>等到我终于走上过境处，我男朋友只能等在原地，向我挥手说再见。</p>
								<p>海关工作人员一边检查我的护照和签证，一边问我</p>
								<p> “Is he taking another flight soon?”（他是不是马上要搭另一班飞机）她看着还在我身后目送我的男朋友</p>
								<p>“yes, he is. An hour later.”（是的，一小时之后）我边抽鼻子，边带着哭腔回答</p>
								<p>“Ask him to come.”(让他过来）</p>
								<p>男朋友和我都不知道要发生什么，带着懵逼的表情和还没擦掉的泪水看着这位海关。</p>
								<p>她敲完过境章，将护照递给我，盯着我男朋友说：</p>
								<p>“I will stay here for two hours, so you come back in time. And knock the door on this side. I will let you pass."（我会在这里再呆两小时，你一定要及时回来。敲敲这个边门，我就让你过去。）</p>
								<p>一下子我们都不知道说什么，只知道不断对她地说“Thank you, thank you"。</p>
								<p>她也只是对我们微笑了一下，就对着我们身后的队伍喊 “Next” 。</p>
								<p><br></p>
								<p>对于一年只能见几次的我们，哪怕再多 1 分钟的相聚都是奢侈。所以我们非常感激这位海关工作人员。</p>
								<p></p>
								<p></p>
							</div>
							<div class="zh-summary summary clearfix" v-show="a.bool">
								{{a.content}}
								<a @click="a.bool = !a.bool" class="toggle-expand">显示全部</a>
							</div>
							<p :style="{display:a.bool?'none':'block'}" class="visible-expanded">
								<a itemprop="url" class="answer-date-link meta-item" data-tooltip="s$t$发布于 2017-10-14" target="_blank" href="/question/21746164/answer/244376879">编辑于 2017-10-14</a>
							</p>
						</div>
						<div class="zm-item-meta answer-actions clearfix js-contentActions">
							<div class="zm-meta-panel">
								<a @click="sendBol"  class="meta-item votenum-mobile zm-item-vote-count  js-openVoteDialog"> <span data-bind-votecount="">5949</span><i class="arrow zg-icon"></i> </a>
								<div class="zm-votebar" data-za-module="VoteBar">
									<button class="up" aria-pressed="false" title="赞同"> <i class="icon vote-arrow"></i> <span class="count">5949</span> <span class="label sr-only">赞同</span> </button>
									<button class="down" aria-pressed="false" title="反对，不会显示你的姓名"> <i class="icon vote-arrow"></i> <span class="label sr-only">反对，不会显示你的姓名</span> </button>
								</div>
								<a data-follow="q:link" class="follow-link zg-follow meta-item" href="javascript:;" id="sfb-879434"><i class="z-icon-follow"></i>关注问题</a>
								<a href="#" name="addcomment" class="meta-item toggle-comment js-toggleCommentBox"> <i class="z-icon-comment"></i>205 条评论</a>
								<a href="#" class="meta-item zu-autohide js-thank" data-thanked="false"><i class="z-icon-thank"></i>感谢</a>
								<span class="phone-actions"> <a href="#" class="menubutton more-actions meta-item zu-autohide goog-inline-block goog-menu-button" role="button" aria-expanded="false" tabindex="0" aria-haspopup="true" style="user-select: none;">
				        <div class="goog-inline-block goog-menu-button-outer-box">
				         <div class="goog-inline-block goog-menu-button-inner-box">
				          <div class="goog-inline-block goog-menu-button-caption">
				           <i class="zg-icon zg-icon-ellipsis-mobi"></i>
				           <span class="hide-text">更多</span>
							</div>
							<div class="goog-inline-block goog-menu-button-dropdown">
								&nbsp;
							</div>
						</div>
					</div>
					</a>
					<div class="menu goog-menu goog-menu-vertical zh-answer-more-actions" style="display: none; user-select: none;" role="menu" aria-haspopup="true">
						<div class="goog-menuitem js-share" role="menuitem" id=":2x" style="user-select: none;">
							<div class="goog-menuitem-content" style="user-select: none;">
								分享
							</div>
						</div>
						<div class="goog-menuseparator" aria-disabled="true" role="separator" id=":2y" style="user-select: none;"></div>
						<div class="goog-menuitem js-collect" role="menuitem" id=":2z" style="user-select: none;">
							<div class="goog-menuitem-content" style="user-select: none;">
								收藏
							</div>
						</div>
						<div class="goog-menuseparator" aria-disabled="true" role="separator" id=":30" style="user-select: none;"></div>
						<div class="goog-menuitem js-noHelp" role="menuitem" id=":31" style="user-select: none;">
							<div class="goog-menuitem-content" style="user-select: none;">
								没有帮助
							</div>
						</div>
						<div class="goog-menuseparator" aria-disabled="true" role="separator" id=":32" style="user-select: none;"></div>
						<div class="goog-menuitem js-report" role="menuitem" id=":33" style="user-select: none;">
							<div class="goog-menuitem-content" style="user-select: none;">
								举报
							</div>
						</div>
					</div>
					</span>
					<meta name="copyrightStatus" content="1" />
					<meta name="disableCopyAvatar" content="" />
					<span class="zg-bull">•</span>
					<a href="/terms#sec-licence-1" target="_blank" class="meta-item copyright"> 作者保留权利 </a>
					<button :style="{display:a.bool?'none':'block'}" @click="a.bool = !a.bool" class="meta-item item-collapse js-collapse"> <i class="z-icon-fold"></i>收起 </button>
				</div>
			</div>
		</div>
	</div>
	<a @click="loadMore()" v-show="bool" :class="{loading:!bool}" aria-role="button" class="zg-btn-white zu-button-more">更多</a>
	<a aria-role="button" v-show="!bool" :class="{loading:bool}" class="zg-btn-white zu-button-more loading"><i class="spinner-gray"></i> 加载中</a>
	</div>
</div>
	<xmouthchild></xmouthchild>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Vuex from 'vuex'
	import xmouthchild from './mouthchild.vue'

Vue.use(Vuex)
	var store = new Vuex.Store({
		state:{
			bool:false,
		},
		getters:{
			getBol:function(state){
				return state.bool;
			}
		}
	})
	export default {
		data: function() {
			return {
				arr: [],
				bool: true,
				bol:true,
			}
		},
		store:store,
		methods: {
			loadMore: function() {
				this.bool = false;
				var self = this;
				$.ajax({
					url: "http://localhost/json/today.json",
					success: function(data) {
						setTimeout(function() {
							self.bool = true;
							self.arr = self.arr.concat(data.tomouth);
						}, 2000);

					}
				})
			},
			sendBol:function(){
				this.$store.state.bool = this.bol;
				console.log(this.$store.state.bool);
			}
			
		},
		components:{
			xmouthchild,
		},
		mounted: function() {
			this.loadMore();
		}
	}
</script>

<style >
	
</style>