//= require_self
//= require_directory

var DAMA = {};

DAMA.sirka_ctverce = 6.3;
var puldesky = DAMA.sirka_ctverce*4;
DAMA.offset_desky = new THREE.Vector3(-puldesky, -puldesky, 0);

DAMA.novaHra = function(verze) {
    nazacatek = function () {
        switch (verze) {
            case 'aivai':
                hrac1 = DAMA.Pocitac;
                hrac2 = DAMA.Pocitac;
                break;
            case 'pvai':
                hrac1 = DAMA.LokalniHrac;
                hrac2 = DAMA.Pocitac;
                break;
            case 'pvp':
                hrac1 = DAMA.Hrac;
                hrac2 = DAMA.Hrac;
                break;
        }
        hrac1 = new hrac1('oranžový');
        hrac2 = new hrac2('modrý');

        DAMA.deska.prycKameny();
        DAMA.deska.rozlozKameny();
        DAMA.platno.redraw();
        DAMA.hra = new DAMA.Hra(hrac1, hrac2);
    };
    if (DAMA.hra && !DAMA.hra.konec) {
        DAMA.hra.konec = true;
        DAMA.hra.nakonec = nazacatek;
        DAMA.hra = null;
    }
    else nazacatek();
};

DAMA.vypis = function (txt, css) {
    if (!css) css = 'log';
    div = $('<div class="'+css+'">'+txt+'</div>');
    var printout = $('#printout');
    printout.append(div);
    printout.scrollTop(printout.prop('scrollHeight'));
};

$(window).load(function(){
    try {
        //plátno
        opts = {};
        DAMA.platno = new J3O.Canvas(opts,
            function (c) {
                //inicializace grafiky
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
            },
            function (c) {
                //vykreslit
                c.redraw();

                //ovládání
                var mozne_tahy = [];
                var down_pozice = -1;
                c.container.addEventListener('mousedown', function (e) {
                    if (!DAMA.hra || !DAMA.hra.lokalniHrac) return;
                    if (DAMA.hra.lokalniHrac.hrac1!==DAMA.hra.naTahu.hrac1) return;
                    down_pozice = DAMA.poziceByRay(THREE.Ray.pickingRay(c, e));
                    if (down_pozice==-1) return;
                    mozne_tahy = DAMA.deska.mozneTahyHraceZ(DAMA.hra.lokalniHrac,
                        down_pozice);
                    if (mozne_tahy.length>0) {
                        for (i=0; i<mozne_tahy.length; i++) {
                            c.scene.add(mozne_tahy[i].createTahMesh());
                        }
                        c.redraw();
                    }
                });
                c.container.addEventListener('mouseup', function (e) {
                    if (mozne_tahy.length===0) return;
                    var vybrany = null;
                    var up_pozice = DAMA.poziceByRay(THREE.Ray.pickingRay(c, e));
                    for (i=0; i<mozne_tahy.length; i++) {
                        t = mozne_tahy[i];
                        c.scene.remove(t.mesh);
                        if (t.na==up_pozice) vybrany = t;
                    }
                    mozne_tahy = [];
                    down_pozice = -1;
                    if (vybrany) DAMA.hra.odehrejTah(vybrany, DAMA.hra.lokalniHrac);
                    c.redraw();
                });
            }
        );

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
                DAMA.novaHra('aivai');
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

    DAMA.vypis('Beta verze, aktuální stav: Beta #3 - chybí pvp', 'err');
});