/**
 * Created by doooby on 26.2.15.
 */

J3O.structs('GUInterface', function (app) {
    var struct = {};

    // chat inputs
    function sumbit_chat_message() {
        var chat_input = $('#chat_input');
        J3O.SocketInterface.sendChatMessage(chat_input.val());
        chat_input.val('');
    }
    $('#chat_input').keydown(function (event) { if (event.which==13) sumbit_chat_message(); });
    $('#chat_send').click(function () { sumbit_chat_message(); });

    // game menu
    $('#btn_play_with').click(function () {
        if (!J3O.SocketInterface.connected ) return;
                                           // start new game
    });
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


    return struct;
});