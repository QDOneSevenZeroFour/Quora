<!--A孟玉 17:44:08-->
<template>
	<div>
		<div class="zu-main-content">
			<div class="zu-main-content-inner">

				<div class="topic-feed-title">
					<i class="zg-icon zg-icon-feedlist"></i>
					<span>已关注的话题动态</span>
					<a target="_blank" href="https://www.zhihu.com/people/meng-yu-han-45-14/topics" class="zg-link-gray zg-right" style="display:none;">
						共关注 <span class="follow-topics-count">0</span> 个话题
					</a>
				</div>

				<div class="no-topics">
					<h6>还没有关注话题</h6>
					<div>在这里可以看到你关注的话题动态，不错过每一条精彩内容</div>
				</div>
				<div class="topic-recommend">
					<div class="topic-recommend-head">
						<h2 class="topic-recommend-name">其他人关注的话题</h2>
						<a class="zg-link-litblue-normal js-pager topics-pager" @click="page++,pageOn()">
							换一换
						</a>
					</div>
					<div v-for = "arr in computedarr" class="topic-recommend-list js-list">
						<div  class="topic-item zg-clear zm-profile-section-item zm-item">
							<div class="topic-avatar">
								<a href="https://www.zhihu.com/topic/19556671" target="_blank"><img class="Avatar Avatar--m" src="../image/3.jpg"   alt="儿童教育"></a>
							</div>
							<div class="topic-item-content">
								<div>
									<h3 class="topic-item-title">
<a   target="_blank" class="topic-item-title-link">{{arr.name}}</a>
</h3>
									<div class="zg-right" style="margin-top: -26px;"><button data-follow="t:button" data-id="2146" class="zg-btn zg-btn-follow zm-rich-follow-btn">关注</button></div>
								</div>
								<div class="topic-item-feed-digest">

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import $ from "jquery"
	export default {
		data() {
			return {
				all:1,
				page: 0,
				pageSize:6,
				arr: [{
					name: "儿童教育",
					id: 1
				}, {
					name: "科技",
					id: 2
				}, {
					name: "自然科学",
					id: 3
				}, {
					name: "物理学",
					id: 4
				}, {
					name: "体育",
					id: 5
				}, {
					name: "心理学",
					id: 6
				}, {
					name: "数据分析",
					id: 7
				}, {
					name: "文化",
					id: 8
				}, {
					name: "生活方式",
					id: 9
				}, {
					name: "健康",
					id: 10
				}, {
					name: "设计",
					id: 11
				}, {
					name: "审计",
					id: 12
				}, {
					name: "博弈论",
					id: 13
				}, {
					name: "发展经济学",
					id: 14
				}, {
					name: "篮球",
					id: 15
				}, {
					name: "区域经济学",
					id: 16
				}, {
					name: "互联网",
					id: 17
				}, {
					name: "交互设计",
					id: 18
				}, {
					name: "化学",
					id: 19
				}, {
					name: "阅读",
					id: 20
				}, {
					name: "法律",
					id: 21
				}, {
					name: "医学",
					id: 22
				}, {
					name: "财务",
					id: 23
				}, {
					name: "户外运动",
					id: 24
				}, {
					name: "字体设计",
					id: 25
				}, {
					name: "美食",
					id: 26
				}, {
					name: "戏剧",
					id: 27
				}, {
					name: "教育",
					id: 28
				}, {
					name: "金融",
					id: 29
				}, {
					name: "生物学",
					id: 30
				}, {
					name: "商业",
					id: 31
				}, {
					name: "投资",
					id: 32
				}, {
					name: "音乐",
					id: 33
				}, {
					name: "旅游",
					id: 34
				}, {
					name: "对冲基金",
					id: 35
				}, {
					name: "汽车",
					id: 36
				}, {
					name: "创业",
					id: 37
				}, {
					name: "语言",
					id: 38
				}, {
					name: "经济学",
					id: 39
				}, {
					name: "动漫",
					id: 40
				}, {
					name: "时尚",
					id: 41
				}, {
					name: "运动",
					id: 42
				}, {
					name: "艺术",
					id: 43
				}, {
					name: "电影",
					id: 44
				}, {
					name: "食品安全",
					id: 45
				}]
			}
		},
		methods: {
			pageOn:function(){
				this.all++;
                
                if(this.all>=7){
                	this.page = 0;
                }
			}
			
		},
		computed: {
					computedarr: function() {
						var curtotal=this.page*this.pageSize;
                         var tiaoshu=this.page*this.pageSize+this.pageSize;
						return this.arr.slice(curtotal,tiaoshu)
						 
					}
				}
	}
</script>

<style>

</style>
