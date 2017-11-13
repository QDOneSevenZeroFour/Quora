<template>
	<div>
		<div id="zh-recommend-title" class="page-title">
			<i class="zg-icon zg-icon-feedlist"></i>
			<span>编辑推荐</span>
			<a href="/explore/recommendations" class="zg-link-gray zg-right" data-za-c="explore" data-za-a="visit_explore_recommendations" data-za-l="editor_recommendations_more"><span>更多推荐 »</span></a>
		</div>
		<div id="zh-recommend-list">

			<div class="top-recommend-feed feed-item">
				<h2><a class="question_link" href="/question/67817600/answer/257147014" target="_blank" data-id="19355497" data-za-element-name="Title">
				如何评价携程亲子工作室（亲子园）虐童事件？
				</a></h2>
				<div class="avatar">
					<a title="苏德中" data-hovercard="p$t$su-de-zhong-84" class="zm-item-link-avatar" target="_blank" href="/people/su-de-zhong-84">
						<img src="../../image/3_m.jpg" class="zm-item-img-avatar">
					</a>
				</div>

				<div class="feed-main">
					<div class="zm-item-answer-author-info">

						<span class="summary-wrapper">
<span class="author-link-line">

<a class="author-link" data-hovercard="p$t$su-de-zhong-84" target="_blank" href="/people/su-de-zhong-84">苏德中</a><span class="icon icon-badge-id-an icon-badge" data-tooltip="s$b$优秀回答者 · 已认证的个人"></span></span><span class="badge-summary"><a href="/people/su-de-zhong-84#hilightbadge" target="_blank">心理学、儿童教育话题优秀回答者</a></span>

						<span title="CEO, YoKID优儿学堂" class="bio">
CEO, YoKID优儿学堂
</span>
						</span>
					</div>
					<div class="zm-item-rich-text" data-resourceid="19355497" data-action="/answer/content">
						<div class="zh-summary summary clearfix">
							<img data-rawheight="550" src="../../image/4_m.jpg" data-rawwidth="1152" class="origin_image inline-img zh-lightbox-thumb" data-original="https://pic3.zhimg.com/v2-c921b3b547434dd85528a9efa0b7c1ca_r.jpg"> 作为一个普通人，相信任何人了解到携程虐童事件莫不充满了愤怒、悲痛与失望。作为心理学专业，我努力尝试不透过文字发泄这些情绪，内心渴望可以不同角度去为已发生的作出一些事后补救，更值得思考的，是我们可以怎样预防，甚至令同类事件不再发生。 我思考…
						</div>
					</div>
				</div>
			</div>

			<div v-for="a in arr" class="recommend-feed feed-item">

				<span class="zg-right zg-gray-normal feed-meta">{{a.name}}</span>

				<h2><a class="post-link" target="_blank" href="https://zhuanlan.zhihu.com/p/30730362" data-za-element-name="Title">{{a.title}}</a></h2>
			</div>

		</div>
		</div>
</template>

<script>
	import $ from "jquery"
	export default {
		data() {
			return {
				arr: [],
			}
		},
		methods: {
			loadData: function() {
				var self = this;
				$.ajax({
					url: "http://localhost/quaro/json/recommend.json",
					success: function(data) {
						console.log(data);
						self.arr = self.arr.concat(data.recom);
					}
				})
			}

		},
		mounted: function() {
			this.loadData();
		}
	}
</script>

<style>

</style>