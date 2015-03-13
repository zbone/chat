var BOSH_SERVICE = 'http://shop.dface.cn/http-bind/'
var connection = null;
var MessageStatus = {
    MESSAGE_STATUS__DELIVER_FAILED: 1,
    MESSAGE_STATUS__DELIVERING: 2,
    MESSAGE_STATUS__DELIVERED: 3
}

var MessageType = {
    MESSAGE_TYPE__CHAT_VOICE: 1,
    MESSAGE_TYPE__CHAT_IMAGE: 2,
    MESSAGE_TYPE__CHAT_TEXT: 3
}

var ChatMessage = {
    type: null,
    isPostByMyself: null,
    from: null,
    to: null,
    status: null,
    timeStamp: null,
    packetId: null,
    text: null,
    voiceId: null,
    unread: null,
    imageId: null
}
