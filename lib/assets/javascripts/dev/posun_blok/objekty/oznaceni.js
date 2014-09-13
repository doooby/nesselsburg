/**
 * Created by doooby on 30.8.14.
 */

Objekt.Oznaceni = (function () {
    var proto, klass, posun;
    proto = Object.create(Objekt.base);
    klass = {};
    posun = 0.05;

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'vytvorMesh', {enumerable: true,
        value: function () {
            if (!this.mesh) {
                var sirka, geom, mater;
                sirka = SIRKA_BLOKU + posun*SIRKA_BLOKU;
                geom = new THREE.CubeGeometry(sirka, sirka, sirka);
                mater = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
                this.mesh = new THREE.Mesh(geom, mater);
                this.mesh.matrixAutoUpdate = false;
            }
        }
    });

    Object.defineProperty(proto, 'posunNaV3', {enumerable: true,
        value: function (v3) {
            if (this.mesh) {
                v3.x -= 2*posun;
                v3.y -= 2*posun;
                v3.z -= 2*posun;
                v3.z += SIRKA_BLOKU/2;
                this.mesh.position = v3;
                this.mesh.updateMatrix();
            }
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,value: function() {return Object.create(proto);}});

    Objekt.zaregistrujTyp(8, proto, klass, 'označení');
//    Object.freeze(proto);
    return Object.freeze(klass);
})();