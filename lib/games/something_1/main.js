//= require j3o.3
//= require ./material_of_circle
//= require ./board
//= require ./player
//= require_self
/**
 * Created by doooby on 20.2.15.
 */

var canvas;
var aaa;

var app_options = function () {
    var app = {};

    app.sirka_zaberu = null;
    app.vyska_zaberu = 700;

    app.position_size = 60;
    app.position_indentation = 25;
    app.position_total_size = app.position_size + 2*app.position_indentation;

    app.v_top_left = null;

    return app;
}();

$(window).load(function(){

    J3O.data.setGameName('something_1');

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

        //////////////// interakce myši ////////////////
        var raycaster = new THREE.Raycaster();
        var down_hit, up_hit, highlighted;
        function get_mouse_hit(e) {
            canvas.setMouseRaycaster(raycaster, e);
            var hit = J3O.Board.PositionHit(raycaster);
            if (hit) return hit.object;
        }
        $('#'+canvas.container_id).
            on('mousedown', function (e) {
                var i, p;
                e.preventDefault();
                down_hit = get_mouse_hit(e);
                if (down_hit) {
                    highlighted = J3O.Board.possibleStepsFor(down_hit.model);
                    if (highlighted.length!==0) {
                        for (i = 0; i < highlighted.length; i += 1) {
                            p = highlighted[i];
                            p.material.uniforms.innerCol.value = new THREE.Color(0xffff66);
                        }
                        canvas.redraw();
                    }
                }
            }).
            on('mouseup', function (e) {
                var i, p, valid_move;
                e.preventDefault();
                if (down_hit) {
                    up_hit = get_mouse_hit(e);
                    if (highlighted.length!==0) {
                        for (i=0; i< highlighted.length; i+=1) {
                            p = highlighted[i];
                            p.material.uniforms.innerCol.value = new THREE.Color( 0xffffff );
                            if (p===up_hit) valid_move = true;
                        }
                        canvas.redraw();
                    }
                    highlighted.length = 0;
                    if (valid_move) J3O.Board.moveStone(down_hit.model, up_hit.model);
                }
            });

        //////////////// inicializace //////////////////
        J3O.structs.load();
        J3O.Board.createBoard();

        canvas.redraw();
    });
});