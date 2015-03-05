//滚动条美化
$(".chat-left,.smiliesList").niceScroll({  
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
	$(this).addClass('hover').siblings().removeClass('hover');	//设置点击后的背景颜色
	$('.chatHeight').empty();	//清除聊天
	$('.chat_editor').fadeIn("300"); //textarea出现
	$('.avatarIcon').fadeIn("300"); //详情icon出现
	$('.boxBg').empty(); //清除上次好友详情
	var id = $(this).find('.avatarID').html();	//获取好友列表中的ID
	$(".inputArea textarea").focus();	//获取输入框焦点
	//ajax拉去好友详情信息
	$.ajax({
		async : false,
		type:'get',
		url:'userInfro.json',
		data: {"id":id},
		xhrFields: {
			withCredentials: true
		},
		processData: true,
		success: function(data){
			var AvatarInfroTemplate = Handlebars.compile($("#avatarInfro").html());
			Handlebars.registerHelper("compare",function(v1,v2,options){
				if(v1==v2){
					return options.fn(this);
				}else{
					return options.inverse(this);
				}
			});
			$('.boxBg').append(AvatarInfroTemplate(data));
			$('.boxClose a').on('click',function(){
				$('.boxBg').fadeOut("300");

			});
		},
		error: function(a,b,c){
			alert('好友详情加载失败');
		}
	});
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
$('.avatarIcon a').on('click',function(e){
	$('.boxBg').fadeToggle("300");
	e.stopPropagation();
});
//点击表情
$('.hotSmilies li').on('click',function(){
	$(".inputArea textarea").focus();	//获取输入框焦点
	$(".inputArea textarea").val($(".inputArea textarea").val() + $(this).find('.emoji').attr("alt"));
	twemoji.parse(document.getElementsByTagName('textarea')[0].value, {size: 36});
})

//发送消息
$(".inputArea textarea").ctrlEnter("button", function () {
	webchat.addMessageDemo();
	$('.inputArea textarea').val('');
	$('.chatContainer').scrollTop($('.chatHeight').height());
	twemoji.parse(document.getElementsByTagName('body')[0], {size: 36});
});
var onMessageSend = function(chatMessage) {
	webchat.addMessageDemo();
	$('.inputArea textarea').val('');
	$('.chatContainer').scrollTop($('.chatHeight').height());
	twemoji.parse(document.getElementsByTagName('body')[0], {size: 36});
}
var myNotificationListener = {
	onMessageReceived: function (chatMessage) {
		var newChatMessage = chatMessage['text'].replace(/\n/g, '_@').replace(/\r/g, '_#');
			newChatMessage = newChatMessage.replace(/_#_@/g, '<br/>');//IE7-8
			newChatMessage = newChatMessage.replace(/_@/g, '<br/>');//IE9、FF、chrome
		if($.trim(chatMessage['text']) == ''){
		}else{
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
				MeMessageReceived += '<div class="cloudBody">' +newChatMessage+ '</div>'
				MeMessageReceived += '<div class="cloudArrow"></div>'
				MeMessageReceived += '</div>'
				MeMessageReceived += '</div>'
				MeMessageReceived += '</div>'
				MeMessageReceived += '</div>'
			$('.chatHeight').append(MeMessageReceived);
		}
	},
	onTextSending: function (ChatMessage) {

	},
	onTextSendSuccess: function (ChatMessage) {

	},
	onNetworkConnected: function () {
	},
	onNetWorkDisconnect: function () {

	}
}
webchat.init("xmpp.dface.cn", 5000, "webchat");
webchat.setAccount("zhang3", "123456");
webchat.setNotificationListener(myNotificationListener);
webchat.connect();
