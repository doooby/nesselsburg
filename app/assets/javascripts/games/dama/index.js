//= require_self
//= require_directory

var DAMA = {};

DAMA.sirka_ctverce = 6.3;
var puldesky = DAMA.sirka_ctverce*4;
DAMA.offset_desky = new THREE.Vector3(-puldesky, -puldesky, 0);

DAMA.novaHra = function(hrac1, hrac2) {
    var spusteni_hry = function () {
        DAMA.deska.prycKameny();
        DAMA.deska.rozlozKameny();
        DAMA.platno.redraw();
        DAMA.hra = new DAMA.Hra(hrac1, hrac2);
    };
    if (DAMA.hra && !DAMA.hra.konec) {
        if (!DAMA.hra.lokalniHrac || DAMA.hra.naTahu.hrac1!==DAMA.hra.lokalniHrac.hrac1) {
            DAMA.hra.konec = true;
            DAMA.hra.nakonec = spusteni_hry;
            DAMA.hra = null;
            return;
        }
    }
    spusteni_hry();
};

DAMA.sitova_hra = {hledam: false};

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
                    if (vybrany) {
                        delete vybrany.mesh;
                        DAMA.hra.odehrejTah(vybrany, DAMA.hra.lokalniHrac);
                        if (DAMA.hra.vzdalenyHrac) {
                            DAMA.socket.sendMsg(DAMA.hra.vzdalenyHrac.socket_id, vybrany, 'pvp');
                        }
                    }
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
                DAMA.vypis('Připojeno na server jako '+s.id+'.');
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

            s.setTaskCallback('pvp', function (od_id, msg) {
                switch (msg) {
                    case 'hrajem?':
                        if (DAMA.sitova_hra.hledam) {
                            DAMA.socket.sendMsg(od_id, 'já', 'pvp');
                        }
                        break;
                    case 'já':
                        if (DAMA.sitova_hra.hledam) {
                            DAMA.sitova_hra.hledam = false;
                            DAMA.sitova_hra.cekam_zahajeni = od_id;
                            DAMA.socket.sendMsg(od_id, 'hrajem!', 'pvp');
                        }
                        break;
                    case 'hrajem!':
                        var hrac1, hrac2;
                        if (DAMA.sitova_hra.hledam) {
                            DAMA.sitova_hra.hledam = false;
                            DAMA.sitova_hra.hrac1 = true;
                            DAMA.socket.sendMsg(od_id, 'hrajem!', 'pvp');
                            //začíánám
                            DAMA.vypis('Začíná hra s modrým '+od_id);
                            hrac1 = new DAMA.LokalniHrac('já', true);
                            hrac2 = new DAMA.VzdalenyHrac('on', false, od_id);
                            DAMA.novaHra(hrac1, hrac2);
                        }
                        else if (DAMA.sitova_hra.cekam_zahajeni==od_id) {
                            DAMA.sitova_hra.cekam_zahajeni = null;
                            DAMA.sitova_hra.hrac1 = false;
                            //jedu druhý
                            DAMA.vypis('Začíná hra s oranžovým' +od_id);
                            hrac1 = new DAMA.VzdalenyHrac('on', true, od_id);
                            hrac2 = new DAMA.LokalniHrac('já', false);
                            DAMA.novaHra(hrac1, hrac2);
                        }
                        break;
                    default :
                        if (DAMA.hra && DAMA.hra.vzdalenyHrac && DAMA.hra.vzdalenyHrac.socket_id==od_id) {
                            DAMA.hra.odehrejTah(msg, DAMA.hra.vzdalenyHrac);
                        }
                        break;
                }
            });

            $('#btn_new_game').click(function () {
                if (DAMA.hra && !confirm('Opravdu začít novou hru?')) return;
                switch ($('input[name="game_with"]:checked').val()) {
                    case 'pvai':
                        DAMA.sitova_hra = {hledam: false};
                        DAMA.vypis('Začíná hra s počítačem');
                        var hrac1 = new DAMA.LokalniHrac('člověk', true);
                        var hrac2 = new DAMA.Pocitac('počítač', false);
                        DAMA.novaHra(hrac1, hrac2);
                        break;
                    case 'pvp':
                        DAMA.sitova_hra = {hledam: true};
                        DAMA.vypis('Hledám protihráče.');
                        DAMA.socket.sendMsg('a', 'hrajem?', 'pvp');
                        break;
                }
            });

            $('#btn_new_show_game').click(function () {
                if (DAMA.hra && !confirm('Opravdu začít novou hru?')) return;
                DAMA.sitova_hra = {hledam: false};
                DAMA.vypis('Souboj počítačů!');
                var hrac1 = new DAMA.Pocitac('oranžový', true);
                var hrac2 = new DAMA.Pocitac('modrý', false);
                DAMA.novaHra(hrac1, hrac2);
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

    DAMA.vypis('Finální Beta verze', 'err');
});