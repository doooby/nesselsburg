/**
 * Created by doooby on 26.2.15.
 */

J3O.structs('SocketInterface', function (app) {
    var s = new S3ocket();
    var struct = {
        s3ocket: s,
        connected: false,
        waitnig_for: null,
        sendChatMessage: function (text) {
            if (!struct.connected) return;
            s.fireTaskCallback('chat', s.id, text);
            s.sendMsg('a', text, 'chat');
        }
    };

    // nastavení připojení
    s.getAuthHash = function(){
        return {};
    };
    s.onAuthSuccess = function(){
        struct.connected = true;
        printout('Připojeno na server jako '+s.id+'.');
    };
    s.onAuthFailed = function () {
        struct.connected = false;
        printout('Chyba autentifikace připojení.');
    };
    s.onClosed = function () {
        struct.connected = false;
        printout('Spojení ukončeno.');
    };
    s.waitForConnection(function () {
        s.sendAuth();
    });

    // chat
    s.setTaskCallback('chat', function (od_id, msg) {
        od = od_id+': ';
        printout(od+msg, 'chat');
    });


    // hra
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
//                var hrac1, hrac2;
//                if (DAMA.sitova_hra.hledam) {
//                    DAMA.sitova_hra.hledam = false;
//                    DAMA.sitova_hra.hrac1 = true;
//                    DAMA.socket.sendMsg(od_id, 'hrajem!', 'pvp');
//                    //začíánám
//                    printout('Začíná hra s modrým '+od_id);
//                    hrac1 = new DAMA.LokalniHrac('já', true);
//                    hrac2 = new DAMA.VzdalenyHrac('on', false, od_id);
//                    DAMA.novaHra(hrac1, hrac2);
//                }
//                else if (DAMA.sitova_hra.cekam_zahajeni==od_id) {
//                    DAMA.sitova_hra.cekam_zahajeni = null;
//                    DAMA.sitova_hra.hrac1 = false;
//                    //jedu druhý
//                    printout('Začíná hra s oranžovým' +od_id);
//                    hrac1 = new DAMA.VzdalenyHrac('on', true, od_id);
//                    hrac2 = new DAMA.LokalniHrac('já', false);
//                    DAMA.novaHra(hrac1, hrac2);
//                }
                break;
            default :
//                if (DAMA.hra && DAMA.hra.vzdalenyHrac && DAMA.hra.vzdalenyHrac.socket_id==od_id) {
//                    DAMA.hra.odehrejTah(msg, DAMA.hra.vzdalenyHrac);
//                }
                break;
        }
    });

    return struct;
});