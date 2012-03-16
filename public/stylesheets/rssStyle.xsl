<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html"
		doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
		doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" />
	<xsl:variable name="title" select="/rss/channel/title" />
	<xsl:variable name="feedUrl" select="/rss/channel/link" />
	<xsl:variable name="rssUrl" select="concat(/rss/channel/link,'rss')" />
	<xsl:variable name="rssDesc" select="/rss/channel/description" />
	<xsl:variable name="pubDate" select="/rss/channel/pubDate" />
	<xsl:variable name="feedPubDate" select="/rss/channel/item/pubDate" />
	<xsl:variable name="itemFirstAuthor" select="/rss/channel/item/author" />
	<xsl:variable name="managingEditor" select="/rss/channel/managingEditor" />
	<xsl:template match="/">
		<xsl:element name="html">
			<head>
				<title>
					<xsl:value-of select="$title" />
					- rss
				</title>
				<style type="text/css">
					body { background-color:#fff; color:#333; margin: 15px 0 0 17px;
					padding:0; } ul, li, dl, dd { list-style:none; margin:0; padding:0;
					} h1, h2, h3, h4 { padding:0; margin:0; font-size: 100%; } p {
					padding:0; margin:0; } img {border: 0; vertical-align: middle;} a
					{text-decoration:none; color:#4a55a6;} a:link:hover, a:active
					{text-decoration:underline; color:#4a55a6;} #DaumUI__titles *
					{margin:0px; padding:0px; border:0px;} #DaumUI__titles {margin:0px;
					padding:0px; border:0px; clear:both; width:100%; height:39px; }
					#DaumUI__titles li {list-style: none; float: left;} #DaumUI__titles
					a {display: block; text-indent: -9999px; font-size: 0px;}
					#DaumUI__serviceTitle {margin:0px; padding:0px; height: 39px;
					float: left; } #DaumUI__serviceTitle li.DaumUI__li1 a {width: 81px;
					height: 39px; background:
					url("http://i1.daumcdn.net/cafeimg/cf_img2/bbs2/logo_2010.gif")
					no-repeat left top;} #DaumUI__serviceTitle li.DaumUI__li2 a {width:
					119px; height: 24px; background:
					url("http://i1.daumcdn.net/pimg/blog3/etc/rss_view/tistory_logo.gif")
					no-repeat left top;} #wrapRss { margin:0 168px 0 8px; } #wrapRss
					.rssInfo { border: 1px solid #cbd1ff; } #wrapRss .rssInfo .rssDesc
					{ border:#fff solid 1px; background-color: #f7f8fe; padding: 13px;
					height:60px; } #wrapRss .rssInfo .rssDesc img { float: left;
					display:inline; margin-right:19px; } #wrapRss .rssInfo .txt {
					float:left; display:inline; font-family:돋움,dotum,sans-serif; }
					#wrapRss .rssInfo h2 { color:#4a56a8; font-size:16px; } #wrapRss
					.rssInfo .txt1 { font-size:11px; color:#999; padding:13px 0 18px 0;
					} #wrapRss .rssInfo .txt1 a, #wrapRss .rssInfo .txt1 .point {
					color:#4a55a6; } #wrapRss .bar { font-size:11px; color:#ddd;
					padding:0 7px 0 10px; } #wrapRss .author { padding: 0 7px 0 0; }
					#wrapRss .rssInfo .txt2 { font-size:12px; color:#666; } #wrapRss ul
					{ clear: both; } #wrapRss ul li { border-bottom:#ebecf2 solid 1px;
					padding:22px 0 17px 0; } #wrapRss ul li h3 { font-size: 15px;
					font-family:돋움,dotum,sans-serif; font-weight: bold; letter-spacing:
					-1px; padding-left:14px; } #wrapRss ul li h4 { font: 11px 돋움;
					font-weight:normal; } #wrapRss ul li .feedInfo { margin-top: 4px;
					padding-left:14px; font-size:11px; color:#999;
					font-family:돋움,dotum,sans-serif; } #wrapRss ul li .feedContent {
					font-size: 12px; line-height: 14pt; margin: 9px 10px 10px 14px;
					color:#666; font-family:돋움,dotum,sans-serif; } #wrapRss ul li
					.feedContent a { font-weight: normal; text-decoration: underline; }
					#wrapRss ul li .category { clear: both; font: 12px '굴림';
					background:
					url(http://i1.daumcdn.net/icon/2008_guide/rss/rss_tag.gif) 14px 0
					no-repeat; padding-left: 44px; color:#8088c1; } #wrapRssReader {
					position:absolute; right: 17px; top: 54px; width: 128px; border:
					1px solid #e3e3e3; padding: 0px; } #wrapRssReader #wrap {
					border:#fff solid 1px; background-color: #f9f8f8; pading:2px; }
					#wrapRssReader h3 { color:#666; font-size:12px; padding:10px;}
					#wrapRssReader #rssList { border:#f4f4f4 solid 1px;
					background:#fff; text-align:center; } #wrapRssReader #rssList p {
					color:#999; font-size:11px; font-family:돋움,dotum,sans-serif;
					padding:7px; text-align:left; } #wrapRssReader #readerList {
					width:112px; margin:0 auto; } #wrapRssReader #readerList li {
					padding:2px 3px 3px 3px; border-bottom:#f1f1f1 solid 1px; }
					#wrapRssReader #readerList li.tit { padding:0; border:none; }
					#wrapRssReader #readerList li.end { border:none; }
				</style>
				<link rel="alternate" type="application/rss+xml" title="{$title}"
					href="{$rssUrl}" />
				<!-- 자바스크립트 인클루드
				<xsl:element name="script">
					<xsl:attribute name="type">text/javascript</xsl:attribute>
					<xsl:attribute name="src">/script/rssScript.js</xsl:attribute>
				</xsl:element> -->
			</head>
			<xsl:apply-templates select="rss/channel" />
		</xsl:element>
	</xsl:template>
	<xsl:template match="channel">
		<body>
			<div id="DaumUI__titles">
				<ul id="DaumUI__serviceTitle" title="Daum로고/서비스타이틀">
					<li class="DaumUI__li1">
						<a href="http://www.daum.net/" title="Daum 메인페이지로 가기">Daum</a>
					</li>
					<li class="DaumUI__li2">
						<a href="http://www.tistory.com" title="티스토리 - 나만의 상상천국">티스토리</a>
					</li>
				</ul>
			</div>
			<div id="wrapRss">
				<div class="rssInfo">
					<div class="rssDesc">
						<xsl:apply-templates select="image" />
						<dl class="txt">
							<dd>
								<h2>
									<xsl:value-of select="$title" />
								</h2>
							</dd>
							<dd class="txt1">
								<a href="{normalize-space(feedUrl)}" class="n11 c_lightB">
									<xsl:value-of select="$feedUrl" />
								</a>
								<span class="bar">|</span>
								작성자
								<span class="point">
									<xsl:choose>
										<xsl:when test="string-length($managingEditor) > 0">
											<xsl:value-of select="$managingEditor" />
										</xsl:when>
										<xsl:otherwise>
											<xsl:value-of select="$itemFirstAuthor" />
										</xsl:otherwise>
									</xsl:choose>
									님
								</span>
								<span class="bar">|</span>
								최종갱신일
								<span class="point">
									<script type="text/javascript">
										//<![CDATA[ writeLocaleTime("
<xsl:value-of select="$pubDate"/>
", "dot"); //]]>
									</script>
								</span>
							</dd>
							<dd class="txt2">
								<xsl:value-of select="$rssDesc" />
							</dd>
						</dl>
					</div>
				</div>
				<ul>
					<xsl:apply-templates select="item" />
				</ul>
			</div>
			<div id="wrapRssReader">
				<div id="wrap">
					<h3>
						이 블로그를
						<br />
						구독해 보세요!
					</h3>
					<div id="rssList">
						<p>아래의 RSS 구독기를 통하여 이 블로그의 업데이트 정보를 구독하실 수 있습니다.</p>
						<ul id="readerList">
							<li class="tit">
								<a
									href="http://blog.daum.net/_blog/rss/ManagerChannelInsertForm.do?channelUrl={$rssUrl}&channelCheck=true&event=t"
									onclick="window.open(this.href,'daumrssregister','width=540 , height=306, status=no, toolbar=no, menubar=no, location=no, resizable=yes');return false;">
									<img
										src="http://i1.daumcdn.net/cafeimg/cf_img2/bbs2/rss_btn_blog_2010.gif"
										width="112" height="37" alt="Daum블로그로 구독" />
								</a>
							</li>
							<li>
								<a href="http://www.hanrss.com/add_sub.qst?url={$rssUrl}"
									onclick="window.open(this.href);return false;">
									<img src="http://i1.daumcdn.net/icon/2008_guide/rss/rss_btn01.gif"
										width="106" height="24" alt="HanRSS" />
								</a>
							</li>
							<li>
								<a href="http://fusion.google.com/add?feedurl={$rssUrl}"
									onclick="window.open(this.href);return false;">
									<img src="http://i1.daumcdn.net/icon/2008_guide/rss/rss_btn03.gif"
										width="106" height="24" alt="Google" />
								</a>
							</li>
							<li>
								<a href="/rss/xml">
									<img src="http://i1.daumcdn.net/icon/2008_guide/rss/rss_btn04.gif"
										width="106" height="24" alt="RSS" />
								</a>
							</li>
							<li class="end">
								<a href="http://www.bloglines.com/sub/{$rssUrl}" onclick="window.open(this.href);return false;">
									<img src="http://i1.daumcdn.net/icon/2008_guide/rss/rss_btn05.gif"
										width="106" height="24" alt="Bloglines" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</body>
	</xsl:template>
	<xsl:template match="item">
		<li>
			<h3>
				<xsl:choose>
					<xsl:when test="guid[@isPermaLink='true' or not(@isPermaLink)]">
						<a href="{normalize-space(guid)}">
							<xsl:value-of select="title" />
						</a>
					</xsl:when>
					<xsl:when test="link">
						<a href="{normalize-space(link)}">
							<xsl:value-of select="title" />
						</a>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="title" />
					</xsl:otherwise>
				</xsl:choose>
			</h3>
			<p class="feedInfo">
				<script type="text/javascript">
					//<![CDATA[ writeLocaleTime("
<xsl:call-template name="feedPubDate"/>
"); //]]>
				</script>
				<span class="bar">|</span>
				<span class="author">
					<xsl:call-template name="feedAuthor" />
				</span>
				<xsl:choose>
					<xsl:when test="guid[@isPermaLink='true' or not(@isPermaLink)]">
						<a href="{normalize-space(guid)}">[원문보기]</a>
					</xsl:when>
				</xsl:choose>
			</p>
			<div class="feedContent">
				<xsl:call-template name="outputContent" />
				<xsl:if test="count(child::enclosure)=1">
					<p class="mediaenclosure">
						MEDIA ENCLOSURE:
						<a href="{enclosure/@url}">
							<xsl:value-of select="child::enclosure/@url" />
						</a>
					</p>
				</xsl:if>
			</div>
			<div class="category">
				<xsl:apply-templates select="category" />
			</div>
		</li>
	</xsl:template>
	<xsl:template match="image">
		<xsl:choose>
			<xsl:when test="string-length(normalize-space(string(current()/url)))>0">
				<a href="{normalize-space(link)}" title="Link to original website">
					<img src="{url}" id="feedimage" width="75" height="75"
						alt="Link to {title}" />
				</a>
			</xsl:when>
			<xsl:otherwise>
				<img src="http://i1.daumcdn.net/icon/2008_guide/rss/rss_no.gif"
					id="feedimage" width="75" height="75" alt="Link to {title}" />
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text />
	</xsl:template>
	<xsl:template match="category">
		<xsl:value-of select="current()" />
		<xsl:if test="not(position()=last())">
			,
		</xsl:if>
	</xsl:template>
	<xsl:template name="feedPubDate">
		<xsl:value-of select="pubDate" />
	</xsl:template>
	<xsl:template name="feedAuthor">
		<xsl:value-of select="author" />
	</xsl:template>
	<xsl:template name="outputContent">
		<xsl:choose>
			<xsl:when test="description">
				<xsl:value-of select="description"
					disable-output-escaping="yes" />
			</xsl:when>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>