/**
 * Created by doooby on 21.8.14.
 */

var Objekt = (function () {
    var proto, klass;

    proto = {}; ///////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'createMesh', {enumerable: true,
        value: function () {
        }
    });

    Object.defineProperty(proto, 'translateTo', {enumerable: true,
        value: function (vector) {
        }
    });

    Object.freeze(proto);

    klass = {}; /////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'prototyp', {enumerable: true, value: proto});

    Object.defineProperty(klass, 'novyTypu', {enumerable: true,
        value: function(typ) {
            var typ_klass;
            typ_klass = null;
            return Objekt.create(typ_klass.prototype, typ_klass.definiceAtributu || {});
        }
    });

    return Object.freeze(klass);
})();