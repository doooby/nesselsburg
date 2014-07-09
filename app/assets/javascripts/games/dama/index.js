//= require_self
//= require_directory

var DAMA = {};

DAMA.sirka_ctverce = 6.3;
var puldesky = DAMA.sirka_ctverce*4;
DAMA.offset_desky = new THREE.Vector3(-puldesky, -puldesky, 0);

DAMA.novaHra = function(verze) {
    hrac1 = DAMA.Pocitac;
    hrac2 = DAMA.Pocitac;
    switch (verze) {
        case 'pvai':
            hrac1 = DAMA.Hrac;
            break;
        case 'pvp':
            hrac1 = DAMA.Hrac;
            hrac2 = DAMA.Hrac;
            break;
    }
    hrac1 = new hrac1('oranžový');
    hrac2 = new hrac2('modrý');
    if (DAMA.hra) {
        DAMA.hra.destroy();
        DAMA.hra = null;
        DAMA.deska.prycKameny();
    }
    DAMA.deska.rozlozKameny();
    DAMA.platno.redraw();
    DAMA.hra = new DAMA.Hra(hrac1, hrac2);
};

DAMA.vypis = function (txt, css) {
    if (!css) css = 'log';
    div = $('<div class="'+css+'">'+txt+'</div>');
    var printout = $('#printout');
    printout.append(div);
    printout.scrollTop(printout.prop('scrollHeight'));
};

$( document ).ready(function(){
    try {
        //plátno
        opts = {};
        DAMA.platno = new J3O.Canvas(opts, function (c) {

            var pomer_platna = c.container.clientWidth / c.container.clientHeight;
            c.camera = new THREE.PerspectiveCamera(45, pomer_platna, 1, 100);
            c.camera.position.y = -45;
            c.camera.position.z = 40;
            c.camera.rotation.x = 45 * (Math.PI / 180);

            light = new THREE.PointLight(0xFFFFFF);
            light.position.set(-13, -15, 10);
            c.scene.add(light);

            //deska
            DAMA.deska = new DAMA.Deska(c.scene);
        });
        DAMA.platno.redraw();

        //socket
        DAMA.pripojeno = false;
        DAMA.socket = (function () {
            var s = new S3ocket();
            s.getAuthHash = function(){
                return {};
            };
            s.onAuthSuccess = function(){
                DAMA.pripojeno = true;
                DAMA.vypis('Připojeno na server.');
            };
            s.onAuthFailed = function () {
                DAMA.pripojeno = false;
                DAMA.vypis('Chyba autentifikace připojení.');
            };
            s.onClosed = function () {
                DAMA.pripojeno = false;
                DAMA.vypis('Spojení ukončeno.');
            };
            s.waitForConnection(function () {
                s.sendAuth();
            });

            function sendChatMessage () {
                var chat_input = $('#chat_input');
                s.fireTaskCallback('chat', s.id, chat_input.val());
                s.sendMsg('a', chat_input.val(), 'chat');
                chat_input.val('');
            }
            s.setTaskCallback('chat', function (od_id, msg) {
                od = od_id+': ';
                var div = DAMA.vypis(od+msg, 'chat');
                console.log(div);
                document.div = div;
            });
            $('#chat_input').keydown(function (event) {
                //event.ctrlKey &&
                if (event.which==13 && DAMA.pripojeno) {
                    sendChatMessage();
                }
            });
            $('#chat_send').click(function () {
                sendChatMessage();
            });

            $('#btn_new_game').click(function () {
                if (DAMA.hra && !confirm('Opravdu začít novou hru?')) return;
                DAMA.novaHra($('input[name="game_with"]:checked').val());
            });

            $('#btn_new_show_game').click(function () {
                if (DAMA.hra && !confirm('Opravdu začít novou hru?')) return;
                DAMA.novaHra();
            });

            return s;
        })();

    }
    catch(err) {
        if (err['err']) DAMA.vypis(err['err']+': '+err['msg'], 'err');
        else {
            DAMA.vypis('Obecná vyjímka: '+err.message, 'err');
            console.log(err.stack);
        }
    }
});