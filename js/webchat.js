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
        var to = msg.getAttribute('to');
        var from = msg.getAttribute('from');
        var type = msg.getAttribute('type');
        var elems = msg.getElementsByTagName('body');
        var text = Strophe.getText(elems[0]);
        var uid = from.split("@")[0];
        var mid = msg.getAttribute('id');
        var avatarId = new Array();
        avatarId['uid'] = uid;
        avatarId['text'] = Strophe.getText(elems[0]);
        if(id == avatarId['uid']){
            if (type == "chat" && elems.length > 0) {
                getData.receivedMessageData(uid,mid,text);
            }
        }else{
            console.log('XXXX来了一条消息');
        }
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

        /*if (this._chatMap[chatMessage['from']] == null) {
            this._chatMap.put(chatMessage['from'], new Array());
        }

        var array = this._chatMap.get(chatMessage['from']);
        array.push(chatMessage['text']);*/

        this._listener.onMessageReceived(chatMessage);
    }
};
