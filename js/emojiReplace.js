var newChatMessage;
var emojiReplace = function(chatMessage){
    newChatMessage = chatMessage['text'].replace(/\n/g, '_@').replace(/\r/g, '_#');
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
};