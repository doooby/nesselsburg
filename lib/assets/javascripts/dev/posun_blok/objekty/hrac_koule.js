/**
 * Created by doooby on 30.8.14.
 */

Objekt.HracKoule = (function () {
    var proto, klass;
    proto = Object.create(Objekt.base);
    klass = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'vytvorMesh', {enumerable: true,
        value: function () {
            if (!this.mesh) {
                var geom, mater;
                geom = new THREE.SphereGeometry(SIRKA_BLOKU/5);
                mater = new THREE.MeshBasicMaterial({color: 0x2020D2});
                this.mesh = new THREE.Mesh(geom, mater);
                this.mesh.matrixAutoUpdate = false;
            }
        }
    });

    Object.defineProperty(proto, 'posunNaV3', {enumerable: true,
        value: function (v3) {
            if (this.mesh) {
//                v3.x += SIRKA_BLOKU/2;
//                v3.y += SIRKA_BLOKU/2;
                v3.z += SIRKA_BLOKU/2;
                this.mesh.position = v3;
                this.mesh.updateMatrix();
            }
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,value: function() {return Object.create(proto);}});

    Objekt.zaregistrujTyp(10, proto, klass, 'hráč-koule');
//    Object.freeze(proto);
    return Object.freeze(klass);
})();