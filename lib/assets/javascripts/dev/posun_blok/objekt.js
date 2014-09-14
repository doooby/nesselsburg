/**
 * Created by doooby on 21.8.14.
 */

var Objekt = (function () {
    var proto, klass, typy, typy_podlah;
    proto = {};
    klass = {};
    typy = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

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

    Object.defineProperty(proto, 'pridejNaScenu', {enumerable: true,
        value: function (pozice, svet, scene) {
            this.vytvorMesh();
            this.posunNaV3(svet.poziceV3(pozice.index));
            scene.add(this.mesh);
        }
    });

    Object.defineProperty(proto, 'odeberZeSceny', {enumerable: true,
        value: function (pozice, svet, scene) {
            scene.remove(this.mesh);
            this.mesh = null;
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'base', {enumerable: true, value: proto});

    Object.defineProperty(klass, 'new', {enumerable: true,
        value: function(typ) {
            if (typeof typ!=='number') throw 'Nový objekt musí být vytvořen podle číselného typu.';
            if (!typy.hasOwnProperty(typ)) throw 'Objekt typu '+typ+' neznám.';
            return typy[typ].new();
        }
    });

    Object.defineProperty(klass, 'zaregistrujTyp', {enumerable: true,
        value: function (typ, proto_klass, klass, nazev) {
            if (typeof typ!=='number') throw 'Typ objektů k registraci musí být číslo.';
            if (typy[typ]!==undefined) throw 'Typ objektů '+typ+' byl již zaregistrován.';
            Object.defineProperty(proto_klass, 'typ', {enumerable: true, value: typ});
            Object.defineProperty(proto_klass, 'mesh', {enumerable: true, value: null, writable: true});
            Object.defineProperty(klass, 'nazev', {enumerable: true, value: nazev});
            Object.defineProperty(typy, typ, {enumerable: true, value: klass});
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
                        if (!isNaN(ti) && ti>19 && ti<50) typy_podlah.push(t);
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