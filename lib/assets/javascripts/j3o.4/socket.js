/**
 * Created by doooby on 22.3.15.
 */

J3O.define('socket', (function(){
    var api = {};
    var interface = null;
    var socket = new WebSocket("ws://" + window.document.location.host + "/");
    socket.onmessage = on_message;

    function wait_for_connection(count_out, callback) {
        if (this.ws.readyState===1) callback();
        else {
            if (count_out > 0) {
                count_out -= 1;
                setTimeout(function () {wait_for_connection(count_out, callback);}, 100);
            } else throw 'Connection not established in time.';
        }
    }

    function on_message(msg) {
        var data = JSON.parse(msg.data);
        //from, msg, id
    }

    function send_message(msg, id, to) {
        var data = {id: id, msg: msg};
        if (to) data['to'] = to;
        socket.send(JSON.stringify(data));
    }

    Object.defineProperties(api, {

        attachInterface: function(i, done_calback) {




            wait_for_connection(30, done_calback);

        }

    });

    Object.freeze(api);
    return api;
}()));