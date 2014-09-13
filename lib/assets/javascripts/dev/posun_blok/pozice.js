/**
 * Created by doooby on 19.8.14.
 */

var Pozice = (function () {
    var proto, klass;
    proto = {};
    klass = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'pridejObjektTypu', {enumerable: true,
        value: function (typ) {
            var o = Objekt.new(typ);
            this.objekty.push(o);
            return o;
        }
    });

    Object.defineProperty(proto, 'kazdyObjekt', {enumerable: true,
        value: function (f) {
            var i;
            for (i=0;i<this.objekty.length;i+=1) f(this.objekty[i]);
        }
    });

    Object.defineProperty(proto, 'typyObjektu', {enumerable: true,
        value: function () {
            var typy;
            typy = [];
            this.kazdyObjekt(function (o) {typy.push(o.typ)});
            return typy;
        }
    });

    Object.defineProperty(proto, 'zmenPodlahu', {enumerable: true,
        value: function (typ) {
            var i, o, o_new;
            for (i=0;i<this.objekty.length;i+=1) {
                o = this.objekty[i];
                if (o.typ>=10 && o.typ<20) {
                    o_new = Objekt.new(typ);
                    this.objekty[i] = o_new;
                    return [o, o_new];
                }
            }
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

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

//    Object.freeze(proto);
    return Object.freeze(klass);
})();
