/**
 * Created by doooby on 26.2.15.
 */

J3O.struct('socket_interface', function (app) {
    var socket = new S3ocket();
    var connected = false;
    var waiting_for = null;
    var playing_with = null;

    Object.defineProperty(this.object, 'playing_with', {get: function(){return playing_with;}, enumerable: true});

    this.method('sendChatMessage', function (text) {
        if (!connected) return;
        socket.fireTaskCallback('chat', socket.id, text);
        socket.sendMsg('a', text, 'chat');
    });

    this.method('wanna_play_with', function (id) {
        if (!connected || playing_with) return;
        id = parseInt(id);
        waiting_for = id;
        socket.sendMsg(id, null, 'wanna_play?');
    });
    
    this.method('sendMove', function (from_index, to_index) {
        socket.sendMsg(playing_with, {from: from_index, to: to_index}, 'i_have_moved');
    });

    // --------------------------------------------------------------------

    // socket events
    socket.getAuthHash = function(){
        return {};
    };
    socket.onAuthSuccess = function(){
        connected = true;
        printout('Připojeno na server jako '+socket.id+'.');
    };
    socket.onAuthFailed = function () {
        connected = false;
        printout('Chyba autentifikace připojení.');
    };
    socket.onClosed = function () {
        connected = false;
        printout('Spojení ukončeno.');
    };
    socket.waitForConnection(function () {
        socket.sendAuth();
    });

    // chat
    socket.setTaskCallback('chat', function (from_id, msg) {
        od = from_id+': ';
        printout(od+msg, 'chat');
    });


    // game
    function game_starded(with_id, as_player) {
        waiting_for = null;
        playing_with = null;
        J3O.game.startGameplay(socket, as_player);
        playing_with = with_id;
        printout('Začíná hra s '+with_id+'.');
    }
    socket.setTaskCallback('wanna_play?', function (from_id) {
        if (playing_with) socket.sendMsg(from_id, null, 'bugger_off!');
        else if (waiting_for) {
            if (waiting_for !== from_id) socket.sendMsg(from_id, null, 'bugger_off!');
            else {
                game_starded(from_id, 1);
                socket.sendMsg(from_id, null, 'i_have_started');
            }
        }
    });
    socket.setTaskCallback('bugger_off!', function (from_id) {
        if (waiting_for===from_id) {
            waiting_for = null;
            printout('Nyní nelze zahájit hru s '+from_id+'.');
        }
    });
    socket.setTaskCallback('i_have_started', function (from_id) {
        if (waiting_for===from_id) {
            game_starded(from_id, 2);
        }
    });
    socket.setTaskCallback('i_have_moved', function (from_id, move) {
        if (playing_with===from_id) {
            var game = J3O.game.current;
            game && J3O.game.current.opponentMoved(move.from, move.to);
        }
    });

});