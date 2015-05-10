//= require ./base
//= require_directory ./structs
//= require_self

var GAME_UI = {
    jqel: null,
    general_input: 'localhost:3001',

    toggle_menu: function () {
        if (GAME_UI.jqel) {
            GAME_UI.jqel.detach();
            GAME_UI.jqel = null;
        }
        else{
            GAME_UI.jqel = $('<div class="game_menu"></div>');
            $(GAME.canvas.container).prepend(GAME_UI.jqel);
            GAME_UI.show_menu('menu');
        }
    },

    show_menu: function (menu) {
        GAME_UI.jqel.html(Handlebars.compile(GAME.templates[menu])({ui: GAME_UI}));
        GAME_UI.jqel.find('button[data-menu]').each(function () {
            var jq_btn = $(this);
            var btn_menu = jq_btn.data('menu');
            jq_btn.on('click', function () {GAME_UI.show_menu(btn_menu)});
        });
        GAME_UI.jqel.find('button[data-action]').each(function () {
            var jq_btn = $(this);
            var btn_action = jq_btn.data('action');
            jq_btn.on('click', GAME_UI[btn_action]);
        });
        GAME_UI.jqel.find('[data-onblur]').each(function () {
            var jq_el = $(this);
            var el_action = jq_el.data('onblur');
            jq_el.on('blur', GAME_UI[el_action]);
        });
    },

    new_game: function () {
        /// !!!!!!!!!!!!!! end current game
        if (GAME.current_game) GAME.current_game.endGame();

        var player_local = GAME.Player.create('modrák');
        player_local.local = true;
//        var player2 = GAME.Player.create('oranžák', GAME.Player.stupid_ui);
        var player2 = GAME.Player.create('oranžák', GAME.Player.general);
        player2.url = GAME_UI.general_input;
        var new_game = GAME.Game.create(player_local, player2);

        new_game.start_game(function () {
            GAME.current_game = new_game;
            GAME.utils.log('Nová hra: '+new_game.players[0].id+'(modrá) vs. '+new_game.players[1].id+'(oranžová)');
            GAME_UI.toggle_menu();
        });
    },

    store_general: function () {
        GAME_UI.general_input = this.value;
    }

};

document.getElementById('container').gameLoaded(GAME);