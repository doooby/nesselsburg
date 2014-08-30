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
            var i, pozice_typy;
            pozice_typy = [];
            for (i=0;i<this.pozice.length;i+=1) pozice_typy.push(this.pozice[i].typyObjektu());
            return JSON.stringify({sirka: this.sirka, pozice: pozice_typy});
        }
    });

    Object.defineProperty(proto, 'initObjekty', {enumerable: true,
        value: function (scene) {
            var i, j, p, o;
            for (i=0;i<this.pozice.length;i+=1) {
                p = this.pozice[i];
                for (j=0;j< p.objekty.length;j+=1) {
                    o = p.objekty[j];
                    o.vytvorMesh();
                    o.posunNaV3(this.poziceV3(i));
                    scene.add(o.mesh);
                }
            }
        }
    });

    Object.defineProperty(proto, 'poziceV3', {enumerable: true,
        value: function (index) {
            return new THREE.Vector3((index%this.sirka)*SIRKA_BLOKU, Math.floor(index/this.sirka)*SIRKA_BLOKU ,0);
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,
        value: function(vsechny_pozice, sirka, promenny) {
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

    Object.defineProperty(klass, 'newZJson', {enumerable: true,
        value: function(data, promenny) {
            if (typeof data!=='string') throw 'Data musí být string v JSON';
            var i, pozice;
            data = JSON.parse(data);
            pozice = data['pozice'];
            for (i=0;i<pozice.length;i+=1) pozice[i] = Pozice.new(i, pozice[i])
            return Svet.new(pozice, data['sirka'], promenny);
        }
    });

//    Object.freeze(proto);
    return Object.freeze(klass);
})();
