/**
 * Created by doooby on 20.8.14.
 */

var Svet = (function () {
    var proto, klass;
    proto = {};
    klass = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'jsonData', {enumerable: true,
        get: function () {
            var i, p, pozice_typy;
            pozice_typy = [];
            for (i=0;i<this.pozice.length;i+=1) {
                p = this.pozice[i];
                pozice_typy.push([
                        (p.podlaha && p.podlaha.typ) || 0,
                        (p.blok && p.blok.typ) || 0
                ]);
            }
            return JSON.stringify({sirka: this.sirka, pozice: pozice_typy});
        }
    });

    Object.defineProperty(proto, 'initObjekty', {enumerable: true,
        value: function (scene) {
            var s = this;
            this.kazdaPozice(function (p) {
                if (p.podlaha) p.podlaha.pridejNaScenu(p, s, scene);
                if (p.blok) p.blok.pridejNaScenu(p, s, scene);
            });
        }
    });

    Object.defineProperty(proto, 'dispObjekty', {enumerable: true,
        value: function (scene) {
            var s = this;
            this.kazdaPozice(function (p) {
                if (p.podlaha) p.podlaha.odeberZeSceny(p, s, scene);
                if (p.blok) p.blok.odeberZeSceny(p, s, scene);
            });
        }
    });

    Object.defineProperty(proto, 'vymenPodlahu', {enumerable: true,
        value: function (pozice, ti_podlahy, scene) {
            var oo;
            oo = pozice.zmenPodlahu(ti_podlahy);
            platno.scene.remove(oo[0].mesh);
            oo[1].vytvorMesh();
            oo[1].posunNaV3(svet.poziceV3(editor_vybrana_p.index));
            platno.scene.add(oo[1].mesh);
            platno.redraw();
        }
    });

    Object.defineProperty(proto, 'kazdaPozice', {enumerable: true,
        value: function (f) {
            var i;
            for (i=0;i<this.pozice.length;i+=1) f(this.pozice[i]);
        }
    });

    Object.defineProperty(proto, 'poziceV3', {enumerable: true,
        value: function (index) {
            return new THREE.Vector3((index%this.sirka)*SIRKA_BLOKU, Math.floor(index/this.sirka)*SIRKA_BLOKU ,0);
        }
    });

    Object.defineProperty(proto, 'poziceIndex', {enumerable: true,
        value: function (x, y) {
            if (x<0 || x>=this.sirka || y<0 || y>=this.sirka) return null;
            return Math.floor(y)*this.sirka + Math.floor(x);
        }
    });

    Object.defineProperty(proto, 'poziceXY', {enumerable: true,
        value: function (i) {
            var x, y;
            y = Math.floor(i/this.sirka);
            x = i - y*this.sirka;
            return [x, y];
        }
    });

    Object.defineProperty(proto, 'poziceSmerem', {enumerable: true,
        value: function (z, smer_cislo) {
            var xy, nova_pozice;
            if (!z) return null;

            xy = this.poziceXY(z.index);
            switch (smer_cislo) {
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
            nova_pozice = this.poziceIndex(xy[0], xy[1]);
            return nova_pozice && this.pozice[nova_pozice];
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,
        value: function(vsechny_pozice, sirka) {
            if (!vsechny_pozice) throw "Pozice musí být pole pozic.";
            if (typeof sirka!=='number') throw 'Šířka nového světa musí být číslo.';

            var new_object, vyska, vertices, x, y;

            Object.freeze(vsechny_pozice);

//            vertices = [];
//            for (y=0;y<=vyska;y+=1) for (x=0;x<=sirka;x+=1) {
//                vertices.push();
//            }
//            Object.freeze(vertices);

            vyska = vsechny_pozice.length/sirka;
            new_object = Object.create(proto, {
                pozice: {value: vsechny_pozice, enumerable: true},
                sirka: {value: sirka, enumerable: true},
                vyska: {value: vyska, enumerable: true}
            });

            return new_object;
        }
    });

    Object.defineProperty(klass, 'newZJsonDat', {enumerable: true,
        value: function(data) {
            if (typeof data!=='string') throw 'Data musí být string v JSON';
            var i, pozice;
            data = JSON.parse(data);
            pozice = data['pozice'];
            for (i=0;i<pozice.length;i+=1) pozice[i] = Pozice.new(i, pozice[i])
            return Svet.new(pozice, data['sirka']);
        }
    });

//    Object.freeze(proto);
    return Object.freeze(klass);
})();
