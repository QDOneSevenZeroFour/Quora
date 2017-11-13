<template>
	 
		
	
	 
	<div class="zg-wrap zu-main clearfix ">
		<div class="zu-main-content-inner">
			<div class="zg-section" id="zh-home-list-title">
				<i class="zg-icon zg-icon-feedlist"></i> 最新动态 <input type="hidden" id="is-topstory">
				<span class="zg-right zm-noti-cleaner-setting" style="list-style:none"><a href="https://www.zhihu.com/settings/filter" class="zg-link-gray-normal"><i class="zg-icon zg-icon-settings"></i>设置</a></span>
			</div>
			<!--=================================-->
			<div v-for="a in arr" class="feed-item folding feed-item-hook feed-item-0
 
" feed-item-p="" data-type="p" id="feed-0" data-za-module="FeedItem" data-za-index="">
				<meta itemprop="ZReactor" data-id="4174429" data-meta="{&quot;source_type&quot;: &quot;topic_acknowledged_article&quot;, &quot;voteups&quot;: 66, &quot;comments&quot;: 8, &quot;source&quot;: [[&quot;topic&quot;, 11152]]}">
				<div class="feed-item-inner">
					<div class="avatar">
						<a title="前端性能优化" data-hovercard="t$t$19583739" class="zm-item-link-avatar" href="/topic/19583739" target="_blank">
							<!--<img src="https://pic2.zhimg.com/7e5e5052d_m.jpg" alt="前端性能优化" class="side-topic-avatar">-->
						</a>
					</div>
					<div class="feed-main">
						<div class="feed-source" data-za-module="FeedSource">
							来自话题:
							<a href="/topic/19583739" data-hovercard="t$b$19583739" data-token="19583739" data-topicid="11152" data-follow="1" data-interest="1" target="_blank" data-za-element-name="Title">{{a.resource}}</a>

						</div>
						<div class="feed-content" data-za-module="PostItem" data-za-index="">
							<meta itemprop="post-id" content="4174429">
							<meta itemprop="post-url-token" content="29965104">
							<h2 class="feed-title"><a target="_blank" class="post-link" href="#/detail" data-za-element-name="Title">{{a.title}}</a></h2>

							<div class="entry-body post-body js-collapse-body">

								<div class="author-info summary-wrapper">
									<span class="author-link-line">
										<a href="/people/coocss" data-hovercard="p$t$coocss" class="name author-link">{{a.author}}</a>
									</span>
									<span  class="bio">
										{{a.desc}}
									</span>
								</div>

								<div class="zm-item-vote-info" data-votecount="66" data-za-module="VoteInfo">

									<span class="voters text"><a href="#" class="more text"><span class="js-voteCount">66</span>&nbsp;人赞</a>
									</span>

								</div>
								<div class="post-content" data-author-name="蒙娜丽莎" data-entry-url="https://zhuanlan.zhihu.com/p/29965104">
									<textarea class="content hidden">&lt;img src="https://pic1.zhimg.com/50/v2-7df0177812ec0cb2e498693577884b7c_b.jpg" data-rawwidth="740" data-rawheight="411" class="origin_image zh-lightbox-thumb" width="740" data-original="https://pic1.zhimg.com/50/v2-7df0177812ec0cb2e498693577884b7c_r.jpg"&gt;&lt;h2&gt;&lt;b&gt;一、写在前面&lt;/b&gt;&lt;/h2&gt;&lt;blockquote&gt;产品经理：那谁，那个创建订单流程能不能改一下，改成创建订单的同时直接调取淘宝、微信支付，前端可以处理吧......&lt;br&gt;&lt;br&gt;设计：喂喂喂，这个这个这个二级导航高度不要55px，全部改成48px吧.....&lt;br&gt;&lt;br&gt;测试：卧槽，死前端过来，那个预约按钮又显示不出来了，服务端返回的状态是4，快看一下.....&lt;br&gt;&lt;br&gt;服务端：（1）这个验证应该要在先放在前端验证吧，我还有一堆后台没做；（2）这个列表更新不频繁，前端先写死吧.....&lt;br&gt;&lt;br&gt;项目经理：靠，在锤子手机原生浏览器下，https的图片没办法显示啊，会有“私密连接”报警，前端快看一下......&lt;br&gt;&lt;br&gt;运维：你这个前端上线，要把服务端构建命令和前端构建命令合并成一个命令，并且把package.json 挪到顶级目录......&lt;/blockquote&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;对！据我所知，很多团队把前端归类成差不多万能的岗位，所有体现问题的都要走到前端人员处理。&lt;/p&gt;&lt;p&gt;当然，只要能出好产品，It doesn't matter，烦点就烦点呗！&lt;/p&gt;&lt;p&gt;毕竟，很多团队测试是不测接口的，那么发现bug都是从前端发现的。&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;img src="https://pic4.zhimg.com/v2-b2ef3131b3b98bdf3a3e7651dcf1bc73_b.jpg" data-caption="" data-rawwidth="350" data-rawheight="188" data-thumbnail="http://pic4.zhimg.com/v2-b2ef3131b3b98bdf3a3e7651dcf1bc73_b.jpg" class="content_image" width="350"&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;理论上，团队中所有的成员都是有很大机会给前端提需求的。工作如此复杂，那如果不能有个体验好的开发环境，处理起这些需求，很容易就把自己套死了。&lt;/p&gt;&lt;blockquote&gt;注：这并不是一篇webpack api文档，所以不涉及具体的配置。具体webpack api可以上webpack官网查看&lt;/blockquote&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;h2&gt;&lt;b&gt;二、给自己提一份需求&lt;/b&gt;&lt;/h2&gt;&lt;blockquote&gt;Q：什么样的开发环境才是好的开发环境？&lt;br&gt;A：天行健，君子以自强不息......&lt;/blockquote&gt;&lt;p&gt;那那那，我们就先给自己提个需求吧！&lt;/p&gt;&lt;ol&gt;&lt;li&gt;代码逻辑太复杂，所以开发过程中需要断点调试！&lt;/li&gt;&lt;li&gt;不想手动刷新，所以需要热加载！&lt;/li&gt;&lt;li&gt;写更漂亮的代码，所以需要支持es6、sass！&lt;/li&gt;&lt;li&gt;不想每次都import jquery，所以需要引入到全局！&lt;/li&gt;&lt;li&gt;图片太大了，所以需要压缩图片！&lt;/li&gt;&lt;li&gt;需要部署多个环境，开发环境、测试环境、beta环境、正式环境！&lt;/li&gt;&lt;li&gt;服务端，需求并不确定，可能会频繁的需要改tmd构建目录！&lt;/li&gt;&lt;li&gt;有些页面，服务端没时间开发，需要前端写死！&lt;/li&gt;&lt;li&gt;他们说，图片需要发布CDN！&lt;/li&gt;&lt;li&gt;CND可能会有缓存，现在还不确定静态资源用文件hash的形式好，还是参数hash的形式好！&lt;/li&gt;&lt;li&gt;好多人合作，所以需要检查代码规范！&lt;/li&gt;&lt;li&gt;.........&lt;/li&gt;&lt;/ol&gt;&lt;p&gt;嗯！嗯！暂时可以想到的需求就这些。&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;h2&gt;&lt;b&gt;三、Webpack是什么？&lt;/b&gt;&lt;/h2&gt;&lt;blockquote&gt;Q：怎样才能不被牵着鼻子走？&lt;br&gt;A：知其然知其所以然......&lt;/blockquote&gt;&lt;p&gt;那那那，我们就先简单了解下webpack吧！&lt;/p&gt;&lt;blockquote&gt;简单理解是：webpack是打包工具，它将许多松散的模块（css、js、图片、字体等）按照一定的依赖和规则打包成符合生产环境部署的前端资源。&lt;br&gt;&lt;br&gt;比如：通过一个的主文件（如：app.js），webpack将从这个主文件开始找到所有依赖文件（js、css、图片、字体等），使用一定的规则（如：babel-loader、sass-loader、file-loader等）、插件（如：ExtractTextPlugin、HtmlWebpackPlugin等）处理它们，最后构建为符合上线部署的文件（如：bundle.js）。&lt;/blockquote&gt;&lt;p&gt;这就涉及到四个个概念主文件、规则、插件、构建后的文件。我们以这三个来了解webpack吧！&lt;/p&gt;&lt;p&gt;&lt;b&gt;（1）主文件：&lt;/b&gt;Entry&lt;/p&gt;&lt;p&gt;webpack中主文件以entry属性{ key: value }来组件主文件；如下：&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;entry&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
    &lt;span class="nx"&gt;app&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'../font/app.js'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;common&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;[&lt;/span&gt;&lt;span class="s1"&gt;'jquery'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="s1"&gt;'../font/common_js/common.api.js'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="s1"&gt;'../font/common_js/common.base.js'&lt;/span&gt;&lt;span class="p"&gt;]&lt;/span&gt;
&lt;span class="p"&gt;}&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;上面配置中包括两个主文件：&lt;/p&gt;&lt;p&gt;app：应用程序js&lt;/p&gt;&lt;p&gt;common：共用代码js，这些代码是每个功能都需要页面都需要用的，所以把它分离到common中。&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;&lt;b&gt;（2）规则module rules&lt;/b&gt;&lt;/p&gt;&lt;p&gt;webpack2.0后规则以module.rules属性{key: value}来组织规则；如下：&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;module&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
    &lt;span class="nx"&gt;rules&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;[&lt;/span&gt;
        &lt;span class="p"&gt;{&lt;/span&gt;
            &lt;span class="nx"&gt;test&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="sr"&gt;/\.js$/&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
            &lt;span class="nx"&gt;loader&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'babel-loader'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
            &lt;span class="nx"&gt;exclude&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="sr"&gt;/(node_modules)/&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="p"&gt;},&lt;/span&gt;
        &lt;span class="p"&gt;{&lt;/span&gt;
            &lt;span class="nx"&gt;test&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="sr"&gt;/\.(png|jpg|gif|svg)$/&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
            &lt;span class="nx"&gt;loader&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'url-loader'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
            &lt;span class="nx"&gt;query&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
                &lt;span class="nx"&gt;limit&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="mi"&gt;1&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
                &lt;span class="nx"&gt;publicPath&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="nx"&gt;config&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;imgPath&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
                &lt;span class="nx"&gt;name&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'/v1/images/[hash:8].[name].[ext]'&lt;/span&gt;
            &lt;span class="p"&gt;}&lt;/span&gt;
        &lt;span class="p"&gt;},&lt;/span&gt;
    &lt;span class="p"&gt;]&lt;/span&gt;
&lt;span class="p"&gt;}&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;在主文件中涉及的所有依赖资源（app.js中import的所有js、css、图片、字体），对依赖资源的文件路径按正则（rules数组中的test），匹配成功的以对应的loader处理资源源文件（如：xx.jsx、xx.vue、xx.js、xx.ts）等。&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;&lt;b&gt;（3）插件：plugins&lt;/b&gt;&lt;/p&gt;&lt;p&gt;webpack中插件已plugins属性{key: value}来组织第三方插件；如下：（配置实现：生成html文件、提取公用js代码、分离css、定义全局变量）&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;plugins&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;[&lt;/span&gt;
    &lt;span class="k"&gt;new&lt;/span&gt; &lt;span class="nx"&gt;HtmlWebpackPlugin&lt;/span&gt;&lt;span class="p"&gt;({&lt;/span&gt;
        &lt;span class="nx"&gt;filename&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'public/mall/index.html'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;template&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'../template.html'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;chunks&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;[&lt;/span&gt; &lt;span class="s1"&gt;'common'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="s1"&gt;'vendor'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="s1"&gt;'mall'&lt;/span&gt;&lt;span class="p"&gt;],&lt;/span&gt;
        &lt;span class="nx"&gt;hash&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="c1"&gt;// 为静态资源生成hash值&lt;/span&gt;
        &lt;span class="nx"&gt;inject&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'body'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;xhtml&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;minify&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
            &lt;span class="nx"&gt;removeComments&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="p"&gt;}&lt;/span&gt;
    &lt;span class="p"&gt;}),&lt;/span&gt;
   &lt;span class="k"&gt;new&lt;/span&gt; &lt;span class="nx"&gt;webpack&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;optimize&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;CommonsChunkPlugin&lt;/span&gt;&lt;span class="p"&gt;({&lt;/span&gt;
       &lt;span class="nx"&gt;names&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;[&lt;/span&gt;&lt;span class="s1"&gt;'vendor'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="s1"&gt;'common'&lt;/span&gt;&lt;span class="p"&gt;]&lt;/span&gt;
   &lt;span class="p"&gt;}),&lt;/span&gt;
   &lt;span class="k"&gt;new&lt;/span&gt; &lt;span class="nx"&gt;ExtractTextPlugin&lt;/span&gt;&lt;span class="p"&gt;({&lt;/span&gt;
       &lt;span class="nx"&gt;filename&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'meitumall/v1/css/[name].css?[contenthash:8]'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
       &lt;span class="nx"&gt;allChunks&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
   &lt;span class="p"&gt;}),&lt;/span&gt;
   &lt;span class="k"&gt;new&lt;/span&gt; &lt;span class="nx"&gt;webpack&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;ProvidePlugin&lt;/span&gt;&lt;span class="p"&gt;({&lt;/span&gt;
        &lt;span class="nx"&gt;$&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'jquery'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;jQuery&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'jquery'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="s1"&gt;'window.jQuery'&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'jquery'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="s1"&gt;'window.$'&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'jquery'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="p"&gt;}),&lt;/span&gt;
&lt;span class="p"&gt;]&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;plugins插件的目的在于解决loader无法实现的功能，扩展webpack的功能。&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;&lt;b&gt;（4）构建后的文件&lt;/b&gt;&lt;/p&gt;&lt;p&gt;webpack中构建后文件以output属性{key: value}来组织构建后的文件；如下：&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;output&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
    &lt;span class="nx"&gt;path&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'../dist'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;publicPath&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="nx"&gt;config&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;staticPath&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;filename&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'/v1/js/[name].[chunkhash:8].js'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;chunkFilename&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'[id].[chunkhash:8].js'&lt;/span&gt;
&lt;span class="p"&gt;}&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;path：定义构建后文件的存放主目录&lt;/p&gt;&lt;p&gt;publicPath：定义静态资源的引用路径（比如：css中应用了图片）&lt;/p&gt;&lt;p&gt;filename：定义构建后的文件名，其中[name]: 未entry中的定义的key（app），chunkhash定义hash规范。&lt;/p&gt;&lt;p&gt;chunkFilename：定义未在entry中组织的js文件，如：按commonJs需加载的文件，如：下面这种形式引入的js。&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;ensure&lt;/span&gt;&lt;span class="p"&gt;([&lt;/span&gt;&lt;span class="s2"&gt;"modules/require0.js"&lt;/span&gt;&lt;span class="p"&gt;],&lt;/span&gt; &lt;span class="kd"&gt;function&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;)&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
    &lt;span class="kd"&gt;var&lt;/span&gt; &lt;span class="nx"&gt;a&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="s2"&gt;"modules/require0.js"&lt;/span&gt;&lt;span class="p"&gt;);&lt;/span&gt;
&lt;span class="p"&gt;},&lt;/span&gt; &lt;span class="s1"&gt;'require0'&lt;/span&gt;&lt;span class="p"&gt;);&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;img src="http://pic1.zhimg.com/v2-f78661bef717cf2cc2c2e5158f196384_b.jpg" data-caption="" data-rawwidth="2598" data-rawheight="1299" class="origin_image zh-lightbox-thumb" width="2598" data-original="http://pic1.zhimg.com/v2-f78661bef717cf2cc2c2e5158f196384_r.jpg"&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;h2&gt;四、处理我们的需求&lt;/h2&gt;&lt;p&gt;处理第二中我们提到的需求：&lt;/p&gt;&lt;blockquote&gt;代码逻辑太复杂，所以开发过程中需要断点调试！&lt;/blockquote&gt;&lt;p&gt;webpack中，通过设置devtool开启sourceMap 让我们可以调试代码，如下：&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;devtool&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'source-map'&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;souceMap有多种模式，大家可以看下这篇文章的介绍：&lt;/p&gt;&lt;p&gt;&lt;a href="http://link.zhihu.com/?target=https%3A//juejin.im/post/58293502a0bb9f005767ba2f" class=" wrap external" target="_blank" rel="nofollow noreferrer"&gt;[webpack] devtool里的7种SourceMap模式是什么鬼？&lt;i class="icon-external"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/p&gt;&lt;p&gt;怎么调试代码，可以看这篇文章：&lt;/p&gt;&lt;p&gt;&lt;a href="https://www.zhihu.com/question/54154234/answer/160695730" class="internal"&gt;蒙娜丽莎：使用vue-cli构建的项目如何调试？如何与服务端结合？&lt;/a&gt;&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;blockquote&gt;不想手动刷新，所以需要热加载！&lt;/blockquote&gt;&lt;p&gt;webpack中，通过设置devServer来配置开发服务，如下：&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;devServer&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
    &lt;span class="nx"&gt;contentBase&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'./dist'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;inline&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;    
    &lt;span class="nx"&gt;compress&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;host&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'127.0.0.1'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;port&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="mi"&gt;8088&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;disableHostCheck&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;historyApiFallback&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;
&lt;span class="p"&gt;}&lt;/span&gt;

&lt;span class="c1"&gt;// pakage.json 配置启动脚本&lt;/span&gt;
&lt;span class="s2"&gt;"scripts"&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
    &lt;span class="s2"&gt;"start"&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s2"&gt;"webpack-dev-server --config build/webpack.dev.conf.js --open --hot"&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
&lt;span class="p"&gt;}&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;blockquote&gt;写更漂亮的代码，所以需要支持es6、sass！&lt;/blockquote&gt;&lt;p&gt;上面说道：loader是用来处理资源源文件（如：xx.jsx、xx.vue、xx.js、xx.ts等），因此只要在配置相应的loader就可以了&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;rules&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;[&lt;/span&gt;
&lt;span class="c1"&gt;// ...&lt;/span&gt;
    &lt;span class="p"&gt;{&lt;/span&gt;
        &lt;span class="nx"&gt;test&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="sr"&gt;/\.js$/&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="c1"&gt;// 正则&lt;/span&gt;
        &lt;span class="nx"&gt;loader&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'babel-loader'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="c1"&gt;// babel-loader&lt;/span&gt;
        &lt;span class="nx"&gt;exclude&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="sr"&gt;/(node_modules)/&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="c1"&gt;// 忽略目录&lt;/span&gt;
    &lt;span class="p"&gt;},&lt;/span&gt;
        &lt;span class="p"&gt;{&lt;/span&gt;
            &lt;span class="nx"&gt;test&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="sr"&gt;/\.(scss|css)$/&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
            &lt;span class="nx"&gt;use&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="nx"&gt;ExtractTextPlugin&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;extract&lt;/span&gt;&lt;span class="p"&gt;({&lt;/span&gt;
                &lt;span class="nx"&gt;use&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;[&lt;/span&gt;
                    &lt;span class="p"&gt;{&lt;/span&gt;
                        &lt;span class="nx"&gt;loader&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'css-loader'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
                        &lt;span class="nx"&gt;options&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
                            &lt;span class="nx"&gt;sourceMap&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;false&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
                            &lt;span class="nx"&gt;minimize&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
                        &lt;span class="p"&gt;}&lt;/span&gt;
                    &lt;span class="p"&gt;},&lt;/span&gt;
                    &lt;span class="s1"&gt;'postcss-loader'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
                    &lt;span class="s2"&gt;"sass-loader?sourceMap"&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
                &lt;span class="p"&gt;],&lt;/span&gt;
                &lt;span class="nx"&gt;fallback&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s2"&gt;"style-loader"&lt;/span&gt;
            &lt;span class="p"&gt;})&lt;/span&gt;
        &lt;span class="p"&gt;},&lt;/span&gt;
&lt;span class="c1"&gt;// ...&lt;/span&gt;
&lt;span class="p"&gt;]&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;具体各个loader的配置规则可以到github上搜索该loader文档。&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;blockquote&gt;不想每次都import jquery，所以需要引入到全局！&lt;/blockquote&gt;&lt;p&gt;这只需要将jQuery配置到全局即可。&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;plugins&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;[&lt;/span&gt;
  &lt;span class="c1"&gt;// ...&lt;/span&gt;
  &lt;span class="k"&gt;new&lt;/span&gt; &lt;span class="nx"&gt;webpack&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;ProvidePlugin&lt;/span&gt;&lt;span class="p"&gt;({&lt;/span&gt;
        &lt;span class="nx"&gt;$&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'jquery'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;jQuery&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'jquery'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="s1"&gt;'window.jQuery'&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'jquery'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="s1"&gt;'window.$'&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'jquery'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="p"&gt;}),&lt;/span&gt;
&lt;span class="p"&gt;]&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;这样如要在如index.js中用到jquery，就可以不用import 'jquery'，直接使用$。&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;blockquote&gt;图片太大了，所以需要压缩图片！&lt;/blockquote&gt;&lt;p&gt;配置图片压缩插件即可：&lt;/p&gt;&lt;p&gt;&lt;a href="http://link.zhihu.com/?target=https%3A//github.com/tcoopman/image-webpack-loader" class=" wrap external" target="_blank" rel="nofollow noreferrer"&gt;tcoopman/image-webpack-loader&lt;i class="icon-external"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;blockquote&gt;1、需要部署多个环境，开发环境、测试环境、beta环境、正式环境！&lt;br&gt;2、服务端，需求并不确定，可能会频繁的需要改tmd构建目录！&lt;br&gt;3、他们说，图片需要发布CDN！&lt;br&gt;4、CND可能会有缓存，现在还不确定静态资源用文件hash的形式好，还是参数hash的形式好！&lt;/blockquote&gt;&lt;p&gt;这些涉及到部署规范的需求可以统一处理。&lt;/p&gt;&lt;p&gt;具体方法维护一份配置文档，如config.js，里面配置各个部署环境的需求；如下：&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;module&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;exports&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
    &lt;span class="nx"&gt;dev&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;   &lt;span class="c1"&gt;// 开发环境配置&lt;/span&gt;
        &lt;span class="nx"&gt;port&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="mi"&gt;9000&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;NODE_ENV&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'development'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;devtool&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'source-map'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;jsSourceMap&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;false&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;cssSourceMap&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;false&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;eslint&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;path&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'../dist'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="c1"&gt;// 生成目录&lt;/span&gt;
        &lt;span class="nx"&gt;jsPath&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'http://localjs.xx.com'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;  &lt;span class="c1"&gt;// js静态资源&lt;/span&gt;
        &lt;span class="nx"&gt;cssPath&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'http://localcss.xx.com'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;    &lt;span class="c1"&gt;// css静态资源地址&lt;/span&gt;
        &lt;span class="nx"&gt;imgPath&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'http://localimg.app.meitudata.com'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;filenameHash&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;false&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;  &lt;span class="c1"&gt;// 文件名hash的形式？否则为参数hash&lt;/span&gt;
        &lt;span class="nx"&gt;API_PATH&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'http://api.xxx.com/v1/'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;  &lt;span class="c1"&gt;// 配置api地址&lt;/span&gt;
    &lt;span class="p"&gt;},&lt;/span&gt;
    &lt;span class="nx"&gt;production&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;    &lt;span class="c1"&gt;//生产环境&lt;/span&gt;
        &lt;span class="nx"&gt;port&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="mi"&gt;9000&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;NODE_ENV&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'production'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;devtool&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;''&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;jsSourceMap&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;false&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;cssSourceMap&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;false&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;eslint&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;path&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'../dist'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="c1"&gt;// 生成目录&lt;/span&gt;
        &lt;span class="nx"&gt;jsPath&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'http://js.xx.com'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;  &lt;span class="c1"&gt;// js静态资源&lt;/span&gt;
        &lt;span class="nx"&gt;cssPath&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'http://css.xx.com'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;    &lt;span class="c1"&gt;// css静态资源地址&lt;/span&gt;
        &lt;span class="nx"&gt;imgPath&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'http://img.app.meitudata.com'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;filenameHash&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="kc"&gt;false&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;  &lt;span class="c1"&gt;// 文件名hash的形式？否则为参数hash&lt;/span&gt;
        &lt;span class="nx"&gt;API_PATH&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'http://api.xxx.com/v1/'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;  &lt;span class="c1"&gt;// 配置api地址&lt;/span&gt;
    &lt;span class="p"&gt;},&lt;/span&gt;
    &lt;span class="nx"&gt;test&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;   &lt;span class="c1"&gt;// 测试环境&lt;/span&gt;
        &lt;span class="c1"&gt;// ...&lt;/span&gt;
    &lt;span class="p"&gt;},&lt;/span&gt;
    &lt;span class="nx"&gt;bata&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt; &lt;span class="c1"&gt;// bata环境&lt;/span&gt;
        &lt;span class="c1"&gt;// ...&lt;/span&gt;
    &lt;span class="p"&gt;}&lt;/span&gt;
&lt;span class="p"&gt;};&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;建立各个个环境的webpack文件，如：webpack.dev.config.js、webpack.test.config.js、webpack.production.config.js，并在文件中引入对应config的配置，如下：&lt;/p&gt;&lt;p&gt;webpack.production.config.js 内容：&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="kr"&gt;const&lt;/span&gt; &lt;span class="nx"&gt;merge&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="s1"&gt;'webpack-merge'&lt;/span&gt;&lt;span class="p"&gt;);&lt;/span&gt;
&lt;span class="kr"&gt;const&lt;/span&gt; &lt;span class="nx"&gt;webpackBaseConfig&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="s1"&gt;'./webpack.base.config.js'&lt;/span&gt;&lt;span class="p"&gt;)(&lt;/span&gt;&lt;span class="s1"&gt;'production'&lt;/span&gt;&lt;span class="p"&gt;);&lt;/span&gt;
&lt;span class="kr"&gt;const&lt;/span&gt; &lt;span class="nx"&gt;webpackConfig&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;merge&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="nx"&gt;webpackBaseConfig&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
&lt;span class="c1"&gt;// 各个部署环境的特殊配置&lt;/span&gt;
&lt;span class="p"&gt;});&lt;/span&gt;
&lt;span class="nx"&gt;module&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;exports&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;webpackConfig&lt;/span&gt;&lt;span class="p"&gt;;&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;webpack.base.config.js内容（通用的入口文件、规则、插件、构建后的文件）&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="kr"&gt;const&lt;/span&gt; &lt;span class="nx"&gt;webpack&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="s1"&gt;'webpack'&lt;/span&gt;&lt;span class="p"&gt;);&lt;/span&gt;
&lt;span class="kr"&gt;const&lt;/span&gt; &lt;span class="nx"&gt;HtmlWebpackPlugin&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="s1"&gt;'html-webpack-plugin'&lt;/span&gt;&lt;span class="p"&gt;);&lt;/span&gt;
&lt;span class="kr"&gt;const&lt;/span&gt; &lt;span class="nx"&gt;ExtractTextPlugin&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="s1"&gt;'extract-text-webpack-plugin'&lt;/span&gt;&lt;span class="p"&gt;);&lt;/span&gt;
&lt;span class="kr"&gt;const&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;&lt;span class="nx"&gt;resolve&lt;/span&gt;&lt;span class="p"&gt;}&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="s1"&gt;'./utils'&lt;/span&gt;&lt;span class="p"&gt;);&lt;/span&gt;
&lt;span class="kd"&gt;var&lt;/span&gt; &lt;span class="nx"&gt;glob&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="s1"&gt;'glob'&lt;/span&gt;&lt;span class="p"&gt;);&lt;/span&gt;

&lt;span class="nx"&gt;module&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;exports&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="kd"&gt;function&lt;/span&gt; &lt;span class="nx"&gt;webpackBaseConfig&lt;/span&gt; &lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="nx"&gt;NODE_ENV&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="s1"&gt;'development'&lt;/span&gt;&lt;span class="p"&gt;)&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
    &lt;span class="kr"&gt;const&lt;/span&gt; &lt;span class="nx"&gt;_config&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;require&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="s1"&gt;'./config.js'&lt;/span&gt;&lt;span class="p"&gt;)(&lt;/span&gt;&lt;span class="nx"&gt;NODE_ENV&lt;/span&gt;&lt;span class="p"&gt;);&lt;/span&gt;  &lt;span class="c1"&gt;// 各个部署环境的配置需求&lt;/span&gt;
    &lt;span class="nx"&gt;process&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;env&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;NODE_ENV&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="nx"&gt;NODE_ENV&lt;/span&gt;&lt;span class="p"&gt;;&lt;/span&gt;
    &lt;span class="kr"&gt;const&lt;/span&gt; &lt;span class="nx"&gt;webpackConfig&lt;/span&gt; &lt;span class="o"&gt;=&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
        &lt;span class="nx"&gt;devtool&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="nx"&gt;_config&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;devtool&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="nx"&gt;entry&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
            &lt;span class="c1"&gt;// ...&lt;/span&gt;
        &lt;span class="p"&gt;},&lt;/span&gt;
        &lt;span class="nx"&gt;output&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
            &lt;span class="nx"&gt;path&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="nx"&gt;_config&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;path&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
            &lt;span class="nx"&gt;publicPath&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="nx"&gt;_config&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;jsPath&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
            &lt;span class="nx"&gt;filename&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="nx"&gt;_config&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;filenameHash&lt;/span&gt; &lt;span class="o"&gt;?&lt;/span&gt; &lt;span class="s1"&gt;'/js/[name].[chunkhash:8].js?'&lt;/span&gt; &lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'/js/[name].js?[chunkhash:8]'&lt;/span&gt; &lt;span class="p"&gt;,&lt;/span&gt;
        &lt;span class="p"&gt;},&lt;/span&gt;
     &lt;span class="c1"&gt;// ....&lt;/span&gt;
     &lt;span class="p"&gt;};&lt;/span&gt;
     &lt;span class="k"&gt;return&lt;/span&gt; &lt;span class="nx"&gt;webpackConfig&lt;/span&gt;&lt;span class="p"&gt;;&lt;/span&gt;
&lt;span class="p"&gt;}&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;最后在 package.json 配置各个部署环境的运行脚本；如下&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt; &lt;span class="s2"&gt;"scripts"&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
    &lt;span class="s2"&gt;"start"&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s2"&gt;"webpack-dev-server --config assets/build/webpack.dev.conf.js --open --hot"&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="s2"&gt;"build:test"&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s2"&gt;"webpack -p --config assets/build/webpack.test.conf.js --progress --hide-modules"&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="s2"&gt;"build:bata"&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s2"&gt;"composer update -o --no-dev --no-plugins --no-scripts --ignore-platform-reqs -n &amp;amp;&amp;amp; webpack -p --config assets/build/webpack.bata.conf.js --progress --hide-modules"&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="s2"&gt;"build"&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s2"&gt;"composer update -o --no-dev --no-plugins --no-scripts --ignore-platform-reqs -n &amp;amp;&amp;amp; webpack -p --config assets/build/webpack.production.conf.js --progress --hide-modules"&lt;/span&gt;
  &lt;span class="p"&gt;},&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;blockquote&gt;3、有些页面，服务端没时间开发，需要前端写死！&lt;/blockquote&gt;&lt;p&gt;转换一下需求就是，需要前端维护一些惊天页面（比如：一些html5活动页等等）；这个时候就涉及到用webpack配置多页应用（既：entry添加多个入口，plugins中配置多项html生成规范等），可以参考之前写的一篇文章。&lt;/p&gt;&lt;p&gt;&lt;a href="https://zhuanlan.zhihu.com/p/27551173" class="internal"&gt;美图商城改版之——webpack多页应用环境搭建&lt;/a&gt;&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;blockquote&gt;好多人合作，所以需要检查代码规范！&lt;/blockquote&gt;&lt;p&gt;可以通过配置eslint来检查代码规范。&lt;/p&gt;&lt;p&gt;&lt;a href="http://link.zhihu.com/?target=https%3A//github.com/eslint/eslint" class=" wrap external" target="_blank" rel="nofollow noreferrer"&gt;eslint/eslint&lt;i class="icon-external"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;h2&gt;五、补充hash指纹说明&lt;/h2&gt;&lt;p&gt;hash指纹是什么呢？实现前端惊天资源的增量更新。我们知道用户访问过某个网站后浏览器缓存前端资源文件（或者cdn），比如：同时缓存了index.deadk12.js、h5.kdjkjf3.js。同样适用于图片文件、css文件、字体文件等前端静态资源。&lt;/p&gt;&lt;p&gt;当网站升级（假设更新了h5涉及的js内容），发布新版本的时候就需要生成新的版本号来使新的及时体现，不然就要等浏览器缓存过期（或者强刷浏览器、刷cdn等）&lt;/p&gt;&lt;p&gt;比如：查看知乎的页面源码，红线框住的内容就用了增量更新的形式。&lt;/p&gt;&lt;img src="http://pic1.zhimg.com/v2-0d1ff9fa2650834bd582ddae5288cfe0_b.jpg" data-caption="" data-rawwidth="3050" data-rawheight="202" class="origin_image zh-lightbox-thumb" width="3050" data-original="http://pic1.zhimg.com/v2-0d1ff9fa2650834bd582ddae5288cfe0_r.jpg"&gt;&lt;p&gt;webpack 提供两种hash配置：hash与chunkhash&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-js"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nx"&gt;output&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="p"&gt;{&lt;/span&gt;
    &lt;span class="nx"&gt;path&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'../dist'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;publicPath&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="nx"&gt;config&lt;/span&gt;&lt;span class="p"&gt;.&lt;/span&gt;&lt;span class="nx"&gt;staticPath&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;filename&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'/v1/js/[name].[chunkhash:8].js'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nx"&gt;chunkFilename&lt;/span&gt;&lt;span class="o"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'[id].[chunkhash:8].js'&lt;/span&gt;
&lt;span class="p"&gt;}&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;blockquote&gt;1、hash&lt;/blockquote&gt;&lt;p&gt;代表的是&lt;i&gt;compilation&lt;/i&gt;的hash值&lt;/p&gt;&lt;p&gt;compilation代表各个版本的资源对应的编译进程。每次构建中有文件有改动就会创建一个新compilation。&lt;/p&gt;&lt;p&gt;因此，项目中如果有一个文件修改，那么每次编译生成hash都会不一样，不同入口文件（index、h5）的hash是一样的。&lt;/p&gt;&lt;p&gt;导致的问题是，一旦有一个文件做修改，那么所有的缓存都会失效。&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;blockquote&gt;2、chunkhash&lt;/blockquote&gt;&lt;p&gt;chunkhash是根据具体模块文件的内容计算所得的hash值，所以某个文件的改动只会影响它本身的hash指纹，不会影响其他文件。&lt;/p&gt;&lt;p&gt;既如何h5的内容修改，不会影响index.xxx.js的缓存。&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;注：经测试相同的源代码，由于node.js版本的不一样，会导致依赖自已不一样，因此生成的hash、contenthash会不一样。&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;blockquote&gt;3、contenthash&lt;/blockquote&gt;&lt;p&gt;contenthash 是webpack第三方插件 extract-text-webpack-plugin 的另一种hash指纹。只跟css样式内容有关系；&lt;/p&gt;&lt;div class="highlight"&gt;&lt;pre&gt;&lt;code class="language-abap"&gt;&lt;span&gt;&lt;/span&gt;&lt;span class="nv"&gt;new&lt;/span&gt; &lt;span class="nv"&gt;ExtractTextPlugin&lt;/span&gt;&lt;span class="p"&gt;(&lt;/span&gt;&lt;span class="err"&gt;{&lt;/span&gt;
    &lt;span class="nv"&gt;filename&lt;/span&gt;&lt;span class="p"&gt;:&lt;/span&gt; &lt;span class="s1"&gt;'v1/css/[name].css?[contenthash:8]'&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
    &lt;span class="nv"&gt;allChunks&lt;/span&gt;&lt;span class="p"&gt;:&lt;/span&gt; &lt;span class="nv"&gt;true&lt;/span&gt;&lt;span class="p"&gt;,&lt;/span&gt;
&lt;span class="err"&gt;}&lt;/span&gt;&lt;span class="p"&gt;),&lt;/span&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;具体文章可以看：&lt;/p&gt;&lt;p&gt;&lt;a href="http://link.zhihu.com/?target=http%3A//www.cnblogs.com/ihardcoder/p/5623411.html" class=" wrap external" target="_blank" rel="nofollow noreferrer"&gt;Webpack中hash与chunkhash的区别，以及js与css的hash指纹解耦方案 - 才子锅锅 - 博客园&lt;i class="icon-external"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/p&gt;&lt;p&gt;&lt;/p&gt;</textarea>
									<div class="zh-summary summary clearfix">
										<img :src="a.src" data-rawwidth="740" data-rawheight="411" class="origin_image inline-img zh-lightbox-thumb" data-original="https://pic1.zhimg.com/50/v2-7df0177812ec0cb2e498693577884b7c_r.jpg">{{a.txt}}
										<a href="https://zhuanlan.zhihu.com/p/29965104" class="toggle-expand">显示全部</a>

									</div>
									<div class="Tipjar-entry hidden js-tipjar">
										<div class="Tipjar-tagLine">「于是乎」</div>
										<a href="http://zhuanlan.zhihu.com/p/29965104#tipjar" target="_blank" class="Tipjar-entryButton">赞赏</a>
									</div>
									<p class="hidden-default">
										<a class="post-link entry-link" target="_blank" href="https://zhuanlan.zhihu.com/p/29965104">2017-10-15</a>
									</p>
								</div>
							</div>
							<div class="feed-meta">
								<div class="zm-item-meta meta clearfix js-contentActions">
									<div class="zm-meta-panel">

										<a href="#" class="meta-item votenum-mobile zm-item-vote-count js-openVoteDialog"><span data-bind-votecount="">66</span><i class="zg-icon arrow"></i></a>
										<div class="zm-votebar" data-za-module="VoteBar">
											<button class="up" aria-pressed="false" title="赞">
<i class="icon vote-arrow"></i>
<span class="count">66</span>
<span class="label sr-only">赞</span>
</button>
										</div>

										<a data-follow="c:link" class="zg-follow meta-item js-followButton" href="#" id="cl-48722"><i class="z-icon-follow"></i>关注专栏</a>

										<a href="#" class="meta-item toggle-comment js-toggleCommentBox">
											<i class="z-icon-comment"></i>8 条评论</a>
										<a href="#" class="meta-item zu-autohide js-share"><i class="z-icon-share"></i>分享</a>
										<span class="zg-bull zu-autohide">•</span>
										<a href="#" class="meta-item zu-autohide js-report">举报</a>
										<span class="zg-bull">•</span>
										<a href="https://zhuanlan.zhihu.com/p/29965104" class="meta-item" target="_blank">去往文章页</a>
										<button class="meta-item item-collapse js-collapse">
<i class="z-icon-fold"></i>收起
</button>
									</div>

								</div>
								<a href="#" class="ignore zu-autohide" name="dislike" data-tooltip="s$b$不感兴趣"></a>
							</div>
						</div>
					</div>
				</div>
				<div class="undo-dislike-options" data-item_id="0">
					此内容将不会在动态中再次显示 <span class="zg-bull">•</span>
					<a href="#" class="meta-item revert">撤销</a>
					<a href="#" class="ignore zu-autohide close"></a>
				</div>
		</div>
		<!--============================================-->
		<!--更多=====================================-->
		<a @click="load" href="javascript:;" id="zh-load-more" data-method="next" class="zg-btn-white zg-r3px zu-button-more" style=""><i v-show="!bool" class="spinner-gray"></i> {{text}}</a>
		 
		<!--===================================-->
		<div class="zu-main-sidebar">
			<div class="shameimaru-section" data-info="{&quot;category&quot;: &quot;1&quot;, &quot;timestamp&quot;: 1510388523, &quot;ad_zone_id&quot;: 1, &quot;ad_id&quot;: 8565}" data-close="https://sugar.zhihu.com/track?pr=0&amp;ci=8909&amp;ai=8565&amp;lo=home_up&amp;tu=&amp;ts=1510388523&amp;lu=41288190&amp;si=0870f9c7f2a848a99f8390daa224c3d8&amp;vs=2&amp;au=360&amp;at=close&amp;ut=86fdae9e7a634dd88413bb365e938ad3&amp;hn=ad-engine.ad-engine.2a00e21a&amp;pf=iOS&amp;az=1&amp;sg=daa0da342a2b1d98e7cdd7edde93d370" data-za-module="AdItem">
				<a class="shameimaru-link" href="https://sugar.zhihu.com/track?pr=0&amp;ci=8909&amp;ai=8565&amp;lo=home_up&amp;tu=aHR0cHM6Ly9jbGlja2MuYWRtYXN0ZXIuY29tLmNuL2MvYTk3NjkxLGIyMDc3MDA5LGMxODgzLGkwLG0xMDEsOGExLDhiMixoLHVodHRwczovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vNjc0NDI1MzE%3D&amp;ts=1510388523&amp;lu=41288190&amp;si=0870f9c7f2a848a99f8390daa224c3d8&amp;vs=2&amp;au=360&amp;at=click&amp;ut=86fdae9e7a634dd88413bb365e938ad3&amp;hn=ad-engine.ad-engine.2a00e21a&amp;pf=iOS&amp;az=1&amp;sg=f944878c9a56d7aa8a8f461378284534" target="_blank" rel="nofollow">
					<img src="https://pic4.zhimg.com/v2-f81f57050296ff144a0a8b1a03283973_270x225|adx4.jpg" srcset="https://pic4.zhimg.com/v2-f81f57050296ff144a0a8b1a03283973_540x450|adx4.jpg 2x" alt="">
				</a>
				<meta itemprop="view_url" content="[&quot;https://sugar.zhihu.com/track?pr=0&amp;ci=8909&amp;ai=8565&amp;lo=home_up&amp;tu=&amp;ts=1510388523&amp;lu=41288190&amp;si=0870f9c7f2a848a99f8390daa224c3d8&amp;vs=2&amp;au=360&amp;at=view&amp;ut=86fdae9e7a634dd88413bb365e938ad3&amp;hn=ad-engine.ad-engine.2a00e21a&amp;pf=iOS&amp;az=1&amp;sg=ade93e0da5864f858f5a3a6f529afa36&quot;]">
				<a class="shameimaru-close z-ico-shameimaru-close" data-tooltip="s$b$不再显示" rel="nofollow"></a>

				<img class="shameimaru-pixel" src="https://sugar.zhihu.com/track?pr=0&amp;ci=8909&amp;ai=8565&amp;lo=home_up&amp;tu=&amp;ts=1510388523&amp;lu=41288190&amp;si=0870f9c7f2a848a99f8390daa224c3d8&amp;vs=2&amp;au=360&amp;at=impression&amp;ut=86fdae9e7a634dd88413bb365e938ad3&amp;hn=ad-engine.ad-engine.2a00e21a&amp;pf=iOS&amp;az=1&amp;sg=eaecd1e831f226d8ac642c8b6d10df3b">

				<img class="shameimaru-pixel" src="https://v.admaster.com.cn/i/a97691,b2077009,c1883,i0,m202,8a1,8b2,h">

			</div>

			<div class="zm-side-section">
				<div class="zm-side-section-inner">
					<div class="zm-side-nav-group">
						<ul class="zm-side-nav" id="zg-sidebar-nav">

							<li class="zm-side-nav-li">
								<a class="zm-side-nav-link" href="/collections" data-za-c="collection" data-za-l="sidebar_collections" data-za-a="visit_collections">
									<i class="zg-icon zg-icon-sidenav-fav"></i> 我的收藏

								</a>
							</li>

							<li class="zm-side-nav-li">
								<a class="zm-side-nav-link" href="/question/following">
									<i class="zg-icon zg-icon-sidenav-follow"></i> 我关注的问题
								</a>
							</li>
							<li class="zm-side-nav-li">
								<a class="zm-side-nav-link" href="/question/invited">
									<i class="zg-icon zg-icon-sidenav-invite"></i> 邀请我回答的问题

								</a>
							</li>

						</ul>
					</div>
					<div class="zm-side-nav-group">
						<ul class="zm-side-nav">

							<li class="zm-side-nav-li rq3-publiceditlink" id="rq3-sidenav-link">
								<a class="zm-side-nav-link" href="/watch">
									<i class="zg-icon zg-icon-sidenav-publicedit"></i> 公共编辑动态
									<span class="zg-num hidden">0</span>
								</a>
							</li>

							<li class="zm-side-nav-li">
								<a class="zm-side-nav-link z-ico-container" href="/community">
									<i class="z-ico-community"></i> 社区服务中心
								</a>
							</li>

							<li class="zm-side-nav-li">
								<a class="zm-side-nav-link z-ico-container" href="/copyright">
									<i class="zg-icon icon icon-copyright"></i> 版权服务中心
								</a>
							</li>

						</ul>
					</div>

				</div>
			</div>
			<div class="SidebarSection SidebarListNav zm-side-my-columns">
				<h3>知乎专栏</h3>

				<ul class="column-homepage zm-side-nav column-empty">
					<li class="zm-side-nav-li">
						<a class="column-homepage-link column-link zm-side-nav-link" href="http://zhuanlan.zhihu.com/" target="_blank">
							<i class="icon-column-logo sprite-sidebar-icon-column-normal icon-column-logo-active"></i>
							<span class="name">专栏・发现</span>
						</a>
					</li>
				</ul>
				<ul class="zm-side-nav column-list">

				</ul>
				 
				<ul class="zm-side-nav">

				</ul>
			</div>
			<div class="SidebarSection SidebarListNav SidebarListNav--noFollowLink">
				<h3><a href="https://www.zhihu.com/lives" class="SidebarListNav-sideLink Link--light" target="_blank">查看全部 »</a>知乎 Live ⚡️</h3>
				<ul class="SidebarListNav-list">

					<li class="SidebarListNav-listItem">
						<a class="SidebarListNav-itemLink" href="https://www.zhihu.com/lives/909427194718220288" target="_blank">
							<img class="Avatar SidebarListNav-avatar" src="https://pic1.zhimg.com/v2-ff916989d92258880158780879b3e440_s.png"   >
							<span class="SidebarListNav-label">
如何短时间内在核心期刊发表论文
</span>
						</a>
					</li>

					<li class="SidebarListNav-listItem">
						<a class="SidebarListNav-itemLink" href="https://www.zhihu.com/lives/904724539420868608" target="_blank">
							<img class="Avatar SidebarListNav-avatar" src="https://pic1.zhimg.com/v2-ff916989d92258880158780879b3e440_s.png"   >
							<span class="SidebarListNav-label">
2017IPO否决案例总结分析
</span>
						</a>
					</li>

					<li class="SidebarListNav-listItem">
						<a class="SidebarListNav-itemLink" href="https://www.zhihu.com/lives/906533296173875200" target="_blank">
							<img class="Avatar SidebarListNav-avatar" src="https://pic1.zhimg.com/v2-ff916989d92258880158780879b3e440_s.png"    >
							<span class="SidebarListNav-label">
聊聊日本理工科大学院：消除信息不对称
</span>
						</a>
					</li>

				</ul>
			</div>
			<div class="SidebarSection SidebarListNav js-sidebarRoundtable">
				<h3><a href="/roundtable" class="SidebarListNav-sideLink Link--light">查看全部 »</a>知乎圆桌</h3>
				<ul class="SidebarListNav-list">

					<li class="SidebarListNav-listItem">

						<a data-follow="rt:link" class="follow-link zg-follow meta-item" href="javascript:;" id="sfb-zengji"><i class="z-icon-follow"></i>关注圆桌</a>

						<a class="SidebarListNav-itemLink" href="/roundtable/zengji">
							<img class="Avatar SidebarListNav-avatar" src="https://pic1.zhimg.com/v2-ff916989d92258880158780879b3e440_s.png"    data-hovercard="r$b$zengji">
							<span class="SidebarListNav-label" data-hovercard="r$b$zengji">
增肌训练指南
</span>

							<span class="SidebarListNav-hint SidebarListNav-hint--hoverHidden">还有 6 天结束</span>

						</a>
					</li>

					<li class="SidebarListNav-listItem">

						<a class="SidebarListNav-itemLink" href="/roundtable/shineikongqi">
							<img class="Avatar SidebarListNav-avatar" src="https://pic1.zhimg.com/v2-ff916989d92258880158780879b3e440_s.png"   data-hovercard="r$b$shineikongqi">
							<span class="SidebarListNav-label" data-hovercard="r$b$shineikongqi">
拯救室内空气
</span>

						</a>
					</li>

					<li class="SidebarListNav-listItem">

						<a class="SidebarListNav-itemLink" href="/roundtable/wangluowenxue">
							<img class="Avatar SidebarListNav-avatar" src="https://pic1.zhimg.com/v2-ff916989d92258880158780879b3e440_s.png"  alt="网络文学风云录" data-hovercard="r$b$wangluowenxue">
							<span class="SidebarListNav-label" data-hovercard="r$b$wangluowenxue">
网络文学风云录
</span>

						</a>
					</li>

				</ul>
			</div>
			<div class="SidebarSection SidebarListNav">
				<h3><a href="/pub/" class="SidebarListNav-sideLink Link--light" target="_blank">查看全部 »</a>知乎书店</h3>
				<ul class="SidebarListNav-list">

					<li class="SidebarListNav-listItem">
						<a class="SidebarListNav-itemLink" href="/publications/weekly/119557774" target="_blank">
							<img class="Avatar SidebarListNav-avatar" src="https://static.zhihu.com/static/revved/img/ebooks/weekly.65279d61.png"  >
							<span class="SidebarListNav-label">
年轻人的忽视与焦虑：健康餐桌的 15 个秘密
</span>

						</a>
					</li>

					<li class="SidebarListNav-listItem">
						<a class="SidebarListNav-itemLink" href="/publications/hour/119557976" target="_blank">
							<img class="Avatar SidebarListNav-avatar" src="https://static.zhihu.com/static/revved/img/ebooks/hour.3d371c99.png"  >
							<span class="SidebarListNav-label">
法语有意思：从入门到不放弃
</span>

						</a>
					</li>

					<li class="SidebarListNav-listItem">
						<a class="SidebarListNav-itemLink" href="/publications/nacl/119554120" target="_blank">
							<img class="Avatar SidebarListNav-avatar" src="https://static.zhihu.com/static/revved/img/ebooks/nacl.656ec1c4.png"  >
							<span class="SidebarListNav-label">
刑事辩护指导书
</span>

						</a>
					</li>

				</ul>
			</div>
			<div class="SidebarSection SidebarListNav">
				<ul class="SidebarListNav-list">
					<li class="SidebarListNav-listItem">
						<a class="SidebarListNav-itemLink DownloadApp-link" href="#">
							<i class="SidebarListNav-avatar sprite-sidebar-icon-zhi"></i>
							<span class="SidebarListNav-label">
下载 App
</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	
	</div>
 
</template>

<script>
	export default {
		data() {
			return {
				arr: [],
				bool:true,
				text:"更多"
				 
			}
		},
	 
		methods: {
			load: function() {
				var self = this;
				self.bool = false;
				self.text = "加载中";
				$.ajax({
					url: "../json/index.json",
					type: "GET",
					dataType: "json",
					success: function(data) {
						setTimeout(function(){
							self.bool=true;
							self.text = "更多";
							self.arr = self.arr.concat(data);
							console.log(self.arr);
						}, 1000)
						
					}
				})
			}
		},
		mounted() {
			this.load();
		}
	}
</script>

<style scoped>
	.feed-item {
		border-top: 1px solid #eee;
	}
	.spinner-gray{
		background: url(../image/1392662635751_1140x0.gif) no-repeat;
	}
	 
</style>