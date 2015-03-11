//avatar事件
var avatarAction = {
	getAvatarList:function(){
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
				//alert(data.id);
				var AvatarTemplate = Handlebars.compile($("#avatar").html());
				$('.chat-left').append(AvatarTemplate(data));
			},
			error: function(a,b,c){
				alert('好友列表加载失败');
			}
		});
	},
	clickAvatarList:function(){
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
				url:'http://shop.dface.cn/api_user_info/basic?id='+id+'&Access-Control-Allow-Origin=1',
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
	},
	clickAvatarIcon: function () {
		$('.avatarIcon a').on('click',function(e){
			$('.boxBg').fadeToggle("300");
			e.stopPropagation();
		});
	}
};
//编辑框点击事件
var chatEditorAction = {
	clickSmilies:function(){
		//点击全部表情 显示隐藏
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
		})
	},
	MessageSend:function(){
		//Ctrl+Enter发送消息
		$(".inputArea textarea").ctrlEnter("button", function () {
			webchat.addMessageDemo();
			$('.inputArea textarea').val('');
			$('.chatContainer').scrollTop($('.chatHeight').height());
			twemoji.parse(document.getElementsByTagName('body')[0], {size: 36});
		});
		//button发送消息
		$(".inputArea button").on("click",function(chatMessage){
			webchat.addMessageDemo();
			$('.inputArea textarea').val('');
			$('.chatContainer').scrollTop($('.chatHeight').height());
			twemoji.parse(document.getElementsByTagName('body')[0], {size: 36});
		});
	}
};


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
	onMessage:function(msg){
		var to = msg.getAttribute('to');
		var from = msg.getAttribute('from');
		var type = msg.getAttribute('type');
		var elems = msg.getElementsByTagName('body');
		var uid = from.split("@")[0];
		if (type == "chat" && elems.length > 0) {
			$.ajax({
				async : false,
				type:'get',
				url:'http://shop.dface.cn/api_user_info/basic?id='+uid+'&Access-Control-Allow-Origin=1',
				success: function(data){
					var YouMessageReceived = '';
					YouMessageReceived += '<div class="chatItem you">'
					YouMessageReceived += '<div class="time">12:00</div>'
					YouMessageReceived += '<div class="chatItemContent">'
					YouMessageReceived += '<div class="avatar-head">'
					YouMessageReceived += '<a href="#"><img src="'+data.logo_thumb+'"></a>'
					YouMessageReceived += '</div>'
					YouMessageReceived += '<div class="chatCloud">'
					YouMessageReceived += '<h3>'+data.name+'</h3>'
					YouMessageReceived += '<div class="chatCloudText">'
					YouMessageReceived += '<div class="cloudBody">' + Strophe.getText(elems[0]) + '</div>'
					YouMessageReceived += '<div class="cloudArrow"></div>'
					YouMessageReceived += '</div>'
					YouMessageReceived += '</div>'
					YouMessageReceived += '</div>'
					YouMessageReceived += '</div>'
					$('.chatHeight').append(YouMessageReceived);
				},
				error: function(a,b,c){
					alert('信息读取失败');
				}
			});
		}
		$('.chatContainer').scrollTop($('.chatHeight').height());
		return true;
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
$(document).ready(function () {
	connection = new Strophe.Connection(BOSH_SERVICE);
	connection.connect("546afc5041593103f39d0100" + "@dface.cn", "12b66c87ad7ae05d", webchat.onConnect);
});

