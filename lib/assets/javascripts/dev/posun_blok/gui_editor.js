/**
 * Created by doooby on 13.9.14.
 */

GUI.editor = (function () {
    var proto, zapnut, nastroj, vybery_nahrane, akce;
    var on_mousedown, on_mouseup, on_mousemove, get_pozice_mysi;
    var mouse_held, down_pozice, up_pozice, current_pozice, vyber_pozic;
//    var vyber_podlah_nahran, editor_vybrana_p, editor_vyber_oznaceni, menit_podlahu, zmenit_podlahu;
//    var on_click_prochazeni, on_move_podlahy, on_down_podlahy, on_up_podlahy;

    proto = {};

    Object.defineProperty(proto, 'zapnuty', {enumerable: true,
        set: function (val) {
            if (val===zapnut) return;
            if (val) {
                $(platno.container).on('mousedown', on_mousedown);
                $(platno.container).on('mouseup', on_mouseup);
                $(platno.container).on('mousemove', on_mousemove);
                $('input[value="novy_svet"]').click();
                proto.zapniNastroj('novy_svet');
                if (!vybery_nahrane) {
                    //podlahy
                    var select_tagy = $('[name="vyber_podlahy"]');
                    Objekt.proVsechnyTypyPodlah(function (ti, typ) {
                        select_tagy.append($('<option>', {value: ti, html: typ.nazev}));
                    });

                    vybery_nahrane = true;
                }
            }
            else {
                $(platno.container).off('mousedown', on_mousedown);
                $(platno.container).off('mouseup', on_mouseup);
                $(platno.container).off('mousemove', on_mousemove);

            }
            zapnut = val;
        }, get: function () {return zapnut}
    });

    Object.defineProperty(proto, 'zapniNastroj', {enumerable: true,
        value: function (ktery) {
            $('[data-nastroj]').css('display', 'none');
            $('[data-nastroj="'+ktery+'"]').css('display', 'block');
            nastroj = ktery;

//            if (ktery==='pruzkum_sveta' && svet){
//                $(platno.container).on('click', on_click_prochazeni);
//            }
//            else {
//                $(platno.container).off('click', on_click_prochazeni);
//                editor_vybrana_p = null;
//                if (editor_vyber_oznaceni) {
//                    platno.scene.remove(editor_vyber_oznaceni.mesh);
//                    editor_vyber_oznaceni = null;
//                    platno.redraw();
//                }
//            }
//
//            if (ktery==='editace_podlahy' && svet) {
//                $(platno.container).on('mousemove', on_move_podlahy);
//                $(platno.container).on('mousedown', on_down_podlahy);
//                $(platno.container).on('mouseup', on_up_podlahy);
//            }
//            else {
//                $(platno.container).off('mousemove', on_move_podlahy);
//                $(platno.container).off('mousedown', on_down_podlahy);
//                $(platno.container).off('mouseup', on_up_podlahy);
//                editor_vybrana_p = null;
//            }
        }
    });

    akce = function (udalost) {
        switch (nastroj) {
            case 'pruzkum_sveta':
                if (down_pozice && up_pozice && udalost=='mouseup') {
                    if (down_pozice==up_pozice) {

                    }
                    else {
//                        console.log('down:'+down_pozice.index+' up:'+up_pozice.index);
                    }
                }
                break;
            case 'editace_podlahy':
                if (current_pozice && (udalost==='mousedown' || (udalost==='mousemove' && mouse_held))) {
                    var vybrany_typ, soucasna_podlaha;
                    vybrany_typ = parseInt($('[data-nastroj="editace_podlahy"]').find('[name="vyber_podlahy"]').val());
                    soucasna_podlaha = current_pozice.podlaha;

                    if (vybrany_typ!==(soucasna_podlaha && soucasna_podlaha.typ)) {
                        if (soucasna_podlaha) {
                            soucasna_podlaha.odeberZeSceny(current_pozice, svet, platno.scene);
                        }
                        current_pozice.podlaha = vybrany_typ;
                        current_pozice.podlaha.pridejNaScenu(current_pozice, svet, platno.scene);
                        platno.redraw();
                    }
                }
                break;
        }
    };

    Object.defineProperty(proto, 'vytvorSvet', {enumerable: true,
        value: function () {
            var new_svet, i, sirka, vyska, podlaha, pozice, pozic;
            sirka = parseInt($('#new_sirka').val());
            vyska = parseInt($('#new_vyska').val());
            pozic = sirka * vyska;
            pozice = [];
            podlaha = parseInt($('#new_podlaha').val());
            for (i = 0; i < pozic; i += 1) pozice.push(Pozice.new(i, [podlaha, 0]));
            new_svet = Svet.new(pozice, sirka);
            GUI.znicSvet();
            svet = new_svet;
            svet.initObjekty(platno.scene);
            platno.redraw();
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////
    ///    interkace myší

    get_pozice_mysi = function (e) {
        var rayc, v, x, y;
        rayc = THREE.Ray.pickingRay(platno, e);
        v = rayc.ray.vectorAtZ(0);
        v.x += SIRKA_BLOKU/2;
        v.y += SIRKA_BLOKU/2;
        x = v.x/SIRKA_BLOKU;
        y = v.y/SIRKA_BLOKU;
        if (x<0 || x>svet.sirka || y<0 || y>svet.sirka) return null;
        return svet.pozice[Math.floor(y)*svet.sirka + Math.floor(x)];
    };

    on_mousedown = function (e) {
        mouse_held = true;
        if (svet) {
            down_pozice = get_pozice_mysi(e);
            current_pozice = down_pozice;
            akce('mousedown');
        }
    };

    on_mouseup = function (e) {
        mouse_held = false;
        if (svet) {
            up_pozice = get_pozice_mysi(e);
            current_pozice = up_pozice;
            akce('mouseup');
        }
    };

    on_mousemove = function (e) {
        if (svet) {
            current_pozice = get_pozice_mysi(e);
            akce('mousemove');
        }
    };

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
//

    return proto;
})();
