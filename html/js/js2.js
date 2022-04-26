body{margin:0px;}
		.logo_bar{
		width:0px;
		height:0px;
		background-color:#f0f0f0;
		margin:0 auto;
		}
		.menu,.menu_pos{
		width：0px;
		height:0px;
		margin:0 auto;
		background-color:gold;
		text-align:center;
		line-height:50px;
		}
		.menu_pos{
		display:none;
		}
		.down_con{
		width:0px;
		height:0px;
		margin:0 auto;
		}
		.down_con p{
		margin-top:0px;
		text-align:center;
		}
		.totop{
		width:0px;
		height:0px;
		background:url(images/up.png) center center no-repeat #000;
		border-radius:50%;
		position:fixed;
		right:0px;
		bottom:0px;
		display: none;
		}
		</style>
		<script type="text/javascript" src="../js/jquery-1.12.4.min.js"></script>
		<script type="text/javascript">
		$(function(){
		$(window).scroll(function() {
		//获取页面滚动时，超出浏览器窗口上方的高度
		var nowTop = $(document).scrollTop();
		// console.log(nowTop);
		if(nowTop > 200){
		//将菜单置顶显示
		$('.menu').css({
		position: 'fixed',
		marginTop: '150',
		marginLeft: '50px',
		});
		//显示占位层，避免页面跳动
		$('.menu_pos').show();
		}else{
		//取消置顶菜单，菜单归入文档流
		$('.menu').css({
		position: 'static',//取消定位
		marginLeft: 'auto'
		});
		//隐藏点位层
		$('.menu_pos').hide();
		}
		//滚动到顶部按钮的显示和隐藏
		if(nowTop > 400){
		$('.totop').fadeIn();
		}else{
		$('.totop').fadeOut();
		}
		});
		//动画的方式滚动到页面顶部
		$('.totop').click(function() {
		$('html,body').animate({scrollTop: 0});
		});
		})