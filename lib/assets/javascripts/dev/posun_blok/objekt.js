/**
 * Created by doooby on 21.8.14.
 */

var Objekt = (function () {
    var proto, klass, typy;
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
                v3.x += SIRKA_BLOKU/2;
                v3.y += SIRKA_BLOKU/2;
                v3.z += -0.2;
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
        value: function (typ, proto_klass, klass) {
            if (typeof typ!=='number') throw 'Typ objektů k registraci musí být číslo.';
            if (typy[typ]!==undefined) throw 'Typ objektů '+typ+' byl již zaregistrován.';
            Object.defineProperty(proto_klass, 'typ', {enumerable: true,value: typ});
            Object.defineProperty(typy, typ, {enumerable: true, value: klass});
        }
    });

//    Object.freeze(proto);
    return Object.freeze(klass);
})();