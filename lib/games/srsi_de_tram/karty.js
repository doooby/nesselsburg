/**
 * Created by doooby on 19.11.14.
 */

/**
 * Created by doooby on 21.8.14.
 *
 * barvy : K - koule     znaky : 7 - sedma    VII
 *         L - listy             8 - osma     VIII
 *         S - srdce             9 - devítka  IX
 *         Z - žaludy            X - desítka  X
 *                               J - spodek
 *                               D - vršek
 *                               K - král
 *                               E - trumf
 *         0 - žolík             0 - žolík
 *
 */

var karty = function () {
    var proto_karta = {}, klass = {};

    Object.defineProperty(proto_karta, 'createMesh', {value: function(texture){
        var geometry, material;
        geometry = new THREE.PlaneGeometry(SIRKA_KARTY, VYSKA_KARTY);
        material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
        Object.defineProperty(this, 'mesh', {value: new THREE.Mesh(geometry, material)});
        this.mesh.matrixAutoUpdate = false;
    }});

    Object.defineProperty(proto_karta, 'text', {get: function(){
        return this.barva + this.znak;
    }});

    function create_karta(bi, zi) {
        var k, barva, znak;
        if (bi>-1) {
            barva = klass.barvy[bi];
            znak = klass.znaky[zi];
        }
        else if (bi===-1) {
            barva = '0';
            znak = '0';
        }
        k = Object.create(proto_karta, {
            barva: {value: barva},
            znak: {value: znak}
        });
        return k;
    }

    Object.defineProperty(klass, 'barvy', {value: Object.freeze(['K', 'L', 'S', 'Z'])});
    Object.defineProperty(klass, 'znaky', {value: Object.freeze(['7', '8', '9', 'X', 'J', 'D', 'K', 'E'])});
    Object.defineProperty(klass, 'pozadi', {value: create_karta(-2)});
    Object.defineProperty(klass, 'balik', {value: (function () {
        var arr = [], b, z;
        for (b=0; b<klass.barvy.length; b+=1) {
            for (z=0; z<klass.znaky.length; z+=1) {
                arr.push(create_karta(b, z));
            }
        }
        arr.push(create_karta(-1));
        Object.freeze(arr);
        return arr;
    })()});

    return klass;
};