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

    Object.defineProperty(proto, 'vsunBlokZ', {value: function (z, svet, smer_cislo) {
        if (this.blok) {
            svet.poziceSmerem(this, smer_cislo).vsunBlokZ(this, svet, smer_cislo);
        }
        this._blok = z.blok;
        this.blok.posunNaV3(svet.poziceV3(this.index));
        z._blok = null;
    }});

    Object.defineProperty(proto, 'lzeVsunout', {value: function (z, svet, smer_cislo, sila) {
        var nasledna_pozice, sila_po_posunu;

        sila_po_posunu = sila;
        if (this.podlaha) sila_po_posunu -= this.podlaha.potrebna_sila;
        if (this.blok) sila_po_posunu -= this.blok.potrebna_sila;
        if (isNaN(sila_po_posunu)) return false;

        if (this.blok) {
            nasledna_pozice = svet.poziceSmerem(this, smer_cislo);
            if (!nasledna_pozice) return false;
            if (sila_po_posunu < 0) return false;
            if (!nasledna_pozice.lzeVsunout(this, svet, smer_cislo,sila_po_posunu)) return false;
        }

        //kontrola podlahy
//        if (this.podlaha) {
//
//        }

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
