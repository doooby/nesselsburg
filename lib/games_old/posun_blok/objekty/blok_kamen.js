/**
 * Created by doooby on 11.10.14.
 */

Objekt.BlokKamene = (function () {
    var proto, klass;
    proto = Object.create(Objekt.base);
    klass = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu



    Object.defineProperty(proto, 'vytvorMesh', {enumerable: true,
        value: function () {
            if (!this.mesh) {
                var geom, mater;
                geom = new THREE.BoxGeometry(SIRKA_BLOKU, SIRKA_BLOKU, SIRKA_BLOKU);
                texture = THREE.ImageUtils.loadTexture(GamesData.graphicsUrl('kamen.bmp'), new THREE.UVMapping(),
                    function () {platno.redraw();});
                mater = new THREE.MeshBasicMaterial({map: texture});
                this.mesh = new THREE.Mesh(geom, mater);
                this.mesh.matrixAutoUpdate = false;
            }
        }
    });

    Object.defineProperty(proto, 'posunNaV3', {enumerable: true,
        value: function (v3) {
            if (this.mesh) {
                v3.z += SIRKA_BLOKU/2;
                this.mesh.position.copy(v3);
                this.mesh.updateMatrix();
            }
        }
    });



    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,value: function() {return Object.create(proto);}});

    Objekt.zaregistrujTyp(50, proto, klass, 'kamený blok');
    return Object.freeze(klass);
})();