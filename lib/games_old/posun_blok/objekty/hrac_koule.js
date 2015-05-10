/**
 * Created by doooby on 30.8.14.
 */

Objekt.HracKoule = (function () {
    var proto, klass;
    proto = Object.create(Objekt.base);
    klass = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'pohle_delka', {value: SIRKA_BLOKU*3});
    Object.defineProperty(proto, 'oci_posun', {value: SIRKA_BLOKU/2});
    Object.defineProperty(proto, 'oci_vyska', {value: 2*SIRKA_BLOKU/3});
    Object.defineProperty(proto, 'pohled_vyska', {value: 0});

    Object.defineProperty(proto, 'potrebna_sila', {value: 0, writable: true});
    Object.defineProperty(proto, 'aktualni_sila', {value: 1, writable: true});

    Object.defineProperty(proto, 'vytvorMesh', {
        value: function () {
            if (!this.mesh) {
                var geom, mater;
                geom = new THREE.SphereGeometry(SIRKA_BLOKU/3);
                mater = new THREE.MeshBasicMaterial({color: 0x2020D2});
                this.mesh = new THREE.Mesh(geom, mater);
                this.mesh.matrixAutoUpdate = false;
            }
        }
    });

    Object.defineProperty(proto, 'posunNaV3', {
        value: function (v3) {
            if (this.mesh) {
                v3.z += SIRKA_BLOKU/2;
                this.mesh.position.copy(v3);
                this.mesh.updateMatrix();
            }
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {value: function() {return Object.create(proto);}});

    Objekt.zaregistrujTyp(1, proto, klass, 'hráč-koule');
    return Object.freeze(klass);
})();