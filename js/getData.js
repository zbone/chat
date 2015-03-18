var getData = {
    AvatarListData:function(){
        $.ajax({
            async : false,
            type:'get',
            url:'http://dface.cn/wapp/customer_service/users?Access-Control-Allow-Origin=1',
            data: {"kfid":kfid},
            xhrFields: {
                withCredentials: true
            },
            processData: true,
            success: function(data){
                $('.loading').fadeOut("100");
                var AvatarTemplate = Handlebars.compile($("#avatar").html());
                Handlebars.registerHelper("compare",function(v1,options){
                    if(v1==''){
                        return options.fn(this);
                    }else{
                        return options.inverse(this);
                    }
                });
                $('.chat-left').append(AvatarTemplate(data));

                for(var i=0;i<data.length;i++){
                    console.log(data[i].id);
                }

            },
            error: function(a,b,c){
                $('.loading').remove();
                $('.chat-left').append('<div class="update"><a href="javascript:location.reload();">重新加载</a></div>');
            }
        });
    },
    AvatarInfroData:function(){
        $.ajax({
            async : false,
            type:'get',
            url:'http://shop.dface.cn/api_user_info/basic?'+'Access-Control-Allow-Origin=1',
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
    },
    HistoryData:function(){
        $.ajax({
            async : false,
            type:'get',
            url:'http://dface.cn/wapp/customer_service/history?'+'Access-Control-Allow-Origin=1',
            data: {"kfid":kfid,"uid":id},
            xhrFields: {
                withCredentials: true
            },
            processData: true,
            success: function(data){
                var chatItemTemplate = Handlebars.compile($("#chatItem").html());
                Handlebars.registerHelper("compare",function(v1,options){
                    if(v1==kfid){
                        return options.fn(this);
                    }else{
                        return options.inverse(this);
                    }
                });
                $('.chatHeight').append(chatItemTemplate(data));
            },
            error: function(a,b,c){
                alert('历史消息获取失败');
            }
        })
    },
    receivedMessageData:function(uid,mid,text){
        $.ajax({
            async : false,
            type:'get',
            url:'http://shop.dface.cn/api_user_info/basic?id='+uid+'&Access-Control-Allow-Origin=1',
            success: function(data){
                var YouMessageReceived = '';
                YouMessageReceived += '<div class="chatItem you">'
                YouMessageReceived += '<div class="time">'+ nowTime +'</div>'
                YouMessageReceived += '<div class="chatItemContent">'
                YouMessageReceived += '<div class="avatar-head">'
                YouMessageReceived += '<a href="#"><img src="'+data.logo_thumb+'"></a>'
                YouMessageReceived += '</div>'
                YouMessageReceived += '<div class="chatCloud">'
                YouMessageReceived += '<h3>'+data.name+'</h3>'
                YouMessageReceived += '<div class="chatCloudText">'
                YouMessageReceived += '<div class="cloudBody">' + text + '</div>'
                YouMessageReceived += '<div class="cloudArrow"></div>'
                YouMessageReceived += '</div>'
                YouMessageReceived += '</div>'
                YouMessageReceived += '</div>'
                YouMessageReceived += '</div>'
                $('.chatHeight').append(YouMessageReceived);
                $('.chatContainer').scrollTop($('.chatHeight').height());
            },
            error: function(a,b,c){
                alert('信息读取失败');
            }
        });
    },
    receivedNewMessageData:function(){

    },
    sendMessageData:function(){
        if($.trim(newChatMessage) == ''){
        }else{
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
                    var _time=data.time;
                    $.ajax({
                        async : false,
                        type:'get',
                        url:'http://shop.dface.cn/api_user_info/basic?'+'Access-Control-Allow-Origin=1',
                        data:{"id":kfid},
                        success:function(data){
                            var MeMessageReceived = '';
                            MeMessageReceived += '<div class="chatItem me">'
                            MeMessageReceived += '<div class="time">'+_time+'</div>'
                            MeMessageReceived += '<div class="chatItemContent">'
                            MeMessageReceived += '<div class="avatar-head">'
                            MeMessageReceived += '<a href="#"><img src="'+data.logo_thumb+'"></a>'
                            MeMessageReceived += '</div>'
                            MeMessageReceived += '<div class="chatCloud">'
                            MeMessageReceived += '<h3>'+data.name+'</h3>'
                            MeMessageReceived += '<div class="chatCloudText">'
                            MeMessageReceived += '<div class="cloudBody">' +newChatMessage+ '</div>'
                            MeMessageReceived += '<div class="cloudArrow"></div>'
                            MeMessageReceived += '</div>'
                            MeMessageReceived += '</div>'
                            MeMessageReceived += '</div>'
                            MeMessageReceived += '</div>'
                            $('.chatHeight').append(MeMessageReceived);
                            console.log('成功');
                        }
                    });
                },
                error: function(a,b,c){
                    console.log('失败');
                }
            });
        }
    }
};
