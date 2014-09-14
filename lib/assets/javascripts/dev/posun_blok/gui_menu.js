/**
 * Created by doooby on 3.9.14.
 */

GUI = (function () {
    var proto;

    proto = {};



    Object.defineProperty(proto, 'znicSvet', {enumerable: true,
        value: function () {
            if (svet) {
                svet.dispObjekty(platno.scene);
                svet = null;
                platno.redraw();
            }
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /// Přechody v menu

    Object.defineProperty(proto, 'zobrazNabidku', {enumerable: true,
        value: function (kterou) {
//            $('[data-ctrl]').css('display', 'none');
//            $('[data-ctrl="'+kterou+'"]').css('display', 'block');
//
//            if (kterou==='editace_sveta') {
//                GUI.nahratVyberPodlah();
//            }
        }
    });


    /////////////////////////////////////////////////////////////////////////////////////
    ///    interkace myší
//
//    on_click_prochazeni = function (e) {
//        var pozice;
//        pozice = GUI.pozicePodleMysi(e);
//        if (pozice===null) return;
//        if (!editor_vyber_oznaceni) {
//            editor_vyber_oznaceni = Objekt.Oznaceni.new();
//            editor_vyber_oznaceni.vytvorMesh();
//            platno.scene.add(editor_vyber_oznaceni.mesh);
//        }
//        editor_vyber_oznaceni.posunNaV3(svet.poziceV3(pozice.index));
//        platno.redraw();
//
//        editor_vybrana_p = pozice;
//    };

    return proto;
})();