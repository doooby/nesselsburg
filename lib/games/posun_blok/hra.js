/**
 * Created by doooby on 11.10.14.
 */

var Hra = (function () {
    var proto, klass, stisk, natoceni_pohledu;

    proto = {};
    klass = {};
    natoceni_pohledu = Math.PI / 6;

    Object.defineProperty(proto, 'zacit', {
        value: function () {
            var jq_document, pozice_hrace;
            jq_document = $(document);

            pozice_hrace = this.poziceHrace();
            pozice_hrace.blok.odeberZeSceny(pozice_hrace, svet, platno.scene);

            jq_document.on('keydown', on_keydown);
            jq_document.on('keyup', on_keyup);

            this.aktualizujKameru();
        }
    });

    Object.defineProperty(proto, 'ukoncit', {
        value: function () {
            var jq_document, pozice_hrace;
            jq_document = $(document);

            pozice_hrace = this.poziceHrace();
            pozice_hrace.blok.pridejNaScenu(pozice_hrace, svet, platno.scene);

            jq_document.off('keydown', on_keydown);
            jq_document.off('keyup', on_keyup);
        }
    });

    Object.defineProperty(proto, 'aktualizujKameru', {
        value: function () {
            var pozice_hrace, h, stred , cos_smer, sin_smer;
            pozice_hrace = this.poziceHrace();
            h = pozice_hrace.blok;
            stred = svet.poziceV3(this.poziceHrace().index);
            cos_smer = Math.cos(this.smer);
            sin_smer = Math.sin(this.smer);
            platno.camera.position = new THREE.Vector3(
                    stred.x - (h.oci_posun * cos_smer),
                    stred.y - (h.oci_posun * sin_smer),
                h.oci_vyska
            );
            platno.camera.lookAt(new THREE.Vector3(
                    stred.x + (h.pohle_delka * cos_smer),
                    stred.y + (h.pohle_delka * sin_smer),
                h.pohled_vyska
            ));
            platno.redraw();
        }
    });

    Object.defineProperty(proto, 'poziceHrace', {
        value: function () {
            return svet.pozice[this.hrac];
        }
    });

    function on_keydown(e) {
        if (!stisk) {
            stisk = true;
            switch (e.keyCode) {
                case 37: // left 37, a 97
                    hra.smer += natoceni_pohledu;
                    if (hra.smer >= 2 * Math.PI) hra.smer -= 2 * Math.PI;
                    break;
                case 39: // right 39, d 100
                    hra.smer -= natoceni_pohledu;
                    if (hra.smer <= 0) hra.smer += 2 * Math.PI;
                    break;
                case 38: // up 38, w 119
                    if (!popojit_hracem.call(hra)) return;
                    break;
//                case 40: // down 40, s 155
//                    break;
                default:
                    return;
            }
            hra.aktualizujKameru();
        }
    }

    function on_keyup() {
        stisk = false;
    }

    function popojit_hracem() {
        var aktualni_pozice = this.poziceHrace(), nova_pozice, xy, hrac_kam;
        xy = svet.poziceXY(aktualni_pozice.index);
        switch (Math.floor((this.smer + Math.PI / 4) * 2 / Math.PI)) {
            case 1:
                xy[1] += 1; break;
            case 2:
                xy[0] -= 1; break;
            case 3:
                xy[1] -= 1; break;
            case 0:
            case 4:
                xy[0] += 1; break;
        }
        hrac_kam = svet.poziceIndex(xy[0], xy[1]);
        if (typeof hrac_kam==='number') {
            nova_pozice = svet.pozice[hrac_kam];

            if (!nova_pozice.blok) {
                nova_pozice.vsunBlokZ(aktualni_pozice, svet);
                this.hrac = hrac_kam;

                return true;
            }
        }
        return false;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,
        value: function(svet) {
            var new_object, data_sveta = svet.jsonData;

            new_object = Object.create(proto, {
                hrac: {value: (function () {
                    var i, blok;
                    for (i=0;i<svet.pozice.length;i+=1) {
                        blok = svet.pozice[i].blok;
                        if (blok && blok.typ<6) return i;
                    }
                    throw 'Ve světě není hráč!'
                })(), writable: true},
                smer: {value: 0, writable: true}
//                _podlaha: {enumerable: true, value: null, writable: true},
//                _blok: {enumerable: true, value: null, writable: true}
            });

            Object.defineProperty(new_object, 'restart', {
                value: function () {
                    this.ukonci();
                    GUI.znicSvet();
                    svet = Svet.newZJsonDat(data_sveta);
                    svet.initObjekty(platno.scene);
                    this.zacit();
                }
            });

            return new_object;
        }
    });

    return Object.freeze(klass);
})();