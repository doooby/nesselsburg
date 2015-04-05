/**
 * Created by doooby on 30.11.14.
 */

var Kopa = function () {
    var klass = {}, karty = [];

//    Object.defineProperty(klass, 'karty', {value: karty});

    Object.defineProperty(klass, 'vyprazdni', {value: function(){
        karty.length = 0;
    }});

    Object.defineProperty(klass, 'odhod', {value: function(karta){
        karty.push(karta);
        var m = karta.mesh;
        m.position = new THREE.Vector3(Math.random()*VYSKA_KARTY, Math.random()*VYSKA_KARTY, karty.length);
        m.position.add(STRED_KOPY);
        m.rotation.z = Math.random()*Math.PI;
        m.updateMatrix();
        platno.scene.add(m);
    }});

    Object.defineProperty(klass, 'pretocDoPaklu', {value: function(pakl_karty){
        var i, k, pocet = karty.length-1;
        for (i = 0; i < pocet; i++) {
            k = karty[i];
            pakl_karty.push(k);
            platno.scene.remove(k.mesh);
        }
        karty[0] = karty[pocet];
        karty.length = 1;
    }});

    Object.freeze(klass);
    return klass;
};