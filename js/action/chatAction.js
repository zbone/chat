//滚动条美化
$(".chat-left,.chatContainer,.smiliesList").niceScroll({  
	cursorcolor:"#bbb",  
	cursoropacitymax:1,  
	touchbehavior:false,  
	cursorwidth:"10px",  
	cursorborder:"0",  
	cursorborderradius:"5px",
	bouncescroll:true
}); 
//获取好友列表
$.ajax({
	async : false,
	type:'get',
	url:'friend.json',
	data: '',
	xhrFields: {
		withCredentials: true
	},
	processData: true,
	success: function(data){
		var AvatarTemplate = Handlebars.compile($("#avatar").html());
		$('.chat-left').append(AvatarTemplate(data));
	},
	error: function(a,b,c){
		alert('好友列表加载失败');
	}
});

//点击左侧聊天列表
$('.avatar').on('click',function(){
	//设置点击后的背景颜色
	$(this).addClass('hover').siblings().removeClass('hover');
	//清除聊天
	$('.chatContainer').empty();
	//加载聊天
	//$.ajax({
//		async : false,
//		type:'get',
//		url:'',
//		data: '',
//		xhrFields: {
//			withCredentials: true
//		},
//		processData: true,
//		success: function(data){
//			$('.chatContainer').append('加载成功');
//		},
//		error: function(a,b,c){
//			alert('没有加载出来')
//		}
//	});
	
	
});

//点击全部表情 显示隐藏
$('.allBt').on('click',function(e){
	$('.smiliesAll').fadeToggle("300");
	e.stopPropagation();
});
$(document).click(function(){
	$('.smiliesAll').fadeOut("300");
})
//点击人物信息图标 显示隐藏
$('.header a').on('click',function(e){
	$('.boxBg').fadeToggle("300");
	e.stopPropagation();
});
$('.boxClose a').on('click',function(){
	$('.boxBg').fadeOut("300");
});

//发送消息
var onMessageSend = function() {
	if($('.inputArea textarea').val() == ''){
	}else{
		webchat.addMessageDemo();
		$('.inputArea textarea').val('');
	}
	
	$('#ascrail2001 div').css({"height":"1000px"});
}
var myNotificationListener = {
	onMessageReceived: function (chatMessage) {
		var MeMessageReceived = '';
			MeMessageReceived += '<div class="chatItem me">'
			MeMessageReceived += '<div class="time">12:00</div>'
			MeMessageReceived += '<div class="chatItemContent">'
			MeMessageReceived += '<div class="avatar-head">'
			MeMessageReceived += '<a href="#"><img src="images/02.jpg"></a>'
			MeMessageReceived += '</div>'
			MeMessageReceived += '<div class="chatCloud">'
			MeMessageReceived += '<h3>干菜包的小伙伴</h3>'
			MeMessageReceived += '<div class="chatCloudText">'
			MeMessageReceived += '<div class="cloudBody">' +chatMessage['text']+ '</div>'
			MeMessageReceived += '<div class="cloudArrow"></div>'
			MeMessageReceived += '</div>'
			MeMessageReceived += '</div>'
			MeMessageReceived += '</div>'
			MeMessageReceived += '</div>'
		$('.chatContainer').append(MeMessageReceived);
	}
	,
	onTextSending: function (ChatMessage) {

	}
	,
	onTextSendSuccess: function (ChatMessage) {

	}
	,
	onNetworkConnected: function () {
	}
	,
	onNetWorkDisconnect: function () {

	}
}

webchat.init("xmpp.dface.cn", 5000, "webchat");
webchat.setAccount("zhang3", "123456");
webchat.setNotificationListener(myNotificationListener);
webchat.connect();
//$('.inputArea button').on('click',function(e){
//	$('.chatContainer').append($('.inputArea textarea').val());
//	$('.inputArea textarea').val('');
//	$.ajax({
//		async : false,
//		type:'get',
//		url:'',
//		data: '',
//		xhrFields: {
//			withCredentials: true
//		},
//		processData: true,
//		success: function(data){
//			var MeTemplate = Handlebars.compile($("#me").html());
//			$('.chatContainer').append(MeTemplate(data));
//		},
//		error: function(a,b,c){
//			alert('发送失败')
//		}
//	});
//});