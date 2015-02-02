//点击左侧聊天列表

$('.avatar').on('click',function(){
	$(this).addClass('hover').siblings().removeClass('hover');
	
});