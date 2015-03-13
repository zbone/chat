var chatAction = function(){
	$('.avatar').on('click',function(){
		$(this).addClass('hover').siblings().removeClass('hover');
		$('.chatHeight').empty();
		$('.chat_editor').fadeIn("300");
		$('.avatarIcon').fadeIn("300");
		$('.boxBg').empty();
		$('.unreadDot').remove();
		id = $(this).find('.avatarID').html();
		$(".inputArea textarea").focus();
		getData.AvatarInfroData();	//获取好友详细信息
		getData.HistoryData();	//获取历史消息
		$('.chatContainer').scrollTop($('.chatHeight').height());
	});
	$('.avatarIcon a').on('click',function(e){
		$('.boxBg').fadeToggle("300");
		e.stopPropagation();
	});
	$('.allBt').on('click',function(e){
		$('.smiliesAll').fadeToggle("300");
		e.stopPropagation();
	});
	$(document).click(function(){
		$('.smiliesAll').fadeOut("300");
	});
	//点击表情
	var str;
	$('.hotSmilies li').on('click',function(){
		$(".inputArea textarea").focus();	//获取输入框焦点
		$(".inputArea textarea").val($(".inputArea textarea").val() + '[' + $(this).attr("title") + ']');
		twemoji.parse(document.getElementsByTagName('body')[0], {size: 36});
	});
	//button发送消息
	$(".inputArea button").on("click",function(chatMessage){
		webchat.addMessageDemo();
		$('.inputArea textarea').val('');
		$('.chatContainer').scrollTop($('.chatHeight').height());
		twemoji.parse(document.getElementsByTagName('body')[0], {size: 36});
	});
};
$(".inputArea textarea").ctrlEnter("button", function () {
	webchat.addMessageDemo();
	$('.inputArea textarea').val('');
	$('.chatContainer').scrollTop($('.chatHeight').height());
	twemoji.parse(document.getElementsByTagName('body')[0], {size: 36});
});
var myNotificationListener = {
	onMessageReceived: function (chatMessage) {
		var newChatMessage = chatMessage['text'].replace(/\n/g, '_@').replace(/\r/g, '_#');
		newChatMessage = newChatMessage.replace(/_#_@/g, '<br/>');//IE7-8
		newChatMessage = newChatMessage.replace(/_@/g, '<br/>');//IE9、FF、chrome
		newChatMessage = newChatMessage.replace(/\[哭脸\]/g, '&#x1F602;');
		newChatMessage = newChatMessage.replace(/\[笑脸\]/g, '&#x1F601;');
		newChatMessage = newChatMessage.replace(/\[哭脸\]/g, '&#x1F602;');
		newChatMessage = newChatMessage.replace(/\[脸1\]/g, '&#x1F603;');
		newChatMessage = newChatMessage.replace(/\[脸2\]/g, '&#x1F604;');
		newChatMessage = newChatMessage.replace(/\[脸3\]/g, '&#x1F605;');
		newChatMessage = newChatMessage.replace(/\[脸4\]/g, '&#x1F606;');
		newChatMessage = newChatMessage.replace(/\[脸5\]/g, '&#x1F607;');
		newChatMessage = newChatMessage.replace(/\[脸6\]/g, '&#x1F608;');
		newChatMessage = newChatMessage.replace(/\[脸7\]/g, '&#x1F609;');
		newChatMessage = newChatMessage.replace(/\[脸8\]/g, '&#x1F60A;');
		newChatMessage = newChatMessage.replace(/\[脸9\]/g, '&#x1F60B;');
		newChatMessage = newChatMessage.replace(/\[脸10\]/g, '&#x1F60C;');
		newChatMessage = newChatMessage.replace(/\[脸11\]/g, '&#x1F60D;');
		newChatMessage = newChatMessage.replace(/\[脸12\]/g, '&#x1F60E;');
		newChatMessage = newChatMessage.replace(/\[脸13\]/g, '&#x1F60F;');
		newChatMessage = newChatMessage.replace(/\[脸14\]/g, '&#x1F610;');
		newChatMessage = newChatMessage.replace(/\[脸15\]/g, '&#x1F611;');
		$.ajax({
			async : false,
			type:'get',
			url:'http://dface.cn/wapp/customer_service/chat?'+'Access-Control-Allow-Origin=1',
			data: {"from_uid":kfid,"to_uid":id,"msg":newChatMessage},
			xhrFields: {
				withCredentials: true
			},
			processData: true,
			success: function(data){
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
				console.log('成功');
			},
			error: function(a,b,c){
				console.log('失败');
			}
		});

	},
	onTextSending: function (ChatMessage) {

	},
	onTextSendSuccess: function (ChatMessage) {

	},
	onNetworkConnected: function () {
	},
	onNetWorkDisconnect: function () {

	}
};
webchat.init("xmpp.dface.cn", 5000, "webchat");
webchat.setAccount("zhang3", "123456");
webchat.setNotificationListener(myNotificationListener);
