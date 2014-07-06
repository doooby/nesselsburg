//= require_self
//= require_directory

var SelfChat = {};
SelfChat.chaty = [];

$( document ).ready(function(){

    $('.self_chat').each(function(i, el){
        SelfChat.chaty.push(new SelfChat.Chat(el));
    });
});


