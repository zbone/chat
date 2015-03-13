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
                $('.chat-left').append(AvatarTemplate(data));
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
    }

};
