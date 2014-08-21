/**
 * Created by doooby on 20.8.14.
 */

var Svet = (function () {
    var proto, klass, new_object;

    proto = {}; ///////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'jsonData', {enumerable: true,
        get: function () {
            var i, pozice;
            pozice = [];
            for (i=0;i<this.pozice.length;i+=1) pozice.push(this.pozice[i].typyObjektu());
            return JSON.stringify({sirka: this.sirka, pozice: pozice});
        }
    });

    Object.defineProperty(proto, 'initObjekty', {enumerable: true,
        value: function (scene) {
            var i, j, p, o;
            for (i=0;i<this.pozice.length;i+=1) {
                p = this.pozice[i];
                for (j=0;j<p.length;j+=1) {
                    o = p[j];
                    o.createMesh();
                    o.translateTo(this.poziceToV3(i));
                    scene.add(o.mesh);
                }
            }
        }
    });

    Object.defineProperty(proto, 'poziceToV3', {enumerable: true,
        value: function (index) {
            new THREE.Vector3((index%3)*SIRKA_BLOKU, Math.floor(index/3)*SIRKA_BLOKU ,0);
        }
    });

    Object.freeze(proto);

    klass = {}; ////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,
        value: function(vsechny_pozice, sirka, promenny) {
            if (!vsechny_pozice) throw "Pozice musí být pole pozic.";
            if (typeof sirka!=='number') throw 'Šířka nového světa musí být číslo.';

            var vyska, vertices, x, y;

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

    Object.defineProperty(klass, 'novyZJson', {enumerable: true,
        value: function(data, promenny) {
            if (typeof data!=='string') throw 'Data musí být string v JSON';
            var i, pozice;
            data = JSON.parse(data);
            pozice = data['pozice'];
            for (i=0;i<pozice.length;i+=1) pozice[i] = Pozice.new(i, pozice[i])
            return Svet.new(pozice, data['sirka'], promenny);
        }
    });

    return Object.freeze(klass);
})();
