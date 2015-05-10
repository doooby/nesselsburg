/**
 * Created by doooby on 6.4.15.
 */

GAME.addStruct('Game', function () {
    var klass = {
        players: null,
        on_turn: null,
        the_other: function () {
            if (this.on_turn===this.players[0]) return this.players[1];
            else return this.players[0];
        },

        turn: function (from, to) {
            var next_plays = this.the_other();

            GAME.Board.moveOneStone(from, to);
            GAME.utils.log('hráč '+this.on_turn.id+' z='+from.__.index+' na='+to.__.index);


            // next_plays má čím táhnout? => vyhrává ten co teď odehrál
            if (GAME.Board.getPositionsOfPlayer(next_plays).length===0) {
                return this.end_game(this.on_turn);
            }

            // on_turn má tah do výhry? => vyhrává on_turn
            var side = 0;
            if (next_plays===this.players[1]) side = 1;
            var win_pos = _.some(GAME.Board.winningPositionForSide(side),
                function (p) {
                    var stone = p.__.stones[0];
                    return stone && stone.__.player===next_plays;
                }
            );
            if (win_pos) {
                return this.end_game(next_plays);
            }

            // další tah
            this.on_turn = next_plays;
            if (this.on_turn.yourTurn) this.on_turn.yourTurn(
                {from: from.__.index, to: to.__.index}, side+1
            );
        },

        start_game: function (on_start) {
            var self = this;
            var poradi = -1;
            function wait_for_player() {
                poradi += 1;
                if (poradi===2) { on_start(); }
                else {
                    var p = self.players[poradi];
                    if (typeof p.begginGame==='function') p.begginGame(self, wait_for_player);
                    else wait_for_player();
                }
            }
            wait_for_player();
        },

        end_game: function (winner) {
            GAME.current_game = null;
            GAME.utils.log('Vyhrává hráč '+winner.id);
            if (typeof this.players[0].endGame==='function') { this.players[0].endGame(this, winner); }
            if (typeof this.players[1].endGame==='function') { this.players[1].endGame(this, winner); }
        }
    };

    return {
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
});