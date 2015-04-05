/**
 * Created by doooby on 13.9.14.
 */

GUI.editor = (function () {
    var proto, zapnut, nastroj, vybery_nahrane;
    var key_repeater, mouse_held, down_pozice, up_pozice, current_pozice, oznaceni_pozic;
    var cam_radius, cam_inclination, cam_azimuth, cam_stred;

    proto = {};

    Object.defineProperty(proto, 'zapnuty', {enumerable: true,
        set: function (val) {
            if (val===zapnut) return;
            var jq_container, jq_document;
            jq_container = $(platno.container);
            jq_document = $(document);
            if (val) {
                jq_container.on('mousedown', on_mousedown);
                jq_container.on('mouseup', on_mouseup);
                jq_container.on('mousemove', on_mousemove);
                jq_container.on('mousewheel', on_mousewheel);
                jq_document.on('keydown', on_keydown);
                jq_document.on('keyup', on_keyup);
                $('input[value="novy_svet"]').click();
                proto.zapniNastroj('novy_svet');
                if (!vybery_nahrane) {
                    var select_tagy, pridani_moznosti;
                    pridani_moznosti = function (ti, typ) {
                        select_tagy.append($('<option>', {value: ti, html: typ.nazev}));
                    };
                    //podlahy
                    select_tagy = $('[name="vyber_podlahy"]');
                    Objekt.proVsechnyTypyPodlah(pridani_moznosti);
                    //bloky
                    select_tagy = $('[name="vyber_bloku"]');
                    Objekt.proVsechnyTypySpecialni(pridani_moznosti);
                    Objekt.proVsechnyTypyBloku(pridani_moznosti);
                    vybery_nahrane = true;
                }
                if (svet) move_camera(true);
            }
            else {
                jq_container.off('mousedown', on_mousedown);
                jq_container.off('mouseup', on_mouseup);
                jq_container.off('mousemove', on_mousemove);
                jq_container.off('mousewheel', on_mousewheel);
                jq_document.off('keydown', on_keydown);
                jq_document.off('keyup', on_keyup);
                vymazatOznaceni();
            }
            zapnut = val;
        }, get: function () {return zapnut}
    });

    Object.defineProperty(proto, 'zapniNastroj', {enumerable: true,
        value: function (ktery) {
            var prekreslit = false;
            $('[data-nastroj]').css('display', 'none');
            $('[data-nastroj="'+ktery+'"]').css('display', 'block');
            nastroj = ktery;

            if (vymazatOznaceni()) prekreslit = true;
            if (prekreslit) platno.redraw();
        }
    });

    function vymazatOznaceni () {
        if (oznaceni_pozic) {
            oznaceni_pozic.odeberZeSceny(null, svet, platno.scene);
            oznaceni_pozic = null;
            return true;
        }
        return false;
    }

    function typVyberu(selector) {
        var ret;
        ret = parseInt($(selector).val());
        return (isNaN(ret) ? null : ret);
    }

    Object.defineProperty(proto, 'vytvorSvet', {enumerable: true,
        value: function () {
            var new_svet, i, sirka, vyska, typ_podlahy, pozice, pozic;
            sirka = parseInt($('#new_sirka').val());
            vyska = parseInt($('#new_vyska').val());
            typ_podlahy = typVyberu('#new_podlaha');
            if (!isNaN(sirka) && !isNaN(vyska) && typ_podlahy)
                pozic = sirka * vyska;
            pozice = [];
            for (i = 0; i < pozic; i += 1) pozice.push(Pozice.new(i, [typ_podlahy, 0]));
            new_svet = Svet.new(pozice, sirka);
            GUI.znicSvet();
            svet = new_svet;
            svet.initObjekty(platno.scene);
            move_camera(true);
        }
    });

    Object.defineProperty(proto, 'vlozBloky', {enumerable: true,
        value: function () {
            var p, typ, prekreslit;
            prekreslit = false;
            typ = typVyberu('#vloz_blok');
            if (oznaceni_pozic && typ) {
                oznaceni_pozic.proKazdouPozici(function (x, y) {
                    var soucasny_blok;
                    p = svet.pozice[svet.poziceIndex(x, y)];
                    soucasny_blok = p.blok;

                    if (typ!==(soucasny_blok && soucasny_blok.typ)) {
                        if (soucasny_blok) {
                            soucasny_blok.odeberZeSceny(p, svet, platno.scene);
                        }
                        p.blok = typ;
                        p.blok.pridejNaScenu(p, svet, platno.scene);
                        prekreslit = true;
                    }
                });
            }
            if (prekreslit) platno.redraw();
        }
    });

    Object.defineProperty(proto, 'vymazBloky', {enumerable: true,
        value: function () {
            var p, prekreslit;
            prekreslit = false;
            if (oznaceni_pozic) {
                oznaceni_pozic.proKazdouPozici(function (x, y) {
                    p = svet.pozice[svet.poziceIndex(x, y)];
                    if (p.blok) {
                        p.blok.odeberZeSceny(p, svet, platno.scene);
                        p._blok = null;
                        prekreslit = true;
                    }
                });
            }
            if (prekreslit) platno.redraw();
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////
    ///    interkace myší

    function akce (udalost) {
        switch (nastroj) {
            case 'pruzkum_sveta':
                if (udalost==='mousedown' || (udalost==='mousemove' && mouse_held)){
                    var prekreslit = false;
                    if (vymazatOznaceni()) prekreslit = true;
                    if (down_pozice && current_pozice) {
                        var down_xy, up_xy, min_xy, max_xy;
                        down_xy = svet.poziceXY(down_pozice.index);
                        up_xy = svet.poziceXY(current_pozice.index);
                        min_xy = [down_xy[0], down_xy[1]];
                        if (min_xy[0]>up_xy[0]) min_xy[0] = up_xy[0];
                        if (min_xy[1]>up_xy[1]) min_xy[1] = up_xy[1];
                        max_xy = [down_xy[0], down_xy[1]];
                        if (max_xy[0]<up_xy[0]) max_xy[0] = up_xy[0];
                        if (max_xy[1]<up_xy[1]) max_xy[1] = up_xy[1];
                        oznaceni_pozic = Objekt.Oznaceni.new([min_xy, max_xy]);
                        oznaceni_pozic.pridejNaScenu(null, svet, platno.scene);
                        prekreslit = true;
                    }
                    if (prekreslit) platno.redraw();
                }
                break;
            case 'editace_podlahy':
                if (current_pozice && (udalost==='mousedown' || (udalost==='mousemove' && mouse_held))) {
                    var vybrany_typ, soucasna_podlaha;
                    vybrany_typ = typVyberu('#vloz_podlahu');
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
    }

    function get_pozice_mysi (e) {
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

    function move_camera (nastav_def) {
        if (nastav_def) {
            cam_stred = new THREE.Vector3((svet.sirka-1)*SIRKA_BLOKU/2.0, (svet.vyska-1)*SIRKA_BLOKU/2.0, 0);
            cam_radius = 20;
            cam_inclination = 1.22;
            cam_azimuth = 0;
        }

        platno.camera.position = new THREE.Vector3(
                Math.sin(cam_inclination) * Math.cos(cam_azimuth),
                Math.sin(cam_inclination) * Math.sin(cam_azimuth),
            Math.cos(cam_inclination)

        ).multiplyScalar(cam_radius).add(cam_stred);
        platno.camera.lookAt(cam_stred);

        platno.redraw();
    }

    function on_mousedown (e) {
        mouse_held = true;
        if (svet) {
            down_pozice = get_pozice_mysi(e);
            current_pozice = down_pozice;
            akce('mousedown');
        }
    }

    function on_mouseup (e) {
        mouse_held = false;
        if (svet) {
            up_pozice = get_pozice_mysi(e);
            current_pozice = up_pozice;
            akce('mouseup');
        }
    }

    function on_mousemove (e) {
        if (svet) {
            current_pozice = get_pozice_mysi(e);
            akce('mousemove');
        }
    }

    function on_mousewheel (e) {
        if (e.originalEvent.wheelDelta<0) cam_radius += 1;
        else cam_radius -=1;
        move_camera();
    }

    function on_keydown(e) {
        if (!key_repeater) {
            function f () {
                if (svet) {
                    switch (e.keyCode) {
                        case 39: // right 39, d 100
                            cam_azimuth += 0.04;
                            if (cam_azimuth >= 2 * Math.PI) cam_azimuth -= 2 * Math.PI;
                            break;
                        case 37: // left 37, a 97
                            cam_azimuth -= 0.04;
                            if (cam_azimuth <= 0) cam_azimuth += 2 * Math.PI;
                            break;
                        case 38: // up 38, w 119
                            cam_inclination -= 0.02;
                            if (cam_inclination < 0.45) cam_inclination = 0.45;
                            break;
                        case 40: // down 40, s 155
                            cam_inclination += 0.02;
                            if (cam_inclination > 1.22) cam_inclination = 1.22;
                            break;
                        default:
                            return;
                    }
                    move_camera();
                }
            }
            f();
            key_repeater = setInterval(f, 100);
        }
    }

    function on_keyup() {
        clearInterval(key_repeater);
        key_repeater = null;
    }

    return proto;
})();
