var NotificationListener = {
    onMessageReceived: function (ChatMessage) {

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
    connect: function () {

    },
    disconnect: function () {

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
}