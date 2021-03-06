/**
* Created by doooby on 25.8.14.
*/

Objekt.KamennaPodlaha = (function () {
    var proto, klass;
    proto = Object.create(Objekt.base);
    klass = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'vytvorMesh', {enumerable: true,
        value: function () {
            if (!this.mesh) {
                var geom, mater;
                geom = new THREE.PlaneGeometry(SIRKA_BLOKU, SIRKA_BLOKU);
                mater = new THREE.MeshBasicMaterial({color: 0x505050, side: THREE.DoubleSide});
                this.mesh = new THREE.Mesh(geom, mater);
                this.mesh.matrixAutoUpdate = false;
            }
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,value: function() {return Object.create(proto);}});

    Objekt.zaregistrujTyp(21, proto, klass, 'kamení');
    return Object.freeze(klass);
})();