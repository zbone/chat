var BOSH_SERVICE = 'http://shop.dface.cn/http-bind/'
var connection = null;
var webchat = {
    _listener: null,
    _chatMap: null,
    setAccount: function (userName, userPassword) {

    },
    init: function (host, port, serverName) {
        this._chatMap = new Map();
    },
    setNotificationListener: function (listener) {
        this._listener = listener;
    },
    chatToUserText: function (uid, text) {

    },
    chatToUserTextAgain: function (packetId, uid, text) {
    },
    getMessageArray : function(uid) {
       return this._chatMap.get(uid);
    },
    onConnect: function (status) {
        if (status == Strophe.Status.CONNECTING) {
        } else if (status == Strophe.Status.CONNFAIL) {
        } else if (status == Strophe.Status.DISCONNECTING) {
        } else if (status == Strophe.Status.DISCONNECTED) {
        } else if (status == Strophe.Status.CONNECTED) {
            connection.addHandler(webchat.onMessage, null, 'message', null, null,  null);
            connection.send($pres().tree());
        }
    },
    onMessage:function(msg){
        var chatJson = {};
        var to = msg.getAttribute('to');
        var from = msg.getAttribute('from');
        var type = msg.getAttribute('type');
        var elems = msg.getElementsByTagName('body');
        var uid = from.split("@")[0];
        var mid = msg.getAttribute('id');

        if (type == "chat" && elems.length > 0) {

            $.ajax({
                async : false,
                type:'get',
                url:'http://shop.dface.cn/api_user_info/basic?id='+uid+'&Access-Control-Allow-Origin=1',
                success: function(data){
                   /* $.get('http://dface.cn/wapp/customer_service/talk?Access-Control-Allow-Origin=1',{"kfid":kfid,"uid":uid,"mid":mid},function(){
                    })*/
                    console.log(Strophe.getText(elems[0]))
                },
                error: function(a,b,c){
                    alert('信息读取失败');
                }
            });
        }
        console.log(Strophe.getText(elems[0]));
        return true;
    },
    addMessageDemo: function () {
        var chatMessage = new Array();
        chatMessage['from'] = "张三";
        chatMessage['to'] = "我";
        chatMessage['isPostByMyself'] = true;
        chatMessage['MessageStatus'] = MessageStatus.MESSAGE_STATUS__DELIVERED;
        chatMessage['packetId'] = "123456";
        chatMessage['text'] = $('.inputArea textarea').val();
        chatMessage['timeStamp'] = new Date();
        chatMessage['unread'] = true;
        chatMessage['type'] = MessageType.MESSAGE_TYPE__CHAT_TEXT;

        if (this._chatMap[chatMessage['from']] == null) {
            this._chatMap.put(chatMessage['from'], new Array());
        }

        var array = this._chatMap.get(chatMessage['from']);
        array.push(chatMessage['text']);

        this._listener.onMessageReceived(chatMessage);
    }
};
