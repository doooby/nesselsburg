/**
 * Created by doooby on 3.9.14.
 */

var GUI;
GUI = (function () {
    var proto;
    var vyber_podlah_nahran, editor_vybrana_p, editor_vyber_oznaceni, menit_podlahu, zmenit_podlahu;
    var on_click_prochazeni, on_move_podlahy, on_down_podlahy, on_up_podlahy;

    proto = {};

    Object.defineProperty(proto, 'kkk', {enumerable: true,
        value: function () {

        }
    });

    Object.defineProperty(proto, 'vytvorSvet', {enumerable: true,
        value: function () {
            GUI.znicSvet();
            var i, sirka, vyska, podlaha, pozice, pozic;
            sirka = parseInt($('#sirka').val());
            vyska = parseInt($('#vyska').val());
            pozic = sirka * vyska;
            pozice = [];
            podlaha = parseInt($('[data-podmenu="novy_svet"]').find('[name="vyber_podlahy"]').val());
            for (i = 0; i < pozic; i += 1) pozice.push(Pozice.new(i, [podlaha]));
            svet = Svet.new(pozice, sirka);
            svet.initObjekty(platno.scene);
            platno.redraw();
        }
    });

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
            $('[data-ctrl]').css('display', 'none');
            $('[data-ctrl="'+kterou+'"]').css('display', 'block');

            if (kterou==='editace_sveta') {
                GUI.nahratVyberPodlah();
            }
        }
    });

    Object.defineProperty(proto, 'zobrazPodmenu', {enumerable: true,
        value: function (ktere) {
            $('[data-podmenu]').css('display', 'none');
            $('[data-podmenu="'+ktere+'"]').css('display', 'block');

            if (ktere==='pruzkum_sveta' && svet){
                $(platno.container).on('click', on_click_prochazeni);
            }
            else {
                $(platno.container).off('click', on_click_prochazeni);
                editor_vybrana_p = null;
                if (editor_vyber_oznaceni) {
                    platno.scene.remove(editor_vyber_oznaceni.mesh);
                    editor_vyber_oznaceni = null;
                    platno.redraw();
                }
            }

            if (ktere==='editace_podlahy' && svet) {
                $(platno.container).on('mousemove', on_move_podlahy);
                $(platno.container).on('mousedown', on_down_podlahy);
                $(platno.container).on('mouseup', on_up_podlahy);
            }
            else {
                $(platno.container).off('mousemove', on_move_podlahy);
                $(platno.container).off('mousedown', on_down_podlahy);
                $(platno.container).off('mouseup', on_up_podlahy);
                editor_vybrana_p = null;
            }
        }
    });

    Object.defineProperty(proto, 'nahratVyberPodlah', {enumerable: true,
        value: function () {
            if (!vyber_podlah_nahran) {
                var select_tagy = $('[name="vyber_podlahy"]');
                Objekt.proVsechnyTypyPodlah(function (ti, typ) {
                    select_tagy.append($('<option>', {value: ti, html: typ.nazev}));
                });
                vyber_podlah_nahran = true;
            }
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////
    ///    interkace myší

    on_click_prochazeni = function (e) {
        var pozice;
        pozice = GUI.pozicePodleMysi(e);
        if (pozice===null) return;
        if (!editor_vyber_oznaceni) {
            editor_vyber_oznaceni = Objekt.Oznaceni.new();
            editor_vyber_oznaceni.vytvorMesh();
            platno.scene.add(editor_vyber_oznaceni.mesh);
        }
        editor_vyber_oznaceni.posunNaV3(svet.poziceV3(pozice.index));
        platno.redraw();

        editor_vybrana_p = pozice;
    };

    on_move_podlahy = function (e) {
        var pozice;
        pozice = GUI.pozicePodleMysi(e);
        if (pozice===null) return;
        if (pozice!==editor_vybrana_p) {
            editor_vybrana_p = pozice;
            if (menit_podlahu) zmenit_podlahu();
        }
    };

    zmenit_podlahu = function () {
        if (editor_vybrana_p) {
            var oo;
            podlaha = parseInt($('[data-podmenu="editace_podlahy"]').find('[name="vyber_podlahy"]').val());
            oo = editor_vybrana_p.zmenPodlahu(podlaha);
            platno.scene.remove(oo[0].mesh);
            oo[1].vytvorMesh();
            oo[1].posunNaV3(svet.poziceV3(editor_vybrana_p.index));
            platno.scene.add(oo[1].mesh);
            platno.redraw();
        }
    };

    on_down_podlahy = function () {
        menit_podlahu = true;
        zmenit_podlahu();
    };

    on_up_podlahy = function () {
        menit_podlahu = false;
    };

    Object.defineProperty(proto, 'pozicePodleMysi', {enumerable: true,
        value: function (e) {
            var rayc, v, x, y;
            rayc = THREE.Ray.pickingRay(platno, e);
            v = rayc.ray.vectorAtZ(0);
            v.x += SIRKA_BLOKU/2;
            v.y += SIRKA_BLOKU/2;
            x = v.x/SIRKA_BLOKU;
            y = v.y/SIRKA_BLOKU;
            if (x<0 || x>svet.sirka || y<0 || y>svet.sirka) return null;
            return svet.pozice[Math.floor(y)*svet.sirka + Math.floor(x)];
        }
    });

    Object.freeze(proto);
    return proto;
})();