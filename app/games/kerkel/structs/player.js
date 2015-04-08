/**
 * Created by doooby on 6.4.15.
 */

GAME.addStruct('Player', function () {
    var klass = {

    };

    var general_plugin = {
        yourTurn: function () {
               console.log('jede generál.');
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