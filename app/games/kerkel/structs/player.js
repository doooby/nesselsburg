/**
 * Created by doooby on 6.4.15.
 */

GAME.addStruct('Player', function () {
    var klass = {

    };

    var general_plugin = {
        begginGame: function (game, clbk) {
            var self = this;
            this.dispatch('POST', '', JSON.stringify({game_id: 'test_game'}), clbk,
                function () {
                    GAME.utils.log('Generál '+self.id+' odmítl začít novou bitvu');
                }
            );
        },
        endGame: function (game, winner) {
            var event = 'lost';
            if (winner===this) event = 'win';
            this.dispatch('POST', '/test_game/'+event, '{}');
        },
        yourTurn: function (last_move, as_player) {
            this.dispatch('GET', '/test_game',
                {on_turn: as_player, last_move: last_move},
                function (data) {
                    GAME.current_game.turn(
                        GAME.Board.positions[data.from],
                        GAME.Board.positions[data.to]
                    );
                }
            );
        },
        dispatch : function (type, path, data, success, fail) {
            $.ajax({
                type: type,
                url: 'http://'+this.url+'/kerkel'+path,
                contentType: "application/json",
                data: data,
                success: success,
                error: function (e) { console.log(e.responseJSON); fail && fail(); }
            });
        }
    };

    var stupid_ui_plugin = {
        yourTurn: function () {
            var from = this.nahoda(GAME.Board.getPositionsOfPlayer(this));
            var to = this.nahoda(GAME.Board.possibleStepsFor(from));
            GAME.current_game.turn(from, to);
        },
        nahoda: function (pole) {
            return pole[Math.floor(Math.random() * pole.length)];
        }
    };

    return {
        create: function (id, plugin) {
            var new_klass = Object.create(klass);
            new_klass.id = id;
            if (plugin) _.extend(new_klass, plugin);
            return new_klass;
        },
        general: general_plugin,
        stupid_ui: stupid_ui_plugin
    };
});