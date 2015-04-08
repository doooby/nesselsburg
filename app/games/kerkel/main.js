//= require ./base
//= require_directory ./structs
//= require_self

var GAME_UI = {
    jqel: null,
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
        GAME_UI.jqel.html(Handlebars.compile(GAME.templates[menu])());
        GAME_UI.jqel.find('button[data-menu]').each(function () {
            var jq_btn = $(this);
            var btn_menu = jq_btn.data('menu');
            jq_btn.on('click', function () {GAME_UI.show_menu(btn_menu)});
        });
        GAME_UI.jqel.find('button[data-action]').each(function () {
            var jq_btn = $(this);
            var btn_action = jq_btn.data('action');
            jq_btn.on('click', function () {GAME_UI[btn_action]()});
        });
    },

    new_game: function () {
        console.log('dfas');
        var player_local = GAME.Player.create('modrák');
        player_local.local = true;
        var player2 = GAME.Player.create('oranžák', GAME.Player.stupid_ui);
        GAME.current_game = GAME.Game.create(player_local, player2);
        GAME_UI.toggle_menu();
    }

};

document.getElementById('container').gameLoaded(GAME);