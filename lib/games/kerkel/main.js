//= require j3o.3
//= require s3ocket
//= require ./material_of_circle
//= require ./board
//= require ./player
//= require ./game
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

        var game = J3O.Game.createGameplay();
        J3O.Game.prepareGameplay(game);

        canvas.redraw();

        //////////////// interakce myši ////////////////
        var raycaster = new THREE.Raycaster();
        var down_hit, up_hit, highlighted;
        function get_mouse_hit(e) {
            canvas.setMouseRaycaster(raycaster, e);
            var hit = J3O.Board.positionHit(raycaster);
            if (hit) return hit.object;
        }
        $('#'+canvas.container_id).
            on('mousedown', function (e) {
                var i, p;
                e.preventDefault();
                down_hit = get_mouse_hit(e);
                if (down_hit && down_hit.model.stone) {
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

        //////////////// socket komunikace ////////////////
        J3O.pripojeno = false;
        J3O.socket = (function () {
            var s = new S3ocket();

            // nastavení připojení
            s.getAuthHash = function(){
                return {};
            };
            s.onAuthSuccess = function(){
                J3O.pripojeno = true;
                printout('Připojeno na server jako '+s.id+'.');
            };
            s.onAuthFailed = function () {
                J3O.pripojeno = false;
                printout('Chyba autentifikace připojení.');
            };
            s.onClosed = function () {
                J3O.pripojeno = false;
                printout('Spojení ukončeno.');
            };
            s.waitForConnection(function () {
                s.sendAuth();
            });

            // chat
            function sendChatMessage () {
                if (!J3O.pripojeno) return;
                var chat_input = $('#chat_input');
                s.fireTaskCallback('chat', s.id, chat_input.val());
                s.sendMsg('a', chat_input.val(), 'chat');
                chat_input.val('');
            }
            s.setTaskCallback('chat', function (od_id, msg) {
                od = od_id+': ';
                printout(od+msg, 'chat');
            });
            $('#chat_input').keydown(function (event) { if (event.which==13) sendChatMessage(); });
            $('#chat_send').click(function () { sendChatMessage(); });

            // hra
//            s.setTaskCallback('pvp', function (od_id, msg) {
//                switch (msg) {
//                    case 'hrajem?':
//                        if (DAMA.sitova_hra.hledam) {
//                            DAMA.socket.sendMsg(od_id, 'já', 'pvp');
//                        }
//                        break;
//                    case 'já':
//                        if (DAMA.sitova_hra.hledam) {
//                            DAMA.sitova_hra.hledam = false;
//                            DAMA.sitova_hra.cekam_zahajeni = od_id;
//                            DAMA.socket.sendMsg(od_id, 'hrajem!', 'pvp');
//                        }
//                        break;
//                    case 'hrajem!':
//                        var hrac1, hrac2;
//                        if (DAMA.sitova_hra.hledam) {
//                            DAMA.sitova_hra.hledam = false;
//                            DAMA.sitova_hra.hrac1 = true;
//                            DAMA.socket.sendMsg(od_id, 'hrajem!', 'pvp');
//                            //začíánám
//                            printout('Začíná hra s modrým '+od_id);
//                            hrac1 = new DAMA.LokalniHrac('já', true);
//                            hrac2 = new DAMA.VzdalenyHrac('on', false, od_id);
//                            DAMA.novaHra(hrac1, hrac2);
//                        }
//                        else if (DAMA.sitova_hra.cekam_zahajeni==od_id) {
//                            DAMA.sitova_hra.cekam_zahajeni = null;
//                            DAMA.sitova_hra.hrac1 = false;
//                            //jedu druhý
//                            printout('Začíná hra s oranžovým' +od_id);
//                            hrac1 = new DAMA.VzdalenyHrac('on', true, od_id);
//                            hrac2 = new DAMA.LokalniHrac('já', false);
//                            DAMA.novaHra(hrac1, hrac2);
//                        }
//                        break;
//                    default :
//                        if (DAMA.hra && DAMA.hra.vzdalenyHrac && DAMA.hra.vzdalenyHrac.socket_id==od_id) {
//                            DAMA.hra.odehrejTah(msg, DAMA.hra.vzdalenyHrac);
//                        }
//                        break;
//                }
//            });

//            $('#btn_new_game').click(function () {
//                if (DAMA.hra && !confirm('Opravdu začít novou hru?')) return;
//                switch ($('input[name="game_with"]:checked').val()) {
//                    case 'pvai':
//                        DAMA.sitova_hra = {hledam: false};
//                        printout('Začíná hra s počítačem');
//                        var hrac1 = new DAMA.LokalniHrac('člověk', true);
//                        var hrac2 = new DAMA.Pocitac('počítač', false);
//                        DAMA.novaHra(hrac1, hrac2);
//                        break;
//                    case 'pvp':
//                        DAMA.sitova_hra = {hledam: true};
//                        printout('Hledám protihráče.');
//                        DAMA.socket.sendMsg('a', 'hrajem?', 'pvp');
//                        break;
//                }
//            });
//
//            $('#btn_new_show_game').click(function () {
//                if (DAMA.hra && !confirm('Opravdu začít novou hru?')) return;
//                DAMA.sitova_hra = {hledam: false};
//                printout('Souboj počítačů!');
//                var hrac1 = new DAMA.Pocitac('oranžový', true);
//                var hrac2 = new DAMA.Pocitac('modrý', false);
//                DAMA.novaHra(hrac1, hrac2);
//            });

            return s;
        })();
    });
});