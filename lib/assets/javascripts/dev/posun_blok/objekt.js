/**
 * Created by doooby on 21.8.14.
 */

var Objekt = (function () {
    var proto, klass, typy, typy_podlah;
    proto = {};
    klass = {};
    typy = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'typ', {enumerable: true, value: 0});

    Object.defineProperty(proto, 'mesh', {enumerable: true, writable: true,
        value: null
    });

    Object.defineProperty(proto, 'vytvorMesh', {enumerable: true,
        value: function () {}
    });

    Object.defineProperty(proto, 'posunNaV3', {enumerable: true,
        value: function (v3) {
            if (this.mesh) {
                this.mesh.position = v3;
                this.mesh.updateMatrix();
            }
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'base', {enumerable: true, value: proto});

    Object.defineProperty(klass, 'new', {enumerable: true,
        value: function(typ) {
            if (typeof typ!=='number') throw 'Nový objekt musí být vytvořen podle číselného typu.';
            return typy[typ].new();
        }
    });

    Object.defineProperty(klass, 'zaregistrujTyp', {enumerable: true,
        value: function (typ, proto_klass, klass, nazev) {
            if (typeof typ!=='number') throw 'Typ objektů k registraci musí být číslo.';
            if (typy[typ]!==undefined) throw 'Typ objektů '+typ+' byl již zaregistrován.';
            Object.defineProperty(proto_klass, 'typ', {enumerable: true, value: typ});
            Object.defineProperty(typy, typ, {enumerable: true, value: klass});
            Object.defineProperty(klass, 'nazev', {enumerable: true, value: nazev});
        }
    });


    Object.defineProperty(klass, 'proVsechnyTypyPodlah', {enumerable: true,
        value: function (f) {
            if (!typy_podlah) {
                var t, ti;
                typy_podlah = [];
                for (t in typy) {
                    if (typy.hasOwnProperty(t)) {
                        ti = parseInt(t);
                        if (!isNaN(ti) && ti>=10 && ti<20) typy_podlah.push(t);
                    }
                }
            }
            var i;
            for (i=0;i<typy_podlah.length;i+=1) f(typy_podlah[i], typy[typy_podlah[i]]);
        }
    });

//    Object.freeze(proto);
//    return Object.freeze(klass);
    return klass;
})();