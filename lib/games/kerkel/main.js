//= require j3o.3
//= require s3ocket
//= require ./structs/material_of_circle
//= require ./structs/board
//= require ./structs/player
//= require ./structs/game
//= require ./structs/mouse_interface
//= require ./structs/socket_interface
//= require_self
/**
 * Created by doooby on 20.2.15.
 */

var canvas;

function printout(text, css) {
    if (!css) css = 'log';
    div = $('<div class="'+css+'">'+text+'</div>');
    var printout_tag = $('#printout');
    printout_tag.append(div);
    printout_tag.scrollTop(printout_tag.prop('scrollHeight'));
}

$(window).load(function(){

    J3O.data.setGameName('kerkel');

    var app_options = function () {
        var app = {};

        app.sirka_zaberu = null;
        app.vyska_zaberu = 700;

        app.position_size = 60;
        app.position_indentation = 25;
        app.position_total_size = app.position_size + 2*app.position_indentation;

        var board_position = 0.5*app.vyska_zaberu - 2.5*app.position_total_size;
        app.board_top_left = new THREE.Vector3(board_position, board_position, 0);

        app.stone_size = app.position_size / 3;

        return app;
    }();

    //plátno
    J3O.createCanvas({
        clear_color: 0xffffff,
        camera: function() {
            var camera, height, width;
            height = app_options.vyska_zaberu / 2;
            width = (this.width / this.height) * height;
            app_options.sirka_zaberu = width * 2;

            camera = new THREE.OrthographicCamera(width, -width, height, -height, 0, 100);
            camera.up = new THREE.Vector3(0, -1, 0);
            camera.position.set(width, height, 50);
            camera.lookAt(new THREE.Vector3(width, height, 0));
            return camera;
        }
    }, function() {
        canvas = this;

        //////////////// inicializace //////////////////
        J3O.structs.load(app_options);
        J3O.Board.createBoard();

//        var game = J3O.Game.createGameplay();
//        J3O.Game.prepareGameplay(game);

        canvas.redraw();




    });
});