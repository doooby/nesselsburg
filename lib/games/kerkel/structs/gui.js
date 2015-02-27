/**
 * Created by doooby on 26.2.15.
 */

J3O.struct(function (app) {
    var raycaster = new THREE.Raycaster();
    var down_hit = null;
    var up_hit = null;
    var possible_steps = [];

    // mouse interactions
    function get_mouse_hit(e) {
        canvas.setMouseRaycaster(raycaster, e);
        var hit = J3O.board.positionHit(raycaster);
        if (hit) return hit.object;
    }
    $('#'+canvas.container_id).
        on('mousedown', function (e) {
            var i, p, m;
            e.preventDefault();
            if (possible_steps.length>0) {throw 'possible_steps remained for new mousedown!';}

            if (!J3O.socket_interface.playing_with) return;

            down_hit = get_mouse_hit(e);
            if (!down_hit) return;

            m = down_hit.model;
            if (m.stone && m.stone.model.game && m.stone.model.game.on_turn) {
                possible_steps = J3O.board.possibleStepsFor(down_hit.model);
                if (possible_steps.length!==0) {
                    for (i = 0; i < possible_steps.length; i += 1) {
                        p = possible_steps[i];
                        p.material.uniforms.innerCol.value = new THREE.Color(0xffff66);
                    }
                    canvas.redraw();
                }
            }
        }).
        on('mouseup', function (e) {
            var i, p, valid_move, game;
            e.preventDefault();

            if (possible_steps.length>0) {
                up_hit = get_mouse_hit(e);
                for (i=0; i< possible_steps.length; i+=1) {
                    p = possible_steps[i];
                    p.material.uniforms.innerCol.value = new THREE.Color(0xffffff);
                    if (p===up_hit) valid_move = true;
                }
                possible_steps.length = 0;
                canvas.redraw();
            }

            if (down_hit && valid_move) {
                game = down_hit.model.stone.model.game;
                if (game.on_turn) game.moveStone(down_hit.model.index, up_hit.model.index);
            }

        });

    // chat inputs
    function sumbit_chat_message() {
        var chat_input = $('#chat_input');
        if (chat_input.val()) {
            J3O.socket_interface.sendChatMessage(chat_input.val());
            chat_input.val('');
        }
    }
    $('#chat_input').keydown(function (event) { if (event.which==13) sumbit_chat_message(); });
    $('#chat_send').click(function () { sumbit_chat_message(); });

    // game button
    $('#btn_play_with').click(function () {
        input_opponent = $('#play_with');
        J3O.socket_interface.wanna_play_with(input_opponent.val());
    });

});