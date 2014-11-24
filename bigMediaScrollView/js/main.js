$(function(){

// $('#video2').pause();

/* DIV VIEW RESIZE  */
function resizeBgView(){
	var hgt = $(window).height();
	var wid = $(window).width();
	if( wid > 1070) {
		$('.bg-item').css({ 'width': wid+'px' });
	}else{
		$('.bg-item').css({ 'width':'100%' });
	}
	
	$('body, #backgroundView, #menu, .bg-item, .bg-item .image, .scrollview, .scrollview-item, .scrollview-moviebox').css({ 'height': hgt+'px' });
}
resizeBgView();
/* MAKE IT RESPONSIVE */
$(window).resize(function(){ resizeBgView(); });

/* CHANGE BG FUNCTION */
function changeBg(lastBg,toBg,lastBgType,toBgType){
	// CHANGE BACKGROUND WHEN LASTBG IS DIFFERENT FROM TARGET
	if( toBg !== lastBg ){
		$(toBg).animate({ 'opacity':1 }, 1000).addClass('active').siblings().css({ 'opacity':0 }, 1000).removeClass('active');
		/*  IF BOTH LASTBG & TARGET BG TYPE IS VIDEO */
		if( toBgType == 'video'){
			$('.bg-item .video').trigger('pause');
			$(toBg+' .video').trigger('play');
		}
	}
};

/* CHANGE BACKGROUND WHEN CLICK */
$('.menu-items li').click(function(){
	var lastBg = '#' + $('.bg-item.active').attr('id');
	var toBg = $(this).data('bg');
	var lastBgType = $('.bg-item.active video').length;
	var toBgType = $(this).data('bgtype');
	changeBg(lastBg,toBg,lastBgType,toBgType);
	return false;
});

/* AUDIO CONTROL */
// CHANGE ICON AND MUTE AUDIO WHEN CLICK ON THE BUTTON
$('#audioBtn').click(function(){
	if( !$(this).hasClass('muted') ){
		$('.video').prop('muted', true);
		$(this).addClass('muted');
	}else{
		$('.video').prop('muted', false);
		$(this).removeClass('muted');
	}
	return false;
});

/* MENU ACTION */
$('.menu-items > li').click(function(){
	var gotoId = $(this).data('gotoid');
	var gotoIndex = $(gotoId).index();
	var activeIndex = $('.scrollview-item.active').index();
	var times = gotoIndex - activeIndex;
	$(this).addClass('active').siblings().removeClass('active');
	if( times > 0 ){ changeView('next', times); }
	if( times < 0 ){ changeView('prev', Math.abs(times)); }
});

/* SCROLL VIEW */
/* ESSENTIAL MOVING FUNCTION */
function changeView(whichWay, times){
	var hgt = $(window).height();
	var activeIndex = $('.scrollview-item.active').index();
	var itemNum = $('.scrollview-item').length;

	var lastBg = $('.menu-items li.active').data('bg');
	var lastBgType = $('.menu-items li.active').data('bgtype');

	if( whichWay == 'next' && activeIndex < itemNum-1 ) {
		$('.scrollview-container').stop(true,true).animate({ "top": "-=" + hgt*times }, 800);
		$('.scrollview-item.active').removeClass('active');
		$('.scrollview-item.active').find('iframe').css({ 'z-index': 0 })
		$('.scrollview-item').eq(activeIndex+times).addClass('active');
		$('.scrollview-item.active').find('iframe');
	}
	if( whichWay == 'prev' && activeIndex !== 0 ){
		$('.scrollview-container').stop(true,true).animate({ "top": "+=" + hgt*times  }, 800);
		$('.scrollview-item.active').removeClass('active');
		$('.scrollview-item').eq(activeIndex-times).addClass('active');
	}
	
	var $newActiveItem = $('.scrollview-item.active');
	/* CHANGE MENU STATUS */
	var activeIndex = $newActiveItem.index();
	$('.menu-items li').eq(activeIndex).addClass('active').siblings().removeClass('active');
}


$(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
			changeView('prev',1);
			var lastBgIndex = $('.menu-items li.active').index() + 1;
			var lastBg = $('.menu-items li').eq(lastBgIndex).data('bg');
			var lastBgType = $('.menu-items li').eq(lastBgIndex).data('bgtype');
			var toBg = $('.menu-items li.active').data('bg');
			var toBgType = $('.menu-items li.active').data('bgtype');
			changeBg(lastBg,toBg,lastBgType,toBgType);
    }
    else {
      changeView('next',1);
			var lastBgIndex = $('.menu-items li.active').index() - 1;
			var lastBg = $('.menu-items li').eq(lastBgIndex).data('bg');
			var lastBgType = $('.menu-items li').eq(lastBgIndex).data('bgtype');
			var toBg = $('.menu-items li.active').data('bg');
			var toBgType = $('.menu-items li.active').data('bgtype');
			changeBg(lastBg,toBg,lastBgType,toBgType);
    }
});


});