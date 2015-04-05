/**
 * Created by doooby on 25.2.15.
 */

J3O.structs('MouseInterface', function (app) {
    var struct = {
        raycaster: new THREE.Raycaster(),
        down_hit: null,
        up_hit: null,
        possible_steps: []
    };

    function get_mouse_hit(e) {
        canvas.setMouseRaycaster(struct.raycaster, e);
        var hit = J3O.Board.positionHit(struct.raycaster);
        if (hit) return hit.object;
    }

    $('#'+canvas.container_id).
        on('mousedown', function (e) {
            var i, p, m;
            e.preventDefault();
            if (struct.possible_steps.length>0) {throw 'possible_steps remained for new mousedown!';}

            if (!J3O.Game.local_player) return;

            struct.down_hit = get_mouse_hit(e);
            if (!struct.down_hit) return;

            m = struct.down_hit.model;
            if (m.stone && m.stone.player===J3O.Board.local_player) {
                struct.possible_steps = J3O.Board.possibleStepsFor(struct.down_hit.model);
                if (struct.possible_steps.length!==0) {
                    for (i = 0; i < struct.possible_steps.length; i += 1) {
                        p = struct.possible_steps[i];
                        p.material.uniforms.innerCol.value = new THREE.Color(0xffff66);
                    }
                    canvas.redraw();
                }
            }
        }).
        on('mouseup', function (e) {
            var i, p, valid_move;
            e.preventDefault();

            if (struct.possible_steps.length>0) {
                struct.up_hit = get_mouse_hit(e);
                for (i=0; i< struct.possible_steps.length; i+=1) {
                    p = struct.possible_steps[i];
                    p.material.uniforms.innerCol.value = new THREE.Color(0xffffff);
                    if (p===struct.up_hit) valid_move = true;
                }
                struct.possible_steps.length = 0;
                canvas.redraw();
            }

            if (struct.down_hit && valid_move) {

                J3O.Board.moveStone(struct.down_hit.model, struct.up_hit.model);
            }

        });

    return struct;
});