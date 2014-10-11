/**
 * Created by doooby on 19.8.14.
 */

var Pozice = (function () {
    var proto, klass;
    proto = {};
    klass = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'podlaha', {enumerable: true,
        set: function (ti) {
            if (ti<20 || ti>49) throw 'Objekt musí být typu podlaha (19 < ti < 50)!';
            if (this._podlaha && this._podlaha.typ===ti) return;
            var o = Objekt.new(ti);
            this._podlaha = o;
            return o;
        },
        get: function () {return this._podlaha;}
    });

    Object.defineProperty(proto, 'blok', {enumerable: true,
        set: function (ti) {
            if (ti>19 && ti<50) throw 'Objekt musí být typu speciální (ti < 20) nebo blok (ti >= 50)!';
            if (this._blok && this._blok.typ===ti) return;
            var o = Objekt.new(ti);
            this._blok = o;
            return o;
        },
        get: function () {return this._blok;}
    });

    Object.defineProperty(proto, 'vsunBlokZ', {value: function (z, svet) {
        if (!z || !z.blok) return false;

        this._blok = z.blok;
        this.blok.posunNaV3(svet.poziceV3(this.index));
        z._blok = null;

        return true;
    }});

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,
        value: function(index, podlaha_blok) {
            var new_object;
            new_object = Object.create(proto, {
                index: {enumerable: true, value: index},
                _podlaha: {enumerable: true, value: null, writable: true},
                _blok: {enumerable: true, value: null, writable: true}
            });
            if (typeof podlaha_blok==='object') {
                if (podlaha_blok[0]!=0) new_object.podlaha = podlaha_blok[0];
                if (podlaha_blok[1]!=0) new_object.blok = podlaha_blok[1];
            }
            return new_object;
        }
    });

    return Object.freeze(klass);
})();
