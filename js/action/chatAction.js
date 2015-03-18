var chatAction = function(){
	$('.avatar').on('click',function(){
		$(this).addClass('hover').siblings().removeClass('hover');
		$('.chatHeight').empty();
		$('.chat_editor').fadeIn("300");
		$('.avatarIcon').fadeIn("300");
		$('.boxBg').empty();
		$(this).find('.unreadDot').empty().hide();
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
	$(".inputArea textarea").ctrlEnter("button", function () {
		webchat.addMessageDemo();
		$('.inputArea textarea').val('');
		$('.chatContainer').scrollTop($('.chatHeight').height());
		twemoji.parse(document.getElementsByTagName('body')[0], {size: 36});
	});
};
var myNotificationListener = {
	onMessageReceived: function (chatMessage) {
		emojiReplace(chatMessage);
		getData.sendMessageData();
	}
};
webchat.setNotificationListener(myNotificationListener);
