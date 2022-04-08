// 主题切换
class ThemeToggle{
	constructor(){
		let oThemeBtn = document.querySelectorAll('.theme-toggle');//六款壁纸
		let themeMode1Btn = document.querySelector('.theme-mode1-toggle');//电脑白天模式
		let themeMode2Btn = document.querySelector('.theme-mode2-toggle');//电脑夜间模式
		let themeMode3Btn = document.querySelector('.theme-mode3-toggle');//手机白天模式
		let themeMode4Btn = document.querySelector('.theme-mode4-toggle');//手机夜间模式
		for(let item of oThemeBtn){
			item.onclick = changeWallpaper;
		}
		themeMode1Btn.onclick = dayToggle;
		themeMode2Btn.onclick = nightToggle;
		themeMode3Btn.onclick = dayToggle;
		themeMode4Btn.onclick = nightToggle;
		function dayToggle(){
			document.body.style.background = 'none';
			document.body.style.opacity = '1';
			localStorage.setItem('bodyImg','');
		}
		function nightToggle(){
			document.body.style.background = 'rgba(0,0,0,0.8)';
			document.body.style.opacity = '0.8';
			localStorage.setItem('bodyImg','night');
		}
		function changeWallpaper(){
			let bgImg = this.getAttribute('data-bgimg');
			document.body.style.opacity = '1';
			localStorage.setItem('bodyImg',bgImg);
			document.body.style.background = `url(${bgImg})`;
		}
	}
	static getTheme(){
		//主题切换类
		let bodyImg = localStorage.getItem('bodyImg');
		let imgReg = /images/i;
		if(imgReg.test(bodyImg)){
			document.body.style.opacity = '1';
			document.body.style.background = `url(${bodyImg})`;
		}else if(bodyImg == 'night'){
			document.body.style.background = 'rgba(0,0,0,0.8)';
			document.body.style.opacity = '0.8';
		}else{
			document.body.style.opacity = '1';
			document.body.style.background = 'none';
		}
	}
}
// 吸顶导航+返回顶部
class TopMenu{
	constructor(){
		let menuTop = document.querySelector('.header-bottom').offsetTop;
		let menuFlag = getStyleAttr(document.querySelector('.header-bottom'),'display');//检测此处的菜单是否存在(兼容响应式)
		window.onscroll = function(){
			let pageY = getPageScroll().y;
			if(pageY > 300){
				$('.am-gotop-default').css('display','block');
			}else{
				$('.am-gotop-default').css('display','none');
			}
			if(menuFlag === 'block'){
				if(pageY >= menuTop){
					$('.header-nav').css({
						"position":'absolute',
						"left" : '50%',
						"transform":"translateX(-50%)"
					})
					$(".menu-text").css({"color":"#444"});
					$('.header-bottom').css({
						"position":"fixed",
						"marginTop":"0",
						"background":"#fff",
						"top":'0',
						"left":'0',
						"box-shadow":'0 2px 15px #999'
						})
					$(".menu-logo").css("opacity",1);
				}else{
					$(".menu-text").css({"color":"#fff"});
					$('.header-bottom').css({
						"position":"relative",
						"marginTop":"20px",
						"background":"none",
						"top":'0',
						"left":'0',
						"box-shadow":'none'
					})
					$(".menu-logo").css("opacity",0);
				}	
			}
		}
	}
}
// 鼠标点击文字上浮
class Fly{
	constructor(){
		this.arr = ['富强','民主','文明','和谐','自由','平等','公正','法治','爱国','敬业','诚信','友善'];
		this.colorArr = ['#e74c3c','#27ae60','#3498db','#8e44ad','#9980FA'];
		document.body.onclick = (event)=>{
			event = event || window.event;
			this.animate = null;
			let oSpan = document.createElement('sapn');
			oSpan.style.position = 'absolute';
			oSpan.style.zIndex = 9999;
			oSpan.style.fontWeight = 'bold';
			oSpan.style.fontSize = '18px';
			oSpan.style.userSelect = 'none';
			oSpan.innerText = this.arr[0];
			oSpan.style.color = this.colorArr[0];
			this.arr.push(this.arr.shift());
			this.colorArr.push(this.colorArr.shift());
			oSpan.style.left = event.pageX + 'px';
			oSpan.style.top = event.pageY + 'px';
			document.body.appendChild(oSpan);
			this.animate = anime({
				targets : oSpan,
				top : (oSpan.offsetTop - 200),
				opacity : 0,
				duration : 1000,
				easing : 'linear',
				complete : function(){
					oSpan.parentNode.removeChild(oSpan);
				}
			})
		};
	}
}

/* 
	Load加载指定页面方法函数，调用时传入一个数组
	数组中包含的内容有：['index', 'about', 'article']
	例如传入['index', 'about']代表启用index.html，about.html页面中所有的功能
 */
class Load{
	constructor(pages = []) {
		for (let page of pages) {
			this[page]()
		}
	}
	// index.html依赖的js
	index(){
		// 头像小弹框
		$('.user-logo').click(function(){
			layer.tips('这个人很懒,大部分时间都用来打代码了~', this,{
				anim: 4
			});
		})
		// 鼠标点击文字上浮
		let fly = new Fly();
		// 吸顶导航+返回顶部
		let topMenu = new TopMenu();
		// 主题切换
		let themeToggle = new ThemeToggle();
		ThemeToggle.getTheme();
	}
	// about.html依赖的js
	about(){
		this.index();
		//初始化Swiper
		let swiper = new Swiper('.swiper-container', {
		  slidesPerView: 3,
		  spaceBetween: 30,
		  autoplay: {
			delay: 5500,
			disableOnInteraction: false,//应该是点击以后还能自动播放
		  },
		  initialSlide :1,//从第二张开始
		  pagination: {
			el: '.swiper-pagination',
				clickable: true,
				dynamicBullets: true
			 },
		});
		let wow = new WOW({
		  boxClass: 'wow',
		  animateClass: 'animated',
		  offset: 0,
		  mobile: true,
		  live: true
		});
		wow.init();
	}
	// article.html依赖的js
	article(){
		this.index();
		var wow = new WOW({
		  boxClass: 'wow',
		  animateClass: 'animated',
		  offset: 0,
		  mobile: true,
		  live: true
		});
		wow.init();
		document.createElement('blockquote');
		layui.use('code', function () {
		  layui.code({
			elem: 'pre',
			about: false
		  });
		});
	}
}