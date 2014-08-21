/**
 * Created by doooby on 19.8.14.
 */

var Pozice = (function () {
    var proto, klass;

    proto = {}; ///////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'pridejObjektTypu', {enumerable: true,
        value: function (typ) {
            var o = Objekt.novyTypu(typ);
            this.objekty.push(o);
            return o;
        }
    });

    Object.defineProperty(proto, 'typyObjektu', {enumerable: true,
        value: function () {
            var i, ret;
            ret = [];
            for (i=0;i<this.objekty.length;i+=1) ret.push(this.objekty[i].typ);
        }
    });

    Object.freeze(proto);

    klass = {}; /////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,
        value: function(index, definice_objektu) {
            var new_object, i, typ;
            new_object = Object.create(proto, {
                index: {enumerable: true, value: index},
                objekty: {enumerable:true, writable: true, value: []}
            });
            if (typeof definice_objektu==='object') {
                for (i=0;i<definice_objektu.length;i+=1) {
                    typ = definice_objektu[i];
                    new_object.pridejObjektTypu(typ);
                }
            }

            return new_object;
        }
    });

    return Object.freeze(klass);
})();
