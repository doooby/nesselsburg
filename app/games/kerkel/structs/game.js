/**
 * Created by doooby on 6.4.15.
 */

GAME.addStruct('Game', function () {
    var klass = {
        players: null,
        on_turn: null
    };


    var struct = {
        create: function (player1, player2) {
            var new_klass = Object.create(klass);
            new_klass.players = [player1, player2];
            new_klass.on_turn = player1;

            GAME.Board.prepare();
            GAME.canvas.redraw();
            var positions = GAME.Board.positions;
            positions[20].__.stones[0].__.player = player1;
            positions[21].__.stones[0].__.player = player1;
            positions[23].__.stones[0].__.player = player1;
            positions[24].__.stones[0].__.player = player1;
            positions[0].__.stones[0].__.player = player2;
            positions[1].__.stones[0].__.player = player2;
            positions[3].__.stones[0].__.player = player2;
            positions[4].__.stones[0].__.player = player2;

            return new_klass;
        }
    };
    return struct;
});