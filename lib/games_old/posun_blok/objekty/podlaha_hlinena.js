/**
 * Created by doooby on 30.8.14.
 */

Objekt.PodlahaHlinena = (function () {
    var proto, klass;
    proto = Object.create(Objekt.base);
    klass = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'potrebna_sila', {value: 0});

    Object.defineProperty(proto, 'vytvorMesh', {enumerable: true,
        value: function () {
            if (!this.mesh) {
                var geom, mater, texture;
                geom = new THREE.PlaneGeometry(SIRKA_BLOKU, SIRKA_BLOKU);
                texture = THREE.ImageUtils.loadTexture(GamesData.graphicsUrl('hlina.bmp'), new THREE.UVMapping(),
                    function () {platno.redraw();});
                mater = new THREE.MeshBasicMaterial({map: texture});
                this.mesh = new THREE.Mesh(geom, mater);
                this.mesh.matrixAutoUpdate = false;
            }
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,value: function() {return Object.create(proto);}});

    Objekt.zaregistrujTyp(20, proto, klass, 'hlína');
    return Object.freeze(klass);
})();